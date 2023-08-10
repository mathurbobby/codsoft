import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// import ModalDialog from "react-bootstrap/ModalDialog";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import { useCart, useDispatch } from "./ContextReducer";


const ModalComp = (props) => {


  const data = useCart();
  const dispatch = useDispatch();
  const finalPrice = data.reduce((price,item) => { return price + item.price}, 0);
  // const a = localStorage.getItem('cart');
  //    console.log('inside', JSON.parse(a));

  const handleCheckout = async () => {
    localStorage.setItem('cart', JSON.stringify(data));
    const response = await fetch("http://localhost:5000/api/payment/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data
      })
    });
    const res = await response.json();
    // console.log(res);
    if(res.success === true){
      // console.log('ordering....')
      toast.success("Redirecting to payment", { position: "top-center" });
      window.location.href = res.url
    }else{
      console.log('error is there')
    }

    
  }

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      //   backdrop='static'
      //   animation={false}
      scrollable={true}
      contentClassName="mymodal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data.length === 0 ? (
          <h3 className="w-100 text-center mt-5 mb-5">The Cart is Empty!</h3>
        ) : (
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Option</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {data.map((data, i) => {
              return (
                <tr key={i}>
                  <th scope="col">{i + 1}</th>
                  <td>{data.name}</td>
                  <td>{data.qty}</td>
                  <td>{data.size}</td>
                  <td>{data.price}</td>
                  <td>
                    <button onClick={() => {dispatch({type:"REMOVE", index:i})}} type="button" className="btn text-danger p-0">
                    X
                    </button>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer>
        {finalPrice === 0 ? null : <div className="fs-4 me-3"  >₹{finalPrice}/-</div>}
        <Button className="me-3" style={{backgroundColor:'#2874F0'}} disabled={data.length===0?true:false}  onClick={handleCheckout}>Check Out</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComp;
