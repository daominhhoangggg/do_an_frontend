import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ProductAPI from "../API/ProductAPI";
import alertify from "alertifyjs";
import Loading from "../Loading/Loading";

function NewProduct(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [short_desc, setShortDesc] = useState("");
  const [long_desc, setLongDesc] = useState("");
  const [files, setFiles] = useState([]);

  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // nhiều file
  const handleFileChange = (e) => {
    const newFileArray = Array.from(e.target.files);
    // setFiles(fileArray);
    const newPreviewArray = newFileArray.map((file) =>
      URL.createObjectURL(file)
    );
    // setPreview(previewArray);
    // Thêm file mới vào đầu danh sách
    setFiles((prevFiles) => [...newFileArray, ...prevFiles]);
    setPreview((prevPreview) => [...newPreviewArray, ...prevPreview]);
  };
  // Xử lý xóa ảnh
  const handleRemoveImage = (index) => {
    // Xóa file và preview tại index
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreview((prevPreview) => prevPreview.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      if (response.status === 201) {
        alertify.success(response.message);
      } else {
        alertify.error("Failed to add product", response.message);
      }

      history.push({ pathname: "/products", state: { success: true } });
      window.location.href = "/products";
    } catch (error) {
      // console.log("error", error);
      setLoading(false);
      alertify.set("notifier", "position", "bottom-left");
      alertify.error(error.response.data.message);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Add New Product</h4>
                <hr />
                {loading && <Loading />}
                <form
                  style={{
                    width: "50%",
                    margin: "40px 40px 0 0",
                  }}
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
                      Upload image (4 images)
                    </label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="exampleFormControlFile1"
                      multiple
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="row mt-3 mb-3 position-relative">
                    {preview.map((url, index) => (
                      <div key={index} className="col-md-3 mb-3">
                        <img
                          src={url}
                          alt={index}
                          className="img-fluid rounded shadow"
                          style={{ height: "150px", objectFit: "cover" }}
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="btn btn-secondary btn-sm position-absolute"
                          style={{
                            top: "0px", // Đặt sát phần trên
                            right: "5%", // Đặt sát phần phải
                            zIndex: 10, // Đảm bảo nút hiển thị trên ảnh
                            borderRadius: "50%", // Nút tròn
                            width: "25px", // Kích thước nút nhỏ gọn
                            height: "25px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          X
                        </button>
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
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
