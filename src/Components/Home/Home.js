import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
//spinner css
const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 15%;
  border-color: red;
`;
const Home = () => {
    //spinner state
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("orange");

    const [products, setProducts]=useState([]);
    useEffect(()=>{
          fetch('http://localhost:5000/products')
          .then(res=>res.json())
          .then(data=>{
              setProducts(data)
              setLoading(false);
            }).catch((err)=>{
                console.log(err);
            })
    }, [])
    return (
        <div id="bg-home">
            <div className='row  mx-5 pb-5'> 
                {
                    products.map(pd => <Product key={pd._id} product={pd}></Product>)
                }
                <CircleLoader color={color} loading={loading} css={override} size={60} />
            </div>
        </div>
    );
};

export default Home;