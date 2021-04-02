import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import './Checkout.css';

const Checkout = () => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    const [orderStatus, setOrderStatus]=useState(false)
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    useEffect(() => {
        fetch(`https://warm-coast-43537.herokuapp.com/product/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id]);
    const { productName, price } = product;
    const {isSignedIn,name,displayName,email}=loggedInUser;
    
    
    const handleOrder=()=>{
        const date= new Date();
        const user={isSignedIn: isSignedIn,name:name||displayName, email:email}
        const orderedProduct={productName:productName,price:price}
        const newOrder= {...user,...orderedProduct, date:date}
        fetch('https://warm-coast-43537.herokuapp.com/addOrder', {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(newOrder)
        })
        .then(res=>res.json())
        .then(data=>{
            alert('Order placed successfully')
            setOrderStatus(true)
        })
    }

    return (
        <div>
            <h3 className="text-center p-5">Checkout</h3>
            <table className="table table-hover" id='table-style'>
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{productName}</td>
                        <td className='px-5'>1</td>
                        <td>${price}</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td> </td>
                        <td>${price}</td>
                    </tr>
                </tbody>
            </table>
            <button type="button" onClick={handleOrder} id="btn-style" className="btn ">Checkout</button>

            <div className="mt-5 text-danger text-center">
                 {
                     orderStatus && <h4>Your order has been placed successfully</h4>
                 }
            </div>
        </div>
    );
};

export default Checkout;