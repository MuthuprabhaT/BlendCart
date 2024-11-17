import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderListScreen from "./screens/AdminScreen/OrderListScreen";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/AdminScreen/ProductListScreen";
import ProductEditScreen from "./screens/AdminScreen/ProductEditScreen";
import UserListScreen from "./screens/AdminScreen/UserListScreen";
import UserEditScreen from "./screens/AdminScreen/UserEditScreen";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3 bg-dark text-light">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/search/:keyword" element={<HomeScreen />} />
              <Route path="/page/:pageNumber" element={<HomeScreen />} />
              <Route
                path="/search/:keyword/page/:pageNumber"
                element={<HomeScreen />}
              />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />

              <Route path="" element={<PrivateRoute />}>
                <Route path="/shipping" element={<ShippingScreen />} />
                <Route path="/payment" element={<PaymentScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route path="/order/:id" element={<OrderScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
              </Route>

              <Route path="" element={<AdminRoute />}>
                <Route path="/admin/orderlist" element={<OrderListScreen />} />
                <Route
                  path="/admin/productlist"
                  element={<ProductListScreen />}
                />
                <Route
                  path="/admin/productlist/:pageNumber"
                  element={<ProductListScreen />}
                />
                <Route
                  path="/admin/product/:id/edit"
                  element={<ProductEditScreen />}
                />
                <Route path="/admin/userlist" element={<UserListScreen />} />
                <Route
                  path="/admin/user/:id/edit"
                  element={<UserEditScreen />}
                />
              </Route>
            </Routes>
          </Container>
        </main>
        <Footer />
        <ToastContainer />
      </Router>
    </>
  );
};

export default App;
