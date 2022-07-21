import { useRouter } from 'next/router'
import Layout from '../components/layout'
import BlogLayout from '../components/BlogLayout'; 
import { getPrimaryMenu,getSiteSettings,getAllBlogs  } from '../lib/api'

export default function Index({preview,menuItems,WebSiteSettings,BlogList }) {  
    const router = useRouter() 
    return (
      <Layout preview={preview}  menuItems={menuItems} WebSiteSettings={WebSiteSettings}>  
      <BlogLayout BlogList={BlogList}/>  
      </Layout>
      )
}

export async function getStaticProps({ preview = false }) {
  
  const menuItems = await getPrimaryMenu(); 
  const WebSiteSettings = await getSiteSettings(); 
  const BlogList = await getAllBlogs(); 
  
  return {
    props: {preview,menuItems,WebSiteSettings,BlogList },
  }
}
