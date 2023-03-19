// import DataProduct from "../assets/data/data.json";
// import { useState } from "react";
import { UserContext } from "../context/userContext";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../config/api";
import Swal from "sweetalert2";

const Products = () => {
  const navigate = useNavigate();

  const [state] = useContext(UserContext);

  // Fetching product data from database
  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  let { data: carts, refetch: refetchCarts } = useQuery("cartsListCache", async () => {
    const response = await API.get("/carts");
    console.log(response.data.data);
    return response.data.data;
  });

  const params = useParams();
  let Product = products.filter((Product) => Product.id === parseInt(params.id));
  Product = Product[0];

  const addCart = useMutation(async () => {
    try {
      // e.preventDefault();
      const cart = carts.find((cart) => cart.product_id === Product.id && cart.user_id === state.user.id);
        const response = await API.patch(`/increase/${cart.id}`);
        

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Add Success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/my-cart");
      // if (carts.filter((cart) => cart.user_id === state.user.id).some((c) => c.product_id === Product.id) === true) {
        
      // } else {
        
      // }
    } catch {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = {
        order_quantity: +1,
      };

      const body = JSON.stringify(data);

      console.log(body);
      const response = await API.post(`/cart/${Product.id}`, body, config);
      console.log("transaction success :", response);
      
      navigate("/my-cart");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Add Success",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.reload();
      // Swal.fire({
      //   position: "center",
      //   icon: "failed",
      //   title: "Failed",
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
    }
  });

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center mb-5" style={{ marginTop: 92, padding: "0 100px" }}>
        <div className="left-content">
          <div className="img-wrapper" style={{ width: 436, height: 555 }}>
            <img src={`${Product.photo}`} alt={Product.name} style={{ width: "100%" }} />
          </div>
        </div>
        <div className="ms-5 right-content">
          <div className="right-wrapper">
            <h1 className="fw-bold" style={{ color: "#613D2B", marginTop: 0 }}>
              {Product.name}
            </h1>
            <p style={{ color: "#974A4A", fontSize: 18 }}>Stock: {Product.stock}</p>
            <p className="mt-5" style={{ textAlign: "justify", fontSize: 18 }}>
              {Product.description}
            </p>
            <p className="my-4 text-end" style={{ color: "#974A4A", fontWeight: 900, fontSize: 24 }}>
              Rp. {Product.price}
            </p>
          </div>
          <Button type="submit" onClick={() => addCart.mutate()} className="rounded-3 fw-bold border-0 py-2 w-100 mt-3 text-white" style={{ backgroundColor: "#613D2B" }}>
            Add Cart
          </Button>
        </div>
      </div>
    </>
  );
};

export default Products;
