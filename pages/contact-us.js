import { useRouter } from 'next/router'
import Layout from '../components/layout'
import SubContent from '../components/SubContent'; 
import { getAllPagesWithSlugs,getPageBySlug,getPrimaryMenu,getSiteSettings  } from '../lib/api'

export default function Index({preview,page,menuItems,WebSiteSettings }) {  
    const router = useRouter() 
    return (
      <Layout preview={preview}  menuItems={menuItems} WebSiteSettings={WebSiteSettings}>  
      <SubContent PageContent={page}  />  
      </Layout>
      )
} 
export async function getStaticProps({ params }) {
    const page = await getPageBySlug('contact-us'); 
    const menuItems = await getPrimaryMenu();    
    const WebSiteSettings = await getSiteSettings(); 
    
    return {
        props: {
            page,
            menuItems, 
            WebSiteSettings
        },
    }
}

// export async function getStaticPaths() {
//   const pagesWithSlugs = await getAllPagesWithSlugs();
//     return {
//       paths: pagesWithSlugs.edges.map(({ node }) => `/${node.slug}`) || [],
//       fallback: true,
//     };
//   }

//export default Page;