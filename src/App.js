import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./navabar";
import cookie from "js-cookie";
import Myaccount from "./Myaccount";
import { useEffect, useState } from "react";
import Order from "./Order";
import Footer from "./Footer";
import Start from "./Home1";
import Forgot from "./Forgot";
import Resetpass from "./Resetpass";
import AdminPage from "./AdminPage";
import Adminmain from "./Adminmain";
import Cart from "./cart page/Cart";
import SingleproductDetails from "./SingleproductDetails";
import Soona from "./Soona";
import Checkoutpage from "./cart page/Checkoutpage";

function App() {
  const [cookieval, setCookieval] = useState(cookie.get("email"));

  useEffect(() => {
    const intervel = setInterval(() => {
      const updatedcookie = cookie.get("email");
      if (updatedcookie !== cookieval) {
        setCookieval(updatedcookie);
      }
    }, [1000]);

    return () => {
      clearInterval(intervel);
    };
  }, [cookieval]);
  

  return (
    <div classNameName="App">
      <Home />

      <ToastContainer />
      {/* hjhjyh */}
      <Routes>
        {cookieval == undefined && <Route path="/login" element={<Login />} />}
        {cookieval == "admin04@gmail.com" && (
          <Route path="/login" element={<Adminmain />} />
        )}

        {cookieval != undefined && cookieval != "admin04@gmail.com" && (
          <Route path="/login" element={<Myaccount />} />
        )}
        <Route index element={<Start />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/order" element={<Order />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/rpass" element={<Resetpass />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/food" element={<Soona />} />
        <Route path="/checkout" element={<Checkoutpage />} />
        <Route
          path="/singleproductdetails"
          element={<SingleproductDetails />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
