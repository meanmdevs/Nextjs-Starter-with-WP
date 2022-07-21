const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getPrimaryMenu() {
  // const data = await fetchAPI(`
  // {
  //   menu(idType: NAME, id: "Main menu") {
  //     menuItems {
  //        edges {
  //          node {
  //            id
  //            label
  //            path
  //            connectedNode {
  //              node {
  //                ... on Page {
  //                  isPostsPage
  //                  slug
  //                }
  //              }
  //            }
  //          }
  //        }
  //      }
  //    }
  // }
  // `);
 
  return {};
}

export async function getPreviewPost(id, idType = 'DATABASE_ID') {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  )
  return data.post
}

export async function getAllPostsWithSlug() {
   
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.posts
}

export async function getAllBlogs() {
  const data = await fetchAPI(`
  {
    posts {
      edges {
        node {
          id,
          title
          content
          featuredImage {
            node {
              id
              sourceUrl
            }
          }
        }
      }
    }
  }
  `);
  
  return data?.posts?.edges;
}



export async function getAllPagesWithSlugs() {
  const data = await fetchAPI(`
  {
    pages(first: 10000) {
      edges {
        node {
          slug
        }
      }
    }
  }
  `);
  return data?.pages;
}
export async function getPageBySlug(slug) {
  const data = await fetchAPI(`
  {
    page(id: "${slug}", idType: URI) {
      id
      slug
      title
      content
    }
  }
  `);
  return data?.page;
}

export async function getHomeBySlug(slug) {
  const data = await fetchAPI(`
  {
    page(id: "${slug}", idType: URI) {
      id
      content
      title
      uri
      homePageSlider {
        homeSlider {
          buttonUrl 
          slideSubTitle
          sliderTitle
          slideImage {
            sourceUrl
          }
        }
     } 
     homepageService {
      services {
        serviceDetails
        serviceIcon {
          sourceUrl
        }
        serviceTitle
      }
    }
    homePageContent {
      image1 {
        sourceUrl
      }
      image2 {
        sourceUrl
      }
      testimonial
      testimonialBy
      customerServiceDescription
      customerServiceTitle
      servicesImage1 {
        sourceUrl
      } 
      servicesImage2 {
        sourceUrl
      }
       servicesImage3 {
        sourceUrl
      }
      weOfferSection { 
        offerTitle
        offerImage {
          id
          sourceUrl
        }
      }
    }
    }
  }
  `);
  return data?.page;
}

export async function getSiteSettings() {
  const data = await fetchAPI(`
  {
    generalThemeOptions {
      pageTitle
      pageSlug
      themeOptions {
        fieldGroupName
        siteAddress
        aboutWebsite
        openingHours
        buttonUrl
        buttonText
        logo {
          sourceUrl
        }
        sitePhoneNumber
        siteTopEmail
        socialProfiles {
          fieldGroupName
          profileAddress
          profileIcon
        }
      }
    }
  }
  `);
  return data?.generalThemeOptions;
}


/* EXTRA */
/*
export async function getAllPostsForHome(preview) {
   
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
              name
              firstName
              lastName
              avatar {
                url
              }
            }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.posts
}

export async function getPostAndMorePosts(slug, preview, previewData) {
   
  const postPreview = preview && previewData?.post
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug))
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug
  const isDraft = isSamePost && postPreview?.status === 'draft'
  const isRevision = isSamePost && postPreview?.status === 'publish'
  const data = await fetchAPI(
    `
    
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
        sourceUrl
      }
      }
    
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                ...AuthorFields
              }
            }
          }
        }
        `
            : ''
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? 'DATABASE_ID' : 'SLUG',
      },
    }
  )

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node

    if (revision) Object.assign(data.post, revision)
    delete data.post.revisions
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug)
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop()

  return data
} */

