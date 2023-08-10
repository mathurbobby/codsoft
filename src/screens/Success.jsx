import React, { useEffect } from "react";
import NavHeadBar from "../components/Navbar";
import { useDispatch } from "../components/ContextReducer";
import { toast } from "react-toastify";

const Success = () => {


  // const data = useCart();
  const dispatch = useDispatch();
  // const a = localStorage.getItem('cart');
  

  const uploadData = async () => {  
    const a = localStorage.getItem('cart');
     console.log('inside', JSON.parse(a));
     // dispatch({type:'CART', cart: JSON.stringify(data) })
      const userEmail = localStorage.getItem('userEmail');
      // console.log(localStorage.getItem("cart"))
      const response = await fetch("http://localhost:5000/api/orderdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: JSON.parse(a),
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    // localStorage.removeItem('cart');
    if(response.status === 200){
      localStorage.removeItem('cart');
      toast.success("Order Placed", { position: "top-center" });
      dispatch({type:'DROP'})
    }
    else if(response.status !== 200){
      toast.error("Order failed", { position: "top-center" });
    }
  }

  useEffect( () => {
    uploadData()
  },[]);
  
  return (
    <>
      <div>
        <NavHeadBar />
      </div>
      <div
        style={{ width: "100%", height: "100vh",backgroundColor: "#F1F3F6" }}
        className="align-items-center justify-content-center  d-flex flex-column"
      >
        <div className=" fs-1 text-success fw-bold" >Order Confirmed</div>
        <div className="text-secondary fw-normal" >Your order will be delivered within few days</div>
      </div>
    </>
  );
};

export default Success;
