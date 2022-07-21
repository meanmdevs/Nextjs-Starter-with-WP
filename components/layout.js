import Alert from '../components/alert'
import Header from '../components/Header';
import Footer from '../components/footer'
import Meta from '../components/meta'


export default function Layout({ preview, children,WebSiteSettings }) {
  return (
    <>
      <Meta /> 
      <Header   WebSiteSettings={WebSiteSettings} />  
        <Alert preview={preview} />
        <div>
          <main>{children}</main>
        </div>
      <Footer />
      
    </>
  )
}

 