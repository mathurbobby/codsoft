import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Card from "react-bootstrap/Card";

const SkeletonCard = () => {
  return (
    <>
      <Card
        className="mycard shadow-lg mt-3"
        style={{ width: "18rem", maxHeight: "360px" }}
      >
        <div style={{ width: "100%", height: "150px", objectFit: "fill" }}
        className="p-2" ><Skeleton height={130} /></div>
        <Card.Body>
          <Card.Title>
            {" "}
            <Skeleton />
          </Card.Title>
          <div className="w-100">
            {/* <span>
              {" "}
              <Skeleton />
            </span>
            <span>
              {" "}
              <Skeleton />
            </span> */}
            <div className=" h-100 fs-5">
              {" "}
              <Skeleton />
            </div>
            <hr />
            <div className="w-100">
              <Skeleton />
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default SkeletonCard;
