import HomeSlider from '../components/HomeSlider';
import HomeContent from '../components/HomeContent'; 
import Layout from '../components/layout'
import { getPrimaryMenu,getHomeBySlug,getSiteSettings  } from '../lib/api'
 
export default function Index({preview,menuItems,getPageContent,WebSiteSettings }) { 
 
  return (
    <Layout preview={preview}  menuItems={menuItems} WebSiteSettings={WebSiteSettings}>  
      <HomeSlider homePageSlider={getPageContent?.homePageSlider}  />
      <HomeContent homepageService={getPageContent?.homepageService} homePageContent={getPageContent?.homePageContent} />  
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  
  const menuItems = {}; 
  const getPageContent = await getHomeBySlug('home');  
  const WebSiteSettings = await getSiteSettings(); 
  
  return {
    props: {preview,menuItems,getPageContent,WebSiteSettings },
  }
}
