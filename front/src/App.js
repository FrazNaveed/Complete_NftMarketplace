
import {Route, Routes} from 'react-router-dom';
import Navbar from "./Components/Navbar/Navbar";
import Explore from './Components/ExplorePage/Explore';
import Popular from "./Components/Popular/Popular";
import Collection from "./Components/MyCollection/Collection";
import Sale from "./Components/Sale/Sale";
import Creators from "./Components/Creators/Creators";
import ErrorPage from "./Components/ErrorPage/Error";
import Create from "./Components/CreatePage/Create";
import Card from "./Components/populatecard/populateCard";
// import Front from './Components/FrontPage/Front';

function App() {
  return (
    <div>
      

    <Navbar/>
    {/* <Card/> */}

    <Routes>

        <Route exact path="/" element={<Explore/>}  />
        <Route exact path="/popular" element={<Popular/>}  />
        <Route exact path="/collection" element={<Collection/>}  />
        <Route exact path="/sale" element={<Sale/>}  />
        <Route exact path="/creators" element={<Creators/>}  />
        <Route exact path="/create" element={<Create/>}  />
        <Route element={<ErrorPage/>}/>  
    </Routes>

    </div>
  );
} 

export default App;
