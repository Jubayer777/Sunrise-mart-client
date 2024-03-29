import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { name, displayName, email } = loggedInUser;
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/orders?email=' + email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setOrders(data))
        .catch((err)=>{
            console.log(err);
        })
    }, [email])

    return (
        <div >
            <h1 className='text-center'>Welcome! <strong>{name || displayName}</strong></h1>
             <h5 className='text-center mt-4'>Email: {email}</h5>
            <h6 className='text-center mt-4 mb-5'>You have: {orders.length} orders</h6>
            <table className="table text-center">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Purchase Date</th>
                    </tr>
                </thead>
                {
                    orders.map(pd =>                       
                        <tbody key={pd._id}>
                            <tr>
                                <td >{pd.name}</td>
                                <td >{pd.productName}</td>
                                <td >$ {pd.price}</td>
                                <td >{(new Date(pd.date).toDateString('dd/MM/yyyy'))}</td>
                            </tr>
                        </tbody>                       
                    )
                }
            </table>
        </div>
    );
};

export default Orders;