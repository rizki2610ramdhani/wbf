import React, { useContext } from "react";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Tmb from "../assets/image/Thumbnail.png";
import Profile from "../assets/image/blank-profile.png";
import { Button, Form } from "react-bootstrap";

import { API } from "../config/api";
import { useMutation } from "react-query";
import { UserContext } from "../context/userContext";
import Swal from "sweetalert2";

function UpdateProfile(props) {
  let navigate = useNavigate();

  const [state] = useContext(UserContext);
  const [imageUrl, setImageUrl] = useState(Profile);
  const [formUpdateProfile, setFormProfile] = useState({
    photo: "",
    phone: "",
    address: "",
  }); //Store profile data

  async function getDataUpdateProfile() {
    const responseProfile = await API.get("/profile");
    if (responseProfile.data.data.photo !== "") {
      setImageUrl(responseProfile.data.data.photo);

    }

    setFormProfile({
      ...formUpdateProfile,
      phone: responseProfile.data.data.phone,
      address: responseProfile.data.data.address,
    });
  }

  useEffect(() => {
    getDataUpdateProfile();
  }, []);

  // Handle change data on form
  const handleChange = (e) => {
    setFormProfile({
      ...formUpdateProfile,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setImageUrl(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      if (formUpdateProfile.photo) {
        formData.set("photo", formUpdateProfile?.photo[0], formUpdateProfile?.photo[0]?.name);
      }
      formData.set("phone", formUpdateProfile.phone);
      formData.set("address", formUpdateProfile.address);

      // await disini berfungsi untuk menunggu sampai promise tersebut selesai dan mengembalikkan hasilnya
      const response = await API.patch("/profile", formData, config);
      console.log(response.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Update Product Success",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/my-transaction");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <div className="container d-flex justify-content-around align-items-center my-5" style={{ marginTop: 46 }}>
        <div style={{ width: 472 }}>
          <p className="fw-bold fs-3" style={{ color: "#613D2B", marginBottom: 31 }}>
            Update Profile
          </p>

          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div class="mb-3">
              <input
                type="number"
                className="form-control p-2"
                name="phone"
                placeholder="Phone"
                value={formUpdateProfile.phone}
                onChange={handleChange}
                id="phone"
                style={{
                  textColor: "#613D2B",
                  backgroundColor: "rgba(97, 61, 43, 0.25)",
                  border: "2px solid #613D2B",
                }}
              />
            </div>

            <div class="mb-3">
              <textarea
                className="form-control p-2"
                name="address"
                placeholder="Address"
                value={formUpdateProfile.address}
                onChange={handleChange}
                id="address"
                style={{ height: 150, resize: "none", textColor: "#613D2B", backgroundColor: "rgba(97, 61, 43, 0.25)", border: "2px solid #613D2B" }}
              ></textarea>
            </div>

            <Form.Group
              controlId="formFile"
              className=""
              style={{
                textColor: "#613D2B",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #613D2B",
                borderRadius: 5,
                width: 190,
                height: 50,
              }}
            >
              <Form.Label className="d-flex">
                <div className="d-flex justify-content-between align-text-center">
                  <Form.Control name="photo" onChange={handleChange} type="file" hidden placeholder="Photo Product" cursor="pointer" />
                  <p className="m-0 mt-2 ms-2" style={{ color: "grey" }}>
                    Photo Profile
                  </p>
                </div>
                <div className="d-flex ms-5 mt-2">
                  <img src={Tmb} alt="" />
                </div>
              </Form.Label>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button
                type="submit"
                variant="outline-light"
                className="btn"
                style={{
                  backgroundColor: "#613D2B",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "white",
                  width: 260,
                  height: 40,
                  marginTop: 66,
                }}
              >
                Update Profile
              </Button>
            </div>
          </form>
        </div>
        <div style={{ width: 436, height: 555 }}>
          <img src={imageUrl} style={{ width: "100%" }} alt="" />
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
