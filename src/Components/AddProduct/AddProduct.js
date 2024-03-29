import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./AddProduct.css";
import Admin from "../Admin/Admin";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const [imageURL, setImageURL] = useState(null);
  const onSubmit = (data) => {
    const productData = {
      productName: data.productName,
      weight: data.weight,
      price: data.price,
      imageURL: imageURL,
    };
    const url = `http://localhost:5000/addProduct`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("Product added successfully!!!");
          reset();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageUpload = (event) => {
    const imageData = new FormData();
    imageData.set("key", "3b179b0f761eefe820295e6bfab857ee");
    imageData.append("image", event.target.files[0]);
    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <Admin></Admin>
      <h3 className="text-center mt-5 mb-5">Add Product</h3>
      <div id="add-product" className="card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex">
            <div className="input-field-left">
              <label>Product Name</label>
              <br />
              <input
                className="form-control"
                placeholder="Enter Name"
                name="productName"
                ref={register}
                required
              />
            </div>
            <div className="input-field-right">
              <label>Weight</label>
              <br />
              <input
                className="form-control"
                placeholder="Enter Weight"
                name="weight"
                ref={register}
                required
              />
            </div>
          </div>
          <div className="d-flex pt-3">
            <div className="input-field-left">
              <label>Add Price</label>
              <br />
              <input
                className="form-control"
                placeholder="Add Price"
                name="price"
                ref={register}
                required
              />
            </div>
            <div className="input-field" id="file-input">
              <label>Add Photo</label>
              <br />
              <input
                className="form-control-file"
                type="file"
                onChange={handleImageUpload}
                required
              />
            </div>
          </div>
          <button htmlType="submit" id="submit-btn" className="btn mt-3">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
