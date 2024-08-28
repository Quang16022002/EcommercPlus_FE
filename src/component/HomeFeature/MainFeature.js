import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './MainFeature.scss'
function MainFeature(props) {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Thời gian cho hiệu ứng (ms)
    });
  }, []);
  return (
      <section className="feature-area section_gap_bottom_custom">
        <div className="container">
       
          <div className="row">

          
            <div   data-aos="fade-right" className="col-lg-3 col-md-6">
              <div  className="single-feature">
                <div className="title">
                  <i className="flaticon-money"></i>
           

                  <h3>Tài Chính</h3>
                </div>
                <p>Các cách trả góp tuyệt vời, bao gồm lựa chọn lãi suất 0%.*</p>
              </div>
            </div>

            <div   data-aos="fade-right" className="col-lg-3 col-md-6">
              <div className="single-feature">
                <div className="title">
                  <i className="flaticon-truck"></i>
                  <h3>Apple Trade In</h3>
                </div>
                <p>Đổi thiết bị đủ điều kiện của bạn lấy điểm tín dụng cho lần mua hàng.**</p>
              </div>
            </div>

            <div data-aos="fade-left" className="col-lg-3 col-md-6">
              <div className="single-feature">
                <div className="title">
                  <i className="flaticon-support"></i>
                  <h3>Giao hàng miễn phí ngày làm việc</h3>
                </div>
                <p>Đối với một số sản phẩm Apple có sẵn nhất định được đặt hàng.</p>
              </div>
            </div>

            <div data-aos="fade-left" className="col-lg-3 col-md-6">
              <div className="single-feature">
                <div className="title">
                  <i className="flaticon-blockchain"></i>
                  <h3>An toàn thanh toán</h3>
                </div>
                <p>Các cổng thanh toán uy tín chất lượng</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default MainFeature;