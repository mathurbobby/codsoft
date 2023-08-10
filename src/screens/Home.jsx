import React, { useEffect, useState } from "react";
import NavHeadBar from "../components/Navbar";
import Footer from "../components/Footer";
import CardComp from "../components/CardComp";
import axios from "axios";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [prodCategory, setProdCategory] = useState([]);
  const [text, setText] = useState("Big Saving Days");
  const [search, setSearch] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      if (text === "Big Saving Days") {
        setText("More Discount");
      } else if (text === "More Discount") {
        setText("Free Vouchers");
      } else if (text === "Free Vouchers") {
        setText("Big Saving Days");
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [text]);

  const loadData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/fooddata", {});
    setProducts(response.data[1]);
    setProdCategory(response.data[0]);
    } catch (error) {
      console.log('in error')
      console.log(error)
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <NavHeadBar />
      </div>
      <div>
      <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade mt-5"
          data-bs-ride="carousel"
          data-mdb-interval="true"
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="mb-5 fs-1">
                <h2 className="fw-bold"  >{text}</h2>
              </div>
              <div className="d-flex">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search for products"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {setSearch(e.target.value)}}
                />
              </div>
            </div>
            <div className="carousel-item active" style={{ height: "60vh" }} data-bs-interval="2000">
              <img
                src="https://img.freepik.com/free-photo/variety-fashionable-garments-hang-clothing-boutique-generated-by-ai_188544-27734.jpg?t=st=1691165461~exp=1691169061~hmac=e6ad648b20fcc2ff502055f829b9a70ad20ce251e19ba6e91cf66ac3c3e5372a&w=826"
                className="d-block w-100 h-100"
                style={{ filter: "brightness(35%)", objectFit: "cover" }}
                alt="..."
              />
            </div>
            <div className="carousel-item" style={{ height: "60vh" }} data-bs-interval="2000">
              <img
                src="https://img.freepik.com/free-photo/laptop-wooden-table_53876-20635.jpg?w=740&t=st=1691166055~exp=1691166655~hmac=c41a930c583eedb95327323c1559e5893ce8f262dc77d70393c425f64fdc5e1b"
                className="d-block w-100 h-100"
                style={{ filter: "brightness(35%)", objectFit: "cover" }}
                alt="..."
              />
            </div>
            <div className="carousel-item" style={{ height: "60vh" }} data-bs-interval="2000">
              <img
                src="https://img.freepik.com/free-vector/realistic-phones-different-views_52683-28436.jpg?w=740&t=st=1691166122~exp=1691166722~hmac=4cef2354be056d4aac07142d60001dad1a8c3f12ebd1c8507b172be2e4943d45"
                className="d-block w-100 h-100"
                style={{ filter: "brightness(35%)", objectFit: "cover" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {prodCategory !== []
          ? prodCategory.map((e, i) => {
              return (
                <div key={i} className="row mb-5" >
                  <div className="fs-3 m-3">{e.CategoryName}</div>
                  <hr
                    style={{
                      background: "black",
                      color: "black",
                      borderColor: "black",
                      height: "1px",
                    }}
                  />
                  {products !== []
                    ? products
                        .filter((product) => {
                          return ( product.CategoryName === e.CategoryName && product.name
                              .toLowerCase()
                              .includes(search.toLowerCase()) )
                        })
                        .map((data, i) => {
                          return (
                            <div key={i} className="col-12 col-md-6 col-lg-4 d-flex justify-content-center mb-3" >
                              <CardComp productDetails = {data} options = {data.options[0]} />
                            </div>
                          );
                        })
                    : null}
                </div>
              );
            })
          : null}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
