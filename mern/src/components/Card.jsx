import React, { useState } from "react";
import { usedispatch, usecart } from "./contextreducer.jsx";

const Card = (props) => {
  const dispatch = usedispatch();
  const data = usecart();

  const options = props.options;
  const priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0]); // Default to the first size

  // Calculate the final price based on size and quantity
  const finalPrice = qty * options[size];

  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodi._id) {
        food = item;

        break;
      }
    }
    if (food != []) {
      if (food.size == size) {
        await dispatch({ type: "UPDATE", id: props.foodi._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodi._id, name: props.foodi.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
       return
      }
      await dispatch({ type: "ADD", id: props.foodi._id, name: props.foodi.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
      return
    }

    await dispatch({
      type: "ADD",
      id: props.foodi._id,
      name: props.foodi.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
    console.log("Cart data:", data);
  };

  return (
    <div>
      <div
        className="card mt-3 bg-transparent border text-white"
        style={{ width: "18rem", maxHeight: "360px" }}
      >
        <img
          src={props.foodi.img}
          className="card-img-top"
          alt={props.foodi.name}
          style={{ height: "150px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodi.name}</h5>
          <div className="container w-100">
            {/* Quantity Selector */}
            <select
              className="m-2 h-100 bg-success rounded"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            {/* Size Selector */}
            <select
              className="m-2 h-100 bg-success rounded"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>

            {/* Total Price */}
            <div className="mt-2">
              Total Price: ₹{finalPrice}
            </div>
          </div>
          <hr />
          <button
            className="btn btn-success justify-center ms-2"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
