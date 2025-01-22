import React from 'react'

const Carousal = () => {
    return (
        <div>
            <div id="carouselExampleControls" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
            <div className="carousel-inner" id='carousel'>
                <div className="carousel-caption" style={{zIndex:"10"}}>
                <form className="d-flex justify-content-center bg-transparent">
                <input className="form-control me-2 bg-transparent text-white" type="search" placeholder="Search" aria-label="Search"/>
                 <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                </form>


                </div>
                <div className="carousel-item active  ">
                    <img src="https://theartisticcook.com/wp-content/uploads/2024/10/Gulab-Jamun-with-Milk-Powder.jpg" className="d-block w-100 h-100" style={{filter:"brightness(30%)"}} alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://imgs.search.brave.com/APOVj_SY0fuGQbNm8YEpgtQs3xXramT0i7lNthlL9OI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9idXJnZXItYmxh/Y2stYmFja2dyb3Vu/ZC1tZW51XzEyNzQy/NS01ODkuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZA" className="d-block w-100 h-100" style={{filter:"brightness(30%)"}} alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://imgs.search.brave.com/gGdDeyrLuXWBjr13dn3o3XfWOCpQIhK15WOb0Mi2NzI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzE1LzY1LzY1/LzM2MF9GXzExNTY1/NjU0Ml8yOUNYN0NH/UFh1ZFNiM0RUcDI1/aGNRRFplbzNkamlU/Yy5qcGc" className="d-block w-100 h-100" style={{filter:"brightness(30%)"}}  alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        
         


        </div>
    )
}

export default Carousal 