import React, { useState } from "react";
import ProductAPI from "../API/ProductAPI";

function NewProduct(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [short_desc, setShortDesc] = useState("");
  const [long_desc, setLongDesc] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemove = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchNewProduct = async () => {
      const data = {
        name: name,
        price: price,
        category: category,
        short_desc: short_desc,
        long_desc: long_desc,
        files: files,
      };
      await ProductAPI.postNewProduct(data);
    };

    fetchNewProduct();
    // window.location.href = "/products";
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
                Upload image (5 images)
              </label>
              <input
                type="file"
                className="form-control-file"
                id="exampleFormControlFile1"
                multiple
                onChange={handleFileChange}
              />
            </div>
            <div className="mt-3 mb-3">
              {files.length > 0 && (
                <ul className="list-group">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="list-group-item"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {file.name}
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() => handleRemove(index)}
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              )}
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
