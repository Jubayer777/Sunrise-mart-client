import React from 'react';
import { useHistory } from 'react-router';
import './Product.css';

const Product = (props) => {
    const {_id, productName, weight, price, imageURL } = props.product;

    const history=useHistory();
    const handleAddProduct=id=>{
        history.push(`/checkout/${id}`)
    }
    return (
        <div className=' d-flex justify-content-center col mt-4'>
            <div className="card" id='card-style' >
                <img className='card-img-top' src={imageURL} alt="" />
                <div className="card-body">
                    <h6>{productName}-{weight}</h6>
                    <br/>
                    <div className='d-flex justify-content-between'>
                        <h4 className="font-weight-bold text-danger">${price}</h4>
                        <button type="button" onClick={()=>handleAddProduct(_id)} id="buy-now-btn" className="btn ">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;

