// import Front from './Components/FrontPage/Front';
import Navbar from "./Components/Navbar/Navbar";
import Explore from './Components/ExplorePage/Explore';
import Popular from "./Components/Popular/Popular";
import Collection from "./Components/MyCollection/Collection";
import Sale from "./Components/Sale/Sale";
import Creators from "./Components/Creators/Creators";
import ErrorPage from "./Components/ErrorPage/Error";
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
      
     
   
    {/* <About/>
    <Contact/> */}

     {/* <Front /> */}
    {/* <Explore/> */}
    {/* <Navbar/>
    <Card/> */}


<Navbar/>

    <Routes>

        {/* <Route exact path="/" element={<Main/>}  /> */}
        <Route exact path="/explore" element={<Explore/>}  />
        <Route exact path="/popular" element={<Popular/>}  />
        <Route exact path="/collection" element={<Collection/>}  />
        <Route exact path="/sale" element={<Sale/>}  />
        <Route exact path="/creators" element={<Creators/>}  />
        <Route element={<ErrorPage/>}/> 
    </Routes>


   
    </div>
  );
} 

export default App;
