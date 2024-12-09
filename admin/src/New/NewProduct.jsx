import React, { useEffect, useState } from "react";
import ProductAPI from "../API/ProductAPI";
import alertify from "alertifyjs";

function NewProduct(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [short_desc, setShortDesc] = useState("");
  const [long_desc, setLongDesc] = useState("");
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);

  // nhiều file
  const handleFileChange = (e) => {
    const fileArray = Array.from(e.target.files);
    setFiles(fileArray);
    const previewArray = fileArray.map((file) => URL.createObjectURL(file));
    setPreview(previewArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ name, price, category, short_desc, long_desc });
    // console.log("files:", files[0].name);
    try {
      const form = new FormData();
      form.append("name", name);
      form.append("price", price);
      form.append("category", category);
      form.append("short_desc", short_desc);
      form.append("long_desc", long_desc);
      files.forEach((file) => {
        form.append("files", file);
      });
      const response = await ProductAPI.postNewProduct(form);
      console.log(response);

      alertify.set("notifier", "position", "bottom-left");
      if (response.status === 201) {
        alertify.success(response.message);
      } else {
        alertify.error(response.message);
      }
    } catch (error) {
      console.error("Failed to add product:", error.message);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <form
            style={{ width: "50%", marginLeft: "40px" }}
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Short Description</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter Short Description"
                value={short_desc}
                onChange={(e) => setShortDesc(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Long Description</label>
              <textarea
                className="form-control"
                rows="6"
                placeholder="Enter Long Description"
                value={long_desc}
                onChange={(e) => setLongDesc(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlFile1">
                Upload image (3 images)
              </label>
              <input
                type="file"
                className="form-control-file"
                id="exampleFormControlFile1"
                multiple
                onChange={handleFileChange}
              />
            </div>
            <div className="row mt-3 mb-3">
              {preview.map((url, index) => (
                <div key={index} className="col-md-3 mb-3">
                  <img
                    src={url}
                    alt={index}
                    className="img-fluid rounded shadow"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
