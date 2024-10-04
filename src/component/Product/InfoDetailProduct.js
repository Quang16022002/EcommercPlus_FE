import React, { useEffect, useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addItemCartStart } from "../../action/ShopCartAction";
import "./InfoDetailProduct.scss";
import CommonUtils from "../../utils/CommonUtils";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  createNewReviewService,
  getAllReviewByProductIdService,
  ReplyReviewService,
  deleteReviewService,
} from "../../services/userService";
import { useParams } from "react-router";
function InfoDetailProduct(props) {
  let { dataProduct } = props;
  let [arrDetail, setarrDetail] = useState([]);
  const [productDetail, setproductDetail] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const [imgPreview, setimgPreview] = useState("");
  const [activeLinkId, setactiveLinkId] = useState("");
  const [quantity, setquantity] = useState("");
  const [quantityProduct, setquantityProduct] = useState(1);
  const { id } = useParams();
  const [review, setReview] = useState({
    activeStar: "",
    imageReview: "",
    image: "",
    content: "",
    user: JSON.parse(localStorage.getItem("userData")),
    dataReview: [],
    countStar: {},
    isOpen: false,
    isOpenModal: false,
    parentId: "",
  });
  useEffect(() => {
    let fetchAllReview = async () => {
      await loadAllReview();
    };
    fetchAllReview();
  }, []);

  let loadAllReview = async () => {
    let res = await getAllReviewByProductIdService(id);
    if (res && res.errCode === 0) {
      let count5 = res.data.filter((item) => item.star === 5);
      let count4 = res.data.filter((item) => item.star === 4);
      let count3 = res.data.filter((item) => item.star === 3);
      let count2 = res.data.filter((item) => item.star === 2);
      let count1 = res.data.filter((item) => item.star === 1);

      await setReview({
        ...review,
        ["dataReview"]: res.data,
        ["countStar"]: {
          star5: count5.length,
          star4: count4.length,
          star3: count3.length,
          star2: count2.length,
          star1: count1.length,
          average:
            (count5.length * 5 +
              count4.length * 4 +
              count3.length * 3 +
              count2.length * 2 +
              count1.length * 1) /
            (count5.length +
              count4.length +
              count3.length +
              count2.length +
              count1.length),
          quantity:
            count5.length +
            count4.length +
            count3.length +
            count2.length +
            count1.length,
        },
        ["content"]: "",
        ["image"]: "",
        ["imageReview"]: "",
        ["activeStar"]: "",
        ["isOpenModal"]: false,
      });
    }
  };

  useEffect(() => {
    let { productDetail } = dataProduct ? dataProduct : [];

    if (productDetail) {
      setproductDetail(productDetail);

      setarrDetail(productDetail[0]);
      setactiveLinkId(productDetail[0].productDetailSize[0].id);
      setquantity(productDetail[0].productDetailSize[0].stock);

      props.sendDataFromInforDetail(productDetail[0].productDetailSize[0]);
    }
  }, [props.dataProduct]);
  let handleSelectDetail = (event) => {
    setarrDetail(productDetail[event.target.value]);
    if (
      productDetail[event.target.value] &&
      productDetail[event.target.value].productDetailSize.length > 0
    ) {
      setactiveLinkId(
        productDetail[event.target.value].productDetailSize[0].id
      );
      setquantity(productDetail[event.target.value].productDetailSize[0].stock);
      props.sendDataFromInforDetail(
        productDetail[event.target.value].productDetailSize[0]
      );
    }
  };
  let openPreviewImage = (url) => {
    setimgPreview(url);
    setisOpen(true);
  };
  let handleClickBoxSize = (data) => {
    setactiveLinkId(data.id);
    setquantity(data.stock);
    props.sendDataFromInforDetail(data);
  };
  const dispatch = useDispatch();
  let handleAddShopCart = () => {
    if (quantity === 0) {
      toast.warn("Sản phẩm đã hết hàng");
      return;
    }
   
    if (props.userId) {
      dispatch(
        addItemCartStart({
          userId: props.userId,
          productdetailsizeId: activeLinkId,
          quantity: quantityProduct,
        })
      );
      toast.success("Đã thêm vào giỏ hàng");
    } else {
      toast.error("Đăng nhập để thêm vào giỏ hàng");
    }
  };
  
  

console.log('arrDetail',arrDetail)
  return (
    <div className="row s_product_inner mt-5">
      <div style={{padding:0}} className="page_link">
        <i class="fa-solid fa-house"></i>
        <Link to={"/"}>Trang chủ</Link>
        <i class="fa-solid fa-angles-right"></i>
        <Link to={"/shop"}>Cửa hàng</Link>
        <i class="fa-solid fa-angles-right"></i>
        <a>{dataProduct.name}</a>
      </div>
      <div className="col-lg-6">
        <div className="s_product_img ">
          <h1 style={{ fontSize: 22, fontWeight: 600 }}>{dataProduct.name}</h1>
          <div className="d-flex">
            <span>
              {Array.from({ length: Math.floor(review.countStar.average) }).map(
                (_, index) => (
                  <i style={{color:'rgb(250, 212, 0)'}} key={index} className="fa-solid fa-star"></i>
                )
              )}
              {review.countStar.average % 1 !== 0 && (
                <i style={{color:'rgb(250, 212, 0)'}} className="fa-solid fa-star-half"></i>
              )}
              
            </span>
            <span style={{color: "rgb(153, 153, 153)", fontSize:14, marginTop:2, marginLeft:10}}>{review.countStar.quantity} đánh giá</span>
          </div>

          <div className="d-flex mt-4">
            <h2 style={{ fontSize: 22, fontWeight: 600 }}>
              {CommonUtils.formatter.format(arrDetail.discountPrice)}
            </h2>
            <del
              style={{
                fontSize: 16,
                marginLeft: 10,
                fontWeight: 500,
                color: "rgb(153, 153, 153)",
              }}
            >
              {CommonUtils.formatter.format(arrDetail.originalPrice)}
            </del>
          </div>
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
           
            <div className="carousel-inner">
              {arrDetail &&
                arrDetail.productImage &&
                arrDetail.productImage.length > 0 &&
                arrDetail.productImage.map((item, index) => {
                  if (index === 0) {
                    return (
                      <div
                        onClick={() => openPreviewImage(item.image)}
                        style={{ cursor: "pointer" }}
                        className="carousel-item active"
                      >
                        <img
                          style={{ borderRadius: 20 }}
                          className="d-block w-100"
                          src={item.image}
                          alt="Ảnh bị lỗi"
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div
                        onClick={() => openPreviewImage(item.image)}
                        style={{ cursor: "pointer" }}
                        className="carousel-item "
                      >
                        <img
                          style={{ borderRadius: 20 }}
                          className="d-block w-100"
                          src={item.image}
                          alt="Ảnh bị lỗi"
                        />
                      </div>
                    );
                  }
                })}
            </div>
            <div>
              <ol className="carousel-indicators">
                {arrDetail &&
                  arrDetail.productImage &&
                  arrDetail.productImage.length > 0 &&
                  arrDetail.productImage.map((item, index) => {
                    if (index === 0) {
                      return (
                        <li
                          data-target="#carouselExampleIndicators"
                          data-slide-to={index}
                          className="active"
                        >
                          <img
                            style={{ borderRadius: 12 }}
                            height="60px"
                            className="w-100"
                            src={item.image}
                            alt=""
                          />
                        </li>
                      );
                    } else {
                      return (
                        <li
                          data-target="#carouselExampleIndicators"
                          data-slide-to={index}
                          className=""
                        >
                          <img
                            style={{ borderRadius: 12 }}
                            height="60px"
                            className="w-100"
                            src={item.image}
                            alt=""
                          />
                        </li>
                      );
                    }
                  })}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-5 offset-lg-1">
        <div className="s_product_text">
            <h1 style={{color:'rgb(69, 69, 69)'}} className="s_product_text-title">LỰA CHỌN CẤU HÌNH VÀ MÀU SẮC</h1>
          <ul className="list">
            <li>
              <a className="active" href="#">
                <span>Loại</span> :{" "}
               <span style={{}}>
                  {dataProduct && dataProduct.categoryData
                    ? dataProduct.categoryData.value
                    : ""}
               </span>
              </a>
            </li>
            <li>
              <a href="#">
                {" "}
                <span>Trạng Thái</span> :{" "}
                {quantity > 0 ? "Còn hàng" : "Hết hàng"}
              </a>
            </li>
            <li>
                  <span style={{fontSize:16, fontWeight:500}}>Dung lượng</span>
              <div className="box-size">
                <a href="#">
                  {" "}
                </a>
                {arrDetail &&
                  arrDetail.productDetailSize &&
                  arrDetail.productDetailSize.length > 0 &&
                  arrDetail.productDetailSize.map((item, index) => {
                    const isActive = item.id === activeLinkId;
                    return (
                      <div
                        onClick={() => handleClickBoxSize(item)}
                        key={index}
                        className={
                          item.id === activeLinkId
                            ? "product-size active"
                            : "product-size"
                        }
                      >
                    <div className="d-flex flex-column">
                        <span style={{fontWeight:600}}>  {item.sizeData.value}GB</span>
                         <span style={{fontWeight:0, fontSize:13}}> {CommonUtils.formatter.format(arrDetail.discountPrice)}</span>
                    </div>
                        {isActive && <div className="aa"></div>}{" "}
                        {/* Chỉ hiển thị khi active */}
                      </div>
                    );
                  })}
              </div>
            </li>
           
            <li>
            <div className="form-group mt-3">
              <label
                style={{
                  fontSize: "14px",
                  color: "#555555",
                  fontFamily: '"Roboto",sans-serif',
                  marginRight:29
                  
                }}
                htmlFor="type"
              >
                Màu sắc
              </label>
              <select
                onChange={(event) => handleSelectDetail(event)}
                className="sorting"
                name="type"
                style={{
                    cursor:'pointer',
                  outline: "none",
                  border: "1px solid #eee",
                  marginLeft: "16px",
                  height:40,
                  borderRadius:8,
                  padding:'0 10px'
                }}
              >
                {dataProduct &&
                  productDetail &&
                  productDetail.length > 0 &&
                  productDetail.map((item, index) => {
                    return (
                      <option key={index} value={index}>
                        {item.nameDetail}
                      </option>
                    );
                  })}
              </select>
            </div>
            </li>
            <li>
              <a href="#">{quantity} sản phẩm có sẵn</a>
            </li>
          </ul>
          <p style={{margin:'10px 0'}}>{arrDetail.description}</p>
          <div style={{ display: "flex" }}>
        <div className="addTocart">
              <div style={{marginTop:7, marginRight:50}} className="product_count">
                <label htmlFor="qty">Số lượng</label>
                {/* <input type="text" name="qty" id="sst" maxLength={12} defaultValue={1} title="Quantity:" className="input-text qty" /> */}
                <input
                  type="number"
                  value={quantityProduct}
                  onChange={(event) => setquantityProduct(event.target.value)}
                  min="1"
                  style={{width:80, cursor:'pointer'}}
                />
              </div>
              
            </div>
  
            <div className="card_area">
              <a className="main_btn" onClick={() => handleAddShopCart()}>
                Thêm vào giỏ
              </a>
              <a className="icon_btn" href="#">
                <i className="lnr lnr lnr-heart" />
              </a>
            </div>
        </div>
        </div>
      </div>
      {isOpen === true && (
        <Lightbox
          mainSrc={imgPreview}
          onCloseRequest={() => setisOpen(false)}
        />
      )}
    </div>
  );
}

export default InfoDetailProduct;
