import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Explore from "./Components/ExplorePage/Explore";
import Collection from "./Components/MyCollection/Collection";
import Sale from "./Components/Sale/Sale";
import Creators from "./Components/Creators/Creators";
import ErrorPage from "./Components/ErrorPage/Error";
import Create from "./Components/CreatePage/Create";
import Details from "./Components/DetailsPage/Details";
import Transactions from "./Components/Transactions/Transactions";
import Footer from "./Components/Footer/Footer";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Explore />} />
        <Route exact path="/transactions" element={<Transactions />} />
        <Route exact path="/collection" element={<Collection />} />
        <Route exact path="/sale" element={<Sale />} />
        <Route exact path="/creators" element={<Creators />} />
        <Route exact path="/create" element={<Create />} />
        <Route exact path="/details/:tokenId" element={<Details />} />
        <Route element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
