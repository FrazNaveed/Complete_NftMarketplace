// import Front from './Components/FrontPage/Front';
//import Explore from './Components/ExplorePage/Explore';
import Navbar from "./Components/Navbar/Navbar";
// import Card from "./Components/populatecard/populateCard";




/**************TESTING OF ROUTING */
// import About from "./About";
// import Contact from "./Contact";
// import Main from "./main"
// import Navbar from "./Navbar";

import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div>
      
     
    <Navbar/>
    {/* <About/>
    <Contact/> */}

     {/* <Front /> */}
    {/* <Explore/> */}
    {/* <Navbar/>
    <Card/> */}


{/* 
    <Routes>
        <Route exact path="/" element={<Main/>}  />
        <Route exact path="/about" element={<About/>}  />
        <Route path="/contact" element={<Contact/>}  />
        {/* <Route element={<Error/>}/> 
    </Routes> */}


   
    </div>
  );
} 

export default App;
