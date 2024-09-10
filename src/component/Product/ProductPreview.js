import React, { useState } from "react";
import CommonUtils from "../../utils/CommonUtils";
import "./ProductPreview.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function ProductPreview({
  products,
  currentProduct,
  onPreviewChange,
  onClose,
}) {
  const [activeProduct, setActiveProduct] = useState(currentProduct);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State để theo dõi ảnh hiện tại

  const handleProductChange = (product) => {
    setActiveProduct(product);
    setCurrentImageIndex(0); // Reset lại chỉ mục ảnh khi chuyển sản phẩm
    onPreviewChange(product);
  };

  const productDetail = activeProduct.productDetail;
  console.log("activeProduct", activeProduct);
  console.log("productDetail", productDetail);

  // Hàm để chuyển sang ảnh tiếp theo
  const handleNextImage = () => {
    if (productDetail.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < productDetail.length - 1 ? prevIndex + 1 : 0
      );
    }
  };

  // Hàm để quay lại ảnh trước đó
  const handlePreviousImage = () => {
    if (productDetail.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : productDetail.length - 1
      );
    }
  };

  // Hiển thị tất cả các ảnh của phần tử hiện tại
  const currentProductImages =
    productDetail.length > 0
      ? productDetail[currentImageIndex].productImage
      : [];
  console.log("activeProduct", activeProduct);
  const [isExpanded, setIsExpanded] = useState(false);

  // Lấy nội dung và cắt đến 200 ký tự
  const content = activeProduct.contentMarkdown;
  const truncatedContent = content.length > 350 ? content.substring(0, 330) + "..." : content;

  // Hàm để toggle trạng thái mở rộng
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  console.log('products',products)
  return (
    <div className="product-preview-overlay" onClick={onClose}>
      <div
        className="product-preview-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="button-pre">
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div style={{}}  className="">
        <div className="product-preview-nav">
  {products
    .filter((product) => product.categoryId === activeProduct.categoryId) // Lọc sản phẩm theo categoryId
    .slice(0, 5) // Giới hạn số lượng sản phẩm hiển thị
    .map((product) => (
      <button
        key={product.id}
        onClick={() => handleProductChange(product)}
        className={`product-nav-item1 ${
          product.id === activeProduct.id
            ? "product-nav-item1-active1"
            : ""
        }`}
      >
        {product.name}
      </button>
    ))}
</div>


          <div className="product-preview-info row">
            <div className="col-md-6 py-5 px-5">
              {/* Hiển thị ảnh của phần tử hiện tại */}
              {currentProductImages.length > 0 && (
                <div className="product-preview-info-img">
                  {currentProductImages.map((image, index) => (
                    <img
                      className="image-prev-list"
                      key={index}
                      src={image.image}
                      alt={`Product Image ${index}`}
                      style={{ width: "80%", marginBottom: "10px" }}
                    />
                  ))}
                </div>
              )}
              {/* Nút chuyển ảnh */}
              <div className="image-navigation">
                <i
                  onClick={handlePreviousImage}
                  class="fa-solid fa-chevron-left"
                ></i>
                <i
                  onClick={handleNextImage}
                  class="fa-solid fa-chevron-right"
                ></i>
              </div>
              <div className="product-preview-info-left-bottom">
                <p>Có {productDetail.length} màu</p>
                <div className="d-flex qty-color">
                  {productDetail.map((item, index) => (
                    <div key={index}>
                      {item.productImage.map((item1, index1) => (
                        <div className="d-flex">
                          <img
                            style={{
                              width: 50,
                              height: 50,
                            }}
                            key={index1}
                            src={item1.image}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-6 py-5 px-5">
              <h2>{activeProduct.name}</h2>
             
              <p>
                Thương hiệu: <strong>{activeProduct.madeby}</strong>
              </p>
              <p>
                Chất liệu: <strong>{activeProduct.material}</strong>
              </p>
              <div className="product-preview-info1">
      <div className="product-preview-info-content1">
        <p>{isExpanded ? content : truncatedContent}</p>
      </div>
      <div className="d-flex button-buy">
          {content.length > 200 && (
            <button className="button-wath" onClick={handleToggleExpand}>
              {isExpanded ? "Thu gọn" : "Xem thêm"}
            </button>
          )}
           <Link to={`/detail-product/${activeProduct.id}`} className="buy">
                    Mua
                  </Link>
      </div>
    </div>
            </div>
            <div className="product-preview-bottom">
              <div class="rf-digitalmat-valueprops-container ">
                <div class="rf-digitalmat-valueprops-item">
                  <div class="rf-digitalmat-valueprops-icon">
                    <div class="as-svgicon-container dd-color-apple">
                      <svg

                        height="30"
                        viewBox="0 0 40 56"
                        width="40"
                        class="as-svgicon as-svgicon-elevated"
                        aria-hidden="true"
                        role="img"
                      >
                        <path d="m0 0h40v56h-40z" fill="none"></path>
                        <path
                          d="m20 10.7c9.5393 0 17.3 7.7607 17.3 17.3s-7.7607 17.3-17.3 17.3-17.3-7.7607-17.3-17.3 7.7607-17.3 17.3-17.3m0-2.2c-10.7696 0-19.5 8.7305-19.5 19.5s8.7304 19.5 19.5 19.5 19.5-8.7305 19.5-19.5-8.7304-19.5-19.5-19.5zm-1.3278 14.2374c1.6211 0 3.0078.7031 3.8477 1.875v-3.3984h-3.5742c-.4492 0-.7812-.3125-.7812-.7812 0-.4297.3125-.7617.7812-.7617h3.5742v-1.0742c0-.6055.3711-.9961.9766-.9961.5859 0 .9766.3906.9766.9961v1.0742h1.3281c.4688 0 .7617.332.7617.7617 0 .4688-.3125.7812-.7617.7812h-1.3281v12.3047c0 .5859-.3711.957-.9375.957s-.9375-.3711-.9375-.957v-1.0938c-.8594 1.2305-2.2852 1.9141-3.9062 1.9141-2.9883 0-5.2734-2.3438-5.2734-5.8008s2.2852-5.8008 5.2539-5.8008zm-3.6133 12.8516h9.2188c.4688 0 .7812.332.7812.8008 0 .4492-.332.7812-.7812.7812h-9.2188c-.4492 0-.7812-.332-.7812-.7812 0-.4688.3125-.8008.7812-.8008zm3.9062-3.0664c2.0312 0 3.5352-1.6992 3.5352-3.9648 0-2.2852-1.5039-3.9844-3.5352-3.9844-2.0508 0-3.5547 1.582-3.5547 3.9844s1.5039 3.9648 3.5547 3.9648z"
                          fill="#6CCA4E"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div style={{marginLeft:0}} class="rf-digitalmat-valueprops-description">
                    <h3 class="rf-digitalmat-valueprops-header">Tài Chính</h3>
                    <span>
                      Các cách trả góp tuyệt vời, bao gồm lựa chọn lãi suất 0%.*
                    </span>
                  </div>
                </div>
                <div class="rf-digitalmat-valueprops-item">
                  <div class="rf-digitalmat-valueprops-icon">
                    <div class="as-svgicon-container dd-color-blue-violet">
                      <svg
                           height="30"
                        viewBox="0 0 43 56"
                        xmlns="http://www.w3.org/2000/svg"
                        class="as-svgicon as-svgicon-financing as-svgicon-elevated as-svgicon-financingelevated"
                        aria-hidden="true"
                        role="img"
                      >
                        <path d="m0 0h43v56h-43z" fill="none"></path>
                        <path
                          d="m38.5 27a.99974.99974 0 0 0 -1 1v11a5.00588 5.00588 0 0 1 -5 5h-22a5.00588 5.00588 0 0 1 -5-5v-3.83594l1.543 1.543a.99989.99989 0 1 0 1.414-1.41406l-3.25-3.25a.99962.99962 0 0 0 -1.41406 0l-3.25 3.25a.99989.99989 0 1 0 1.41406 1.414l1.543-1.543v3.836a7.00818 7.00818 0 0 0 7 7h22a7.00818 7.00818 0 0 0 7-7v-11a.99974.99974 0 0 0 -1-1z"
                          fill="#ab45fb"
                        ></path>
                        <path
                          d="m28.17188 32.71533a.31074.31074 0 0 0 -.35157.35156q0 .334.35157.334h2.62792a.29915.29915 0 0 0 .34278-.334.30692.30692 0 0 0 -.34278-.35156z"
                          fill="#ab45fb"
                        ></path>
                        <path
                          d="m30.60156 21.32031a1.92007 1.92007 0 0 0 -1.40136-.47021h-15.75a1.94085 1.94085 0 0 0 -1.376.47021 1.81128 1.81128 0 0 0 -.50488 1.39307v10.43262h-.92481a.95033.95033 0 0 0 -.70312.29443 1.00858 1.00858 0 0 0 0 1.41553.9536.9536 0 0 0 .70312.29394h20.74416a1.96828 1.96828 0 0 0 1.415-.51855 1.78331 1.78331 0 0 0 .54492-1.35352v-8.376a1.78328 1.78328 0 0 0 -.54492-1.35352 1.96828 1.96828 0 0 0 -1.415-.51855h-.30762v-.31641a1.8689 1.8689 0 0 0 -.47949-1.39304zm-4.99609 3.58155v8.24414h-12.62109v-10.03711a.74576.74576 0 0 1 .84374-.84375h14.99415a.85949.85949 0 0 1 .63281.21093.827.827 0 0 1 .19971.55372h-2.08936a1.96828 1.96828 0 0 0 -1.415.51855 1.78328 1.78328 0 0 0 -.54496 1.35352zm5.53711-.334v-.35156h.09668a.94481.94481 0 0 1 .67676.23291.83527.83527 0 0 1 .24609.63721v8.00683a.83528.83528 0 0 1 -.24609.63721.94481.94481 0 0 1 -.67676.23291h-3.51563a.95761.95761 0 0 1 -.68554-.23291.83525.83525 0 0 1 -.2461-.63721v-8.00682a.83524.83524 0 0 1 .2461-.63721.95761.95761 0 0 1 .68554-.23291h.09668v.35156a.52959.52959 0 0 0 .14063.37793.48342.48342 0 0 0 .36914.14941h2.30273a.48342.48342 0 0 0 .36914-.14941.52959.52959 0 0 0 .14063-.37793z"
                          fill="#ab45fb"
                        ></path>
                        <path
                          d="m42.457 19.293a.99962.99962 0 0 0 -1.41406 0l-1.543 1.543v-3.836a7.00818 7.00818 0 0 0 -7-7h-22a7.00818 7.00818 0 0 0 -7 7v11a1 1 0 0 0 2 0v-11a5.00588 5.00588 0 0 1 5-5h22a5.00588 5.00588 0 0 1 5 5v3.83594l-1.543-1.543a.99989.99989 0 0 0 -1.41394 1.41406l3.25 3.25a.99963.99963 0 0 0 1.41406 0l3.25-3.25a.99962.99962 0 0 0 -.00006-1.414z"
                          fill="#ab45fb"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div class="rf-digitalmat-valueprops-description">
                    <h3 class="rf-digitalmat-valueprops-header">
                      Apple Trade In
                    </h3>
                    Đổi thiết bị đủ điều kiện của bạn lấy điểm tín dụng cho lần
                    mua hàng tiếp theo.**
                  </div>
                </div>
                <div class="rf-digitalmat-valueprops-item">
                  <div class="rf-digitalmat-valueprops-icon">
                    <div class="as-svgicon-container dd-color-razzmatazz">
                      <svg
                           height="30"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 36 56"
                        class="as-svgicon as-svgicon-delivery as-svgicon-elevated as-svgicon-deliverydelevated"
                        aria-hidden="true"
                        role="img"
                      >
                        <g>
                          <rect width="36" height="56" fill="none"></rect>
                          <path
                            d="M33.905,17.063l-14-7.581a3.991,3.991,0,0,0-3.811,0l-14,7.581A4,4,0,0,0,0,20.581V35.419a4,4,0,0,0,2.095,3.518l14,7.581a3.989,3.989,0,0,0,3.811,0l14-7.581A4,4,0,0,0,36,35.419V20.581A4,4,0,0,0,33.905,17.063ZM17.048,11.241a1.993,1.993,0,0,1,1.9,0l13.8,7.47-6.383,3.645L11.943,14.005ZM18,27.133,3.253,18.711l6.629-3.589L24.355,23.5ZM3.048,37.178A2,2,0,0,1,2,35.419V20.581a1.955,1.955,0,0,1,.036-.262L17,28.865V44.733ZM34,35.419a2,2,0,0,1-1.048,1.759L19,44.733V28.865l14.964-8.545a1.955,1.955,0,0,1,.036.262Z"
                            fill="#6CCA4E"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div class="rf-digitalmat-valueprops-description">
                    <h3 class="rf-digitalmat-valueprops-header">
                      Giao hàng miễn phí ngày làm việc tiếp theo
                    </h3>
                    <span>
                      Chỉ khả dụng tại Thành Phố Hồ Chí Minh đối với một số sản
                      phẩm Apple có sẵn nhất định được đặt hàng trước 15:00.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPreview;
