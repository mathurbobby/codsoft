import React from 'react';
import NavHeadBar from "../components/Navbar";

const Failure = () => {
  return (
    <>
      <div>
        <NavHeadBar />
      </div>
      <div
        style={{ width: "100%", height: "100vh",backgroundColor: "#F1F3F6" }}
        className="align-items-center justify-content-center  d-flex flex-column"
      >
        <div className=" fs-1 text-danger fw-bold" >Payment failed</div>
        <div className="text-secondary fw-normal" >Please pay again to confirm order</div>
      </div>
    </>
  )
}

export default Failure