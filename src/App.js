import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Home from "./screens/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartProvider from "./components/ContextReducer";
import Myorder  from "./screens/Myorder";
import Success from "./screens/Success";
import Failure from './screens/Failure';
import Error from './screens/Error';
import { SkeletonTheme } from 'react-loading-skeleton';

function App() {
  return (
    <>
    <SkeletonTheme baseColor="#e0e4eb" highlightColor="#cfe0fc">
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="createuser" element={<SignUp />} />
          <Route path="myorders" element={<Myorder />} />
          <Route path="payment/success" element={<Success />} />
          <Route path="payment/failure" element={<Failure />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer autoClose={2000} />
      </CartProvider>
      </SkeletonTheme>
    </>
  );
}

export default App;
