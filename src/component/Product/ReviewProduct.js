import React, { useEffect, useState } from "react";
import "./ReviewProduct.scss";
import Lightbox from "react-image-lightbox";
import moment from "moment";
import "react-image-lightbox/style.css";
import CommonUtils from "../../utils/CommonUtils";
import {
  createNewReviewService,
  getAllReviewByProductIdService,
  ReplyReviewService,
  deleteReviewService,
} from "../../services/userService";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import ReviewModal from "./ReviewModal";
function ReviewProduct(props) {
  const { id } = useParams();
  const [inputValues, setInputValues] = useState({
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
  let openPreviewImage = (url) => {
    setInputValues({ ...inputValues, ["imageReview"]: url, ["isOpen"]: true });
  };
  let loadAllReview = async () => {
    let res = await getAllReviewByProductIdService(id);
    if (res && res.errCode === 0) {
      let count5 = res.data.filter((item) => item.star === 5);
      let count4 = res.data.filter((item) => item.star === 4);
      let count3 = res.data.filter((item) => item.star === 3);
      let count2 = res.data.filter((item) => item.star === 2);
      let count1 = res.data.filter((item) => item.star === 1);

      await setInputValues({
        ...inputValues,
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
  let handleChooseStart = (number) => {
    setInputValues({ ...inputValues, ["activeStar"]: number });
  };
  let handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file.size > 31312281) {
      toast.error("Dung lượng file bé hơn 30mb");
    } else {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      setInputValues({
        ...inputValues,
        ["image"]: base64,
        ["imageReview"]: objectUrl,
      });
    }
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  let handleSaveComment = async () => {
    if (!inputValues.activeStar) toast.error("Bạn chưa chọn sao !");
    else if (!inputValues.content)
      toast.error("Nội dung không được để trống !");
    else {
      let response = await createNewReviewService({
        productId: id,
        content: inputValues.content,
        image: inputValues.image,
        userId: inputValues.user.id,
        star: inputValues.activeStar,
      });
      if (response && response.errCode === 0) {
        toast.success("Đăng đánh giá thành công !");

        await loadAllReview();
      } else {
        toast.error(response.errMessage);
      }
    }
  };
  let closeModal = () => {
    setInputValues({
      ...inputValues,
      ["isOpenModal"]: false,
      ["parentId"]: "",
    });
  };
  let handleOpenModal = (id) => {
    setInputValues({ ...inputValues, ["isOpenModal"]: true, ["parentId"]: id });
  };
  let sendDataFromReViewModal = async (content) => {
    let res = await ReplyReviewService({
      content: content,
      productId: id,
      userId: inputValues.user.id,
      parentId: inputValues.parentId,
    });

    if (res && res.errCode === 0) {
      toast.success("Phản hồi thành công !");

      await loadAllReview();
    }
  };
  let handleDeleteReply = async (id) => {
    let res = await deleteReviewService({
      data: {
        id: id,
      },
    });
    if (res && res.errCode === 0) {
      toast.success("Xóa phản hồi thành công !");
      await loadAllReview();
    } else {
      toast.error(res.errMessage);
    }
  };
  function getPercentage(count) {
    const totalReviews =
      inputValues.countStar.star5 +
      inputValues.countStar.star4 +
      inputValues.countStar.star3 +
      inputValues.countStar.star2 +
      inputValues.countStar.star1;

    
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
  }
  const [showAllComments, setShowAllComments] = useState(false);

  const toggleShowAllComments = () => {
    setShowAllComments((prev) => !prev);
  };

  const displayedComments = showAllComments
    ? inputValues.dataReview
    : inputValues.dataReview.slice(0, 5); 

  return (
    <div className="row">
      <div className="review-product col-lg-12">
        <div className="row total_rate">
          <div className="col-5 total_rate-left">
            <div className="box_total">
              <h4>
                {inputValues.countStar.average
                  ? Math.round(inputValues.countStar.average * 10) / 10
                  : 0}
                /5
              </h4>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span className="aaa">
                  {Array.from({
                    length: Math.floor(inputValues.countStar.average),
                  }).map((_, index) => (
                    <i
                      style={{
                        color: "rgb(255, 191, 0)",
                        fontSize: 13,
                        marginLeft: 10,
                      }}
                      key={index}
                      className="fa-solid fa-star"
                    ></i>
                  ))}
                  {inputValues.countStar.average % 1 !== 0 && (
                    <i
                      style={{
                        color: "rgb(255, 191, 0)",
                        fontSize: 13,
                        marginLeft: 10,
                      }}
                      className="fa-solid fa-star-half"
                    ></i>
                  )}
                </span>
              </div>
              <h6>({inputValues.countStar.quantity} lượt đánh giá)</h6>
            </div>
          </div>
          <div className="col-7 total_rate-right">
            <div className="rating_list px-4">
              <ul className="list-start">
                {[
                  { star: 5, count: inputValues.countStar.star5 },
                  { star: 4, count: inputValues.countStar.star4 },
                  { star: 3, count: inputValues.countStar.star3 },
                  { star: 2, count: inputValues.countStar.star2 },
                  { star: 1, count: inputValues.countStar.star1 },
                ].map((item, index) => (
                  <li key={index} className="rating-item">
                    <span className="sss" style={{ display: "block" }}>
                      {item.star}
                    </span>
                    <i
                      style={{ color: "rgb(255, 191, 0)", fontSize: 13 }}
                      className="fa fa-star"
                    />
                    <div className="rating-bar-container">
                      <div
                        className="rating-bar"
                        style={{
                          width: `${getPercentage(item.count)}%`, // Tính phần trăm chính xác
                          backgroundColor: "rgb(0, 110, 227)", // Màu đỏ cho thanh đã đánh giá
                        }}
                      ></div>
                    </div>
                    <span style={{ width: 100 }} className="rating-count">
                      {item.count} đánh giá
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="review_list">
          {inputValues.user && (
            <div className="review_item">
              <div className="form-group-review">
                <label
                  style={{ color: "#333", fontSize: "16px", fontWeight: "600" }}
                >
                  Viết đánh giá của bạn
                </label>
                <textarea
                  name="content"
                  value={inputValues.content}
                  onChange={(event) => handleOnChange(event)}
                  rows="3"
                  className="form-input"
                ></textarea>
              </div>
              <div className="content-review">
                <div className="content-left">
                  <label
                    style={{ marginBottom: "0", cursor: "pointer" }}
                    htmlFor="cmtImg"
                  >
                    <i className="fas fa-camera"></i>
                  </label>

                  <input
                    type="file"
                    id="cmtImg"
                    accept=".jpg,.png"
                    hidden
                    onChange={(event) => handleOnChangeImage(event)}
                  />
                  <div
                    className={
                      inputValues.activeStar === 1
                        ? "box-star active"
                        : "box-star"
                    }
                    onClick={() => handleChooseStart(1)}
                  >
                    <i className="fa fa-star" />
                  </div>
                  <div
                    className={
                      inputValues.activeStar === 2
                        ? "box-star active"
                        : "box-star"
                    }
                    onClick={() => handleChooseStart(2)}
                  >
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                  <div
                    className={
                      inputValues.activeStar === 3
                        ? "box-star active"
                        : "box-star"
                    }
                    onClick={() => handleChooseStart(3)}
                  >
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                  <div
                    className={
                      inputValues.activeStar === 4
                        ? "box-star active"
                        : "box-star"
                    }
                    onClick={() => handleChooseStart(4)}
                  >
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                  <div
                    className={
                      inputValues.activeStar === 5
                        ? "box-star active"
                        : "box-star"
                    }
                    onClick={() => handleChooseStart(5)}
                  >
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                </div>
                <div className="content-right">
                  <div
                    onClick={() => handleSaveComment()}
                    className="btn btn-primary"
                  >
                    Gửi đánh giá
                  </div>
                </div>
              </div>
              <div
                style={{ backgroundImage: `url(${inputValues.imageReview})` }}
                className="preview-cmt-img"
              ></div>
            </div>
          )}

         <>
         {inputValues.dataReview &&
        inputValues.dataReview.length > 0 &&
        displayedComments.map((item, index) => {
          if (!item.parentId) {
            let name = `${item.user.firstName ? item.user.firstName : ""} ${item.user.lastName}`;
            let arrStar = Array(item.star).fill(1); // Simplified array creation for stars

            return (
              <div key={index} className="review_item">
                <div className="media">
                  <div className="d-flex">
                    <img
                      style={{ width: 40, height: 40 }}
                      className="img-avatar"
                      src={item.user.image}
                      alt=""
                    />
                  </div>
                  <div className="media-body">
                    <div className="d-flex">
                      <h4>{name}</h4>
                      <span
                        style={{
                          color: "#707070",
                          marginTop: -1,
                          marginLeft: 10,
                          fontSize: 13,
                        }}
                      >
                        <i style={{ color: "black", marginRight: 5 }} className="fa-regular fa-clock"></i>
                        {moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                      </span>
                    </div>
                    {arrStar.map((_, starIndex) => (
                      <i
                        style={{
                          fontSize: 13,
                          color: "rgb(255, 191, 0)",
                        }}
                        key={starIndex}
                        className="fa fa-star"
                      />
                    ))}
                    {inputValues.user && inputValues.user.roleId === "R1" && (
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => handleOpenModal(item.id)}
                        className="reply_btn"
                      >
                        Phản hồi
                      </a>
                    )}
                  </div>
                </div>
                <div style={{ marginLeft: "88px" }}>
                  <p style={{ paddingTop: "0px", fontSize: 15 }}>{item.content}</p>

                  {item.image && (
                    <img
                      onClick={() => openPreviewImage(item.image)}
                      className="img-cmt"
                      src={item.image}
                      alt=""
                    />
                  )}
                  {item.childComment &&
                    item.childComment.length > 0 &&
                    item.childComment.map((childItem, childIndex) => (
                      <div key={childIndex} className="box-reply">
                        <span style={{ fontSize: 14 }}>Phản hồi của người bán</span>
                        <p style={{ fontSize: 15 }}>{childItem.content}</p>
                        {inputValues.user.roleId === "R1" && (
                          <button
                            onClick={() => handleDeleteReply(childItem.id)}
                            className="delete-cmt"
                            type="button"
                          >
                            Xóa
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            );
          }
          return null; // Return null if parentId exists
        })}
      {inputValues.dataReview.length > 4 && (
        <div onClick={toggleShowAllComments} className="secondary" style={{ cursor: 'pointer' }}>
        {showAllComments ? (
          <>
            Ẩn bớt <i  className="fa-solid fa-angles-up"></i>
          </>
        ) : (
          <>
            Xem thêm <i className="fa-solid fa-angles-down"></i>
          </>
        )}
      </div>
      
      )}
    
    </>
        </div>
      </div>
      {inputValues.isOpen === true && (
        <Lightbox
          mainSrc={inputValues.imageReview}
          onCloseRequest={() =>
            setInputValues({
              ...inputValues,
              ["isOpen"]: false,
              ["imageReview"]: "",
            })
          }
        />
      )}
      <ReviewModal
        isOpenModal={inputValues.isOpenModal}
        closeModal={closeModal}
        sendDataFromReViewModal={sendDataFromReViewModal}
      />
    </div>
  );
}

export default ReviewProduct;
