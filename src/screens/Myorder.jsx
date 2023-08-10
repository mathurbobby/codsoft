import React, { useEffect, useRef, useState } from "react";
import NavHeadBar from "../components/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Myorder = () => {
  const date = useRef("");
  const [mereOrder, setMereOrder] = useState("");

  const getOrder = async () => {
    try {
      const response = await fetch("https://clickcart-9q8w.onrender.com/api/myorders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });
      const data = await response.json();
      await setMereOrder(data);
      // console.log(mereOrder[3])
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <div>
        <NavHeadBar />
      </div>
      <div
        className="py-4 mt-3"
        style={{ minHeight: "100vh", backgroundColor: "#F1F3F6" }}
      >
        {mereOrder !== {} ? (
          <Container
            style={{ color: "#172337" }}
            fluid
            className="mt-5 fs-2 ps-4 "
          >
            Your Previous Orders
          </Container>
        ) : null}

        {mereOrder !== {}
          ? Array(mereOrder).map((data) => {
              return data.orderData ? (
                data.orderData.order_data
                  .slice(0)
                  .reverse()
                  .map((item) => {
                    return item.map((arrayData, i) => {
                      if (arrayData.Order_date) {
                        date.current = arrayData.Order_date;
                        return;
                      }
                      return (
                        <Container fluid className="my-3">
                          {/* {console.log(date.current)} */}
                          {date.current === "" ? null : (
                            <Row
                              key={i}
                              className="order mx-3 bg-white"
                              style={{
                                border: "1px solid #dadada",
                                cursor: "pointer",
                              }}
                            >
                              <Col sm className="py-2">
                                <img
                                  src={arrayData.img}
                                  // className="d-block"
                                  style={{
                                    objectFit: "fill",
                                    height: "100%",
                                    width: "100%",
                                  }}
                                  alt="..."
                                />
                              </Col>
                              <Col
                                style={{ color: "#172337" }}
                                className="h6 fw-bold mb-3 align-items-center justify-content-center d-flex"
                              >
                                {arrayData.name}
                              </Col>
                              <Col
                                style={{ color: "#172337" }}
                                className="h6 fw-bold mb-3   align-items-center justify-content-center d-flex flex-column"
                              >
                                <div>{arrayData.qty}</div>
                                <div>₹{arrayData.price}</div>
                                <div>{arrayData.size}</div>
                              </Col>
                              <Col
                                style={{ color: "#172337" }}
                                className="h6 fw-bold mb-3 align-items-center justify-content-center d-flex"
                              >
                                {date.current}
                              </Col>
                              {/* <Col className="pt-1">{date}</Col> */}
                            </Row>
                          )}
                        </Container>
                      );
                    });
                  })
              ) : (
                <Container
                  fluid
                  style={{ width: "100%", height: "60vh" }}
                  className=" d-flex justify-content-center align-items-center fs-3 text-secondary "
                >
                  No Orders yet
                </Container>
              );
            })
          : null}
      </div>
    </>
  );
};

export default Myorder;
