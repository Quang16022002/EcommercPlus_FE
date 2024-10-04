import React, { useState, useEffect } from "react";
import ItemProduct from "../Product/ItemProduct";
import { getAllProductUser } from "../../services/userService";
import { PAGINATION } from "../../utils/constant";
import ReactPaginate from "react-paginate";
import FormSearch from "../Search/FormSearch";
import ProductPreview from '../Product/ProductPreview';
import './MainShop.scss'
function MainShop(props) {
  const [dataProduct, setdataProduct] = useState([]);
  const [count, setCount] = useState(0);
  const [numberPage, setnumberPage] = useState(0);
  const [limitPage, setlimitPage] = useState(8);
  const [sortPrice, setsortPrice] = useState("");
  const [sortName, setsortName] = useState("");
  const [offset, setoffset] = useState(0);
  const [categoryId, setcategoryId] = useState("");
  const [brandId, setbrandId] = useState("");
  const [keyword, setkeyword] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  
useEffect(() => {
  loadProduct(limitPage, sortName, sortPrice, offset, categoryId, keyword);
}, [limitPage, sortName, sortPrice, offset, categoryId, keyword, brandId]);

  useEffect(() => {
    setcategoryId(props.categoryId);
    setbrandId(props.brandId);
    loadProduct(limitPage, sortName, sortPrice, offset, props.categoryId, keyword);
  }, [props.categoryId, props.brandId]);

  const loadProduct = async (limitPage, sortName, sortPrice, offset, categoryId, keyword) => {
    try {
      const arrData = await getAllProductUser({
        sortPrice: sortPrice,
        sortName: sortName,
        limit: limitPage,
        offset: offset,
        categoryId: categoryId,
        brandId: brandId,
        keyword: keyword,
    
      });
      if (arrData && arrData.errCode === 0) {
        setdataProduct(arrData.data);
      
        setCount(Math.ceil(arrData.count / limitPage));
        console.log('Danh sách sản phẩm:', arrData.data);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleSelectLimitPage = (event) => {
    setlimitPage(event.target.value);
    setoffset(0); // Reset lại offset khi thay đổi số lượng trang
  };

  const handleChangePage = (number) => {
    
    setnumberPage(number.selected);
    setoffset(number.selected * limitPage);
    props.myRef.current.scrollIntoView();
  };

  const handleSelectSort = (event) => {
    let value = +event.target.value;
    setsortName("");
    setsortPrice("");

    if (value === 2) {
      setsortPrice(true);
    } else if (value === 3) {
      setsortName(true);
    }
  };

  const handleSearch = (keyword) => {
    setkeyword(keyword);
  };

  const handleOnchangeSearch = (keyword) => {
    if (keyword === "") {
      setkeyword(keyword);
    }
  };

  const handlePreview = (product) => {
    setCurrentProduct(product);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setCurrentProduct(null);
  };
  
  return (
    <div className="col-lg-12">
      <div>
      </div>
      <div className="product_top_bar">
        <div className="left_dorp d-flex">
          <select
            style={{ outline: "none" }}
            onChange={handleSelectSort}
            className="sortingg"
          >
            <option value={1}>Sắp xếp</option>
            <option value={2}>Theo giá tiền</option>
            <option value={3}>Theo tên</option>
          </select>
          <select
            style={{ outline: "none" }}
            onChange={handleSelectLimitPage}
            className="sortingg"
          >
            <option value={8}>Hiển thị 8</option>
            <option value={16}>Hiển thị 16</option>
            <option value={24}>Hiển thị 24</option>
            <option value={10000000}>Hiển thị tất cả</option>
          </select>


          <div
            style={{
              display: "inline-block",
              marginLeft: "10px",
              width: "300px",
            }}
          >
            <FormSearch
              title={"tên sản phẩm"}
              handleOnchange={handleOnchangeSearch}
              handleSearch={handleSearch}
            />
          </div>
       

        </div>
      </div>
      <div style={{ marginBottom: "10px" }} className="latest_product_inner">
        <div className="row">
          {dataProduct && dataProduct.length > 0 && dataProduct.map((item, index) => {
            // Kiểm tra sự tồn tại của productDetail và productImage
            if (item.productDetail && item.productDetail[0] && item.productDetail[0].productImage && item.productDetail[0].productImage[0]) {
              return (
                <ItemProduct
                  key={item.id}
                  id={item.id}
                  type="col-lg-3 col-md-6"
                  name={item.name}
                  img={item.productDetail[0].productImage[0].image}
                  discountPrice={item.productDetail[0].discountPrice}
                  price={item.productDetail[0].originalPrice}
                  onPreview={() => handlePreview(item)}
                />
              );
            }
            return null; // Trả về null nếu không có dữ liệu hình ảnh
          })}
        </div>
      </div>
      {/* <ReactPaginate
        previousLabel={"Quay lại"}
        nextLabel={"Tiếp"}
        breakLabel={"..."}
        pageCount={count}
        marginPagesDisplayed={3}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakLinkClassName={"page-link"}
        breakClassName={"page-item"}
        activeClassName={"active"}
        onPageChange={handleChangePage}
      /> */}
      {showPreview && currentProduct && (
        <div className="product-preview-overlay" onClick={handleClosePreview}>
          <ProductPreview 
            products={dataProduct} 
            currentProduct={currentProduct}
            onPreviewChange={handlePreview}
            onClose={handleClosePreview}
          />
        </div>
      )}
    </div>
  );
}

export default MainShop;
