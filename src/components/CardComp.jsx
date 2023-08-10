import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useCart, useDispatch } from "./ContextReducer";

const CardComp = ({productDetails, options}) => {
  
  const dispatch = useDispatch();
  const choices = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const cart = useCart();
  const priceRef = useRef();
  
  const handleAddToCart = async () => {
    let product = [];
    for(var item of cart){
      // console.log('item', item)
      if(item.id === productDetails._id && item.size === size){
        product = item;
        // console.log(finalPrice, qty, item.size)
        return await dispatch({type:'UPDATE',id:productDetails._id, price:finalPrice,qty:qty, size:item.size})
      }
    }
    // console.log('add called')
    return await dispatch({type:'ADD', id:productDetails._id, name: productDetails.name, price:finalPrice, qty:qty, size:size, img:productDetails.img})
    // await console.log(cart);
  }
  
  const finalPrice = qty * parseInt(options[size]);

  useEffect( () => {
    setSize(priceRef.current.value)
  },[]);

  return (
    <Card className="mycard shadow-lg mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
      <Card.Img
        variant="top"
        src={productDetails.img}
        style={{ width: "100%", height: "150px", objectFit: "fill" }}
        className="myimg"
      />
      <Card.Body>
        <Card.Title>{productDetails.name}</Card.Title>
        

        <div className="w-100">
          <select
            className=" h-100  rounded bg-white p-1"
            style={{ cursor: "pointer" }}
            onChange={ (e) => setQty(e.target.value)}
          >
            {Array.from(Array(4), (e, i) => {
              return (
                <option value={i + 1} key={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            name=""
            id=""
            className="m-1 h-100 rounded bg-white p-1"
            style={{ cursor: "pointer" }}
            onChange={ (e) => setSize(e.target.value)}
            ref={priceRef}
          >
          {choices.map((choice, i) => {
            return (<option key={i} value={choice}>{choice}</option>)
          })}
          </select>
          <div className="d-inline h-100 fs-5 ms-3">₹{finalPrice}</div>
          <hr />
          <Button className="btn w-100 btn-secondary" onClick={handleAddToCart} >Add To Cart</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardComp;
