import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Admin from '../Admin/Admin';
import './ManageProduct.css';

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://warm-coast-43537.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [products])

    const handleDeleteProduct = id => {
        fetch(`https://warm-coast-43537.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
   }
    return (
        <div>
            <Admin></Admin>
            <h3 className='text-center mt-5 mb-5'>Manage Product</h3>
            <table className="table text-center css-serial">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Serial</th>
                        <th scope="col">Name</th>
                        <th scope="col">Weight</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                {
                    products.map(pd =>
                        <tbody key={pd._id}>
                            <tr>
                                <td ></td>
                                <td >{pd.productName}</td>
                                <td >{pd.weight}</td>
                                <td >$ {pd.price}</td>
                                <td ><p style={{ cursor: 'pointer' }} onClick={() => handleDeleteProduct(pd._id)}><FontAwesomeIcon icon={faTrashAlt} /></p></td>
                            </tr>
                        </tbody>
                    )
                }
            </table>
        </div>
    );
};

export default ManageProduct;