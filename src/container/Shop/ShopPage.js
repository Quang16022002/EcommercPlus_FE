import React, { useState, useRef, useEffect } from "react";
import MainShop from "../../component/Shop/MainShop";
import Category from "../../component/Shop/Category";
import Brand from "../../component/Shop/Brand";
import './ShopPage.scss'
import AOS from 'aos';
import 'aos/dist/aos.css';
import videoIphone from "../../video/videoIphone.mp4";
function ShopPage(props) {
  console.log('propsprops',props)
  useEffect(async () => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 1000, // Thời gian cho hiệu ứng (ms)
    });
  }, []);
  const [categoryId, setcategoryId] = useState("");
  const [brandId, setbrandId] = useState("");
  const myRef = useRef(null);
  let handleRecevieDataCategory = (code) => {
    setcategoryId(code);
  };
  let handleRecevieDataBrand = (code) => {
    setbrandId(code);
  };
  return (
    <div style={{backgroundColor:'rgb(245, 245, 247)'}}>
      <section ref={myRef} className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div className="">
            <div className="banner_contentShop d-md-flex  align-items-center">
              <video
                autoPlay
                width="100%"
                style={{ maxWidth: "80%", height: "auto", margin:'0 auto' }}
              >
                <source src={videoIphone} type="video/mp4" /> Trình duyệt của
                bạn không hỗ trợ thẻ video.
              </video>
            </div>
          </div>
        </div>
      </section>
      <div className="container px-2 rs-shop-header-section d-flex justify-content-between">
            <h1 data-aos="fade-right"  className="rs-shop-header">
              Cửa Hàng. Cách tốt nhất để <br></br>
              <span>mua sản phẩm bạn thích.</span>
            </h1>
            <div data-aos="fade-left" class="rf-shop-chat-section  d-flex">
              <div class="rf-shop-chaticon-container">
                <img
                  style={{ borderRadius: "50%" }}
                  width="35"
                  height="35"
                  alt=""
                  src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/store-chat-specialist-icon-202309_AV1?wid=70&amp;hei=70&amp;fmt=jpeg&amp;qlt=90&amp;.v=1701194050273"
                />
              </div>
              <div class="rf-shop-chat-container">
                <p>Bạn cần trợ giúp mua sắm?</p>
                <p>
                  Hỏi chuyên gia <i class="fa-solid fa-arrow-right"></i>
                </p>
              </div>
            </div>
          </div>
      <section className="cat_product_area section_gap">
        <div  className="container">
          <div className="row ">
          <div className="left_sidebar_area d-flex" >
            <div className="filter-a"> <i class="fa-solid fa-filter"></i>Bộ lọc</div>
                                <div style={{margin:'0 20px'}}><Brand  handleRecevieDataBrand={handleRecevieDataBrand} /></div>
                                <Category handleRecevieDataCategory={handleRecevieDataCategory} />
                            </div>
            <MainShop categoryId={categoryId} brandId={brandId} myRef={myRef} />
          
            
          </div>
        </div>
      </section>
      {/* <Footer /> */}

      {/* <div className="col-lg-3">
              <div className="left_sidebar_area">
                <Category
                  handleRecevieDataCategory={handleRecevieDataCategory}
                />
                <Brand handleRecevieDataBrand={handleRecevieDataBrand} />
              </div>
            </div> */}
    </div>
  );
}

export default ShopPage;
