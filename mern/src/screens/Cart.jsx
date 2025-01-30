import React from 'react';
import { usecart, usedispatch } from "../components/contextreducer.jsx";

const Cart = () => {
  let data = usecart();
  let dispatch = usedispatch();

  if (data.length === 0) {
    return (
      <div>
        <div className='m-4 w-100 text-center fs-3 text-white'>
          The Cart is Empty!
        </div>
      </div>
    );
  }

  const handlecheckout = async () => {
    let useremail = localStorage.getItem('useremail');
    if (!useremail) {
      alert("User email is not set. Please log in.");
      return;
    }

    try {
      let response = await fetch("https://shreefood.onrender.com/api/orderdata", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: data,
          email: useremail,
          order_date: new Date().toDateString(),
        }),
      });

      if (response.ok) {
        dispatch({ type: "DROP" });
        alert("Order placed successfully!");
      } else {
        console.error("Checkout failed:", await response.json());
        alert("Failed to checkout. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th  className='bg-transparent text-success' scope='col'>#</th>
              <th  className='bg-transparent text-success' scope='col'>Name</th>
              <th  className='bg-transparent text-success' scope='col'>Quantity</th>
              <th  className='bg-transparent text-success' scope='col'>Option</th>
              <th  className='bg-transparent text-success' scope='col'>Amount</th>
              <th  className='bg-transparent text-success' scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th className='bg-transparent text-success' scope='row'>{index + 1}</th>
                <td className='bg-transparent text-success' >{food.name}</td>
                <td className='bg-transparent text-success'  >{food.qty}</td>
                <td className='bg-transparent text-success' >{food.size}</td>
                <td className='bg-transparent text-success' >{food.price}</td>
                <td className='bg-transparent' >
                  <button
                    type="button"
                    className=" btn p-0 "
                    onClick={() => dispatch({ type: "REMOVE", index })}
                    aria-label="Remove item"
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button className='btn bg-success mt-5' onClick={handlecheckout}>
            Check Out
          </button>
        </div>
        <div className='mt-3 text-white'>
          Total Price: <b>₹{totalPrice.toFixed(2)}</b>
        </div>
      </div>
    </div>
  );
};

export default Cart;
