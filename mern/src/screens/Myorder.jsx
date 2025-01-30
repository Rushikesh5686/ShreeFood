import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Myorder() {
    const [orderData, setorderData] = useState([]);

    const fetchMyOrder = async () => {
        try {
            let response = await fetch("https://shreefood.onrender.com/api/myorderdata", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem('useremail'),
                }),
            });

            if (response.ok) {
                let data = await response.json();
                setorderData(data);
            } else {
                console.error("Failed to fetch orders:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData.length > 0 ? (
                        orderData.map((data, index) =>
                            data.orderData?.order_data?.slice(0).reverse().map((item, idx) =>
                                item.map((arrayData, id) => (
                                    <div key={`${index}-${idx}-${id}`}>
                                        {arrayData.Order_date ? (
                                            <div className='m-auto mt-5'>
                                                <h5>{arrayData.Order_date}</h5>
                                                <hr />
                                            </div>
                                        ) : (
                                            <div className='col-12 col-md-6 col-lg-3'>
                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                    <img
                                                        src={arrayData.img}
                                                        className="card-img-top"
                                                        alt={arrayData.name}
                                                        style={{ height: "120px", objectFit: "fill" }}
                                                    />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{arrayData.name}</h5>
                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                            <span className='m-1'>{arrayData.qty}</span>
                                                            <span className='m-1'>{arrayData.size}</span>
                                                            <span className='m-1'>{arrayData.Order_date}</span>
                                                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                ₹{arrayData.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )
                        )
                    ) : (
                        <div className='text-center text-muted mt-5'>
                            <h3>No orders found!</h3>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
