import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

const Signup = () => {
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const navigate = useNavigate();

  const Notification = (data) => {
    if (!data.success) {
      const err = data.error;
      toast.warning(err,{position: 'top-center'});
    } else {
      toast.success('Successfully registered', {position:'top-center'})
      setformdata({
        name: "",
        email: "",
        password: "",
        geolocation: "",
      });
      navigate('/login')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formdata.name,
        email: formdata.email,
        password: formdata.password,
        location: formdata.geolocation,
      }),
    });
    const json_data = await response.json();
    // console.log(json_data);
    Notification(json_data);
  };

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  return (
    <div style={{
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#F1F3F6"
      }}>
      <div className="container border border-secondary rounded  p-3" style={{maxWidth:'500px'}}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formdata.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={formdata.email}
              onChange={handleChange}
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={formdata.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              value={formdata.geolocation}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Register
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
      <div style={{ position: "fixed", bottom: 0, left: 0, width: "100%" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Signup;
