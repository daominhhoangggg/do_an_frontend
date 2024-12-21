import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductAPI from "../API/ProductAPI";
import Loading from "../Loading/Loading";

function UpdateProduct(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [short_desc, setShortDesc] = useState("");
  const [long_desc, setLongDesc] = useState("");
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const productId = useParams().productId;

  // Xử lý nhiều file
  const handleFileChange = (e) => {
    e.preventDefault();
    const newFileArray = Array.from(e.target.files);
    const newPreviewArray = newFileArray.map((file) =>
      URL.createObjectURL(file)
    );
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

  // Lấy thông tin sản phẩm cần cập nhật
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await ProductAPI.getDetail(productId);

        console.log(response);

        setName(response.name);
        setPrice(response.price);
        setCategory(response.category);
        setShortDesc(response.short_desc);
        setLongDesc(response.long_desc);
        setPreview(response.img);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const remain = preview.filter((url) => !url.startsWith("blob:"));

      const form = new FormData();
      form.append("name", name);
      form.append("price", price);
      form.append("category", category);
      form.append("short_desc", short_desc);
      form.append("long_desc", long_desc);
      remain.forEach((url) => {
        form.append("remain", url);
      });
      files.forEach((file) => {
        form.append("files", file);
      });

      await ProductAPI.updateProduct(productId, form);

      setLoading(false);
    } catch (error) {
      // console.log("error", error);
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Update Product</h4>
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
                          style={{
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            return handleRemoveImage(index);
                          }}
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

export default UpdateProduct;
