import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import DetailProduct from "./pages/DetailProduct";
import MyCart from "./pages/MyCart";
import MyTransaction from "./pages/MyTransaction";
import AddCard from "./pages/AddCard";
import UpdateCard from "./pages/UpdateCard";
import AdminDashboard from "./pages/AdminDashboard";
import ListProductAdmin from "./pages/ListProductAdmin";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import Header from "./component/Header";

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail-product/:id" element={<DetailProduct />} />
        <Route path="/my-cart" element={<MyCart />} />
        <Route path="/my-transaction" element={<MyTransaction />} />
        <Route path="/add-product" element={<AddCard />} />
        <Route path="/update-product/:id" element={<UpdateCard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/list-product" element={<ListProductAdmin />} />
        <Route path="/update-profile" element={<UpdateProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
