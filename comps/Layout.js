
import Head from 'next/head'
import GlobaldataProider from "../Context/Context"

const Layout = ({ children }) => {
  return (
    
    <GlobaldataProider>

   
    <Head>
  <link rel='manifest' href='/manifest.json' />
  <meta charset="utf-8" />
    <link rel="icon" href="https://static.vecteezy.com/system/resources/thumbnails/002/135/986/small/chat-wing-logo-design-illustration-free-vector.jpg" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#014473" />
    <meta name="apple-mobile-web-app-status-bar-style" content="white" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"  />
    <meta name="description" content="Project" />
    
    <meta  name="description" content="Create Chat rooms and Meeting " />
    <link rel="apple-touch-icon" href="https://static.vecteezy.com/system/resources/thumbnails/002/135/986/small/chat-wing-logo-design-illustration-free-vector.jpg" />
    
    
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet"></link>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous" />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.min.js" integrity="sha384-cn7l7gDp0eyniUwwAZgrzD06kc/tftFf19TOAs2zVinnD/C7E91j9yyk5//jjpt/" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    
</Head>   

    <div className="content">
      { children }
    </div>
    
    </GlobaldataProider>
   
  );
}
 
export default Layout;