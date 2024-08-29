import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommonUtils from '../../utils/CommonUtils';
import './ItemProduct.scss';
import 'aos/dist/aos.css';
import AOS from 'aos';
function ItemProduct(props) {
    useEffect(() => {
        AOS.init({
          duration: 1000, // Thời gian cho hiệu ứng (ms)
        });
      }, []);
    return (
        <div data-aos="flip-down" className={props.type}>
            <div onClick={props.onPreview} style={{ cursor: 'pointer' }} className="single-product">
                <div style={{ width: props.width, height: props.height, border: 'none' }} className="product-img">
                    <h4 style={{ float: 'left', fontSize: 20, padding: '15px 0' , height:65}}>{props.name}</h4>
                    <img className="img-fluid w-100" src={props.img} alt={props.name} />
                    <div className="p_icon-pop">
                        <a >
                            Khám phá thiết bị
                        </a>
                    </div>
                </div>
                <div style={{ width: props.width, height: '99px', border: 'none' }} className="product-btm">
                    <div className="mt-3 d-flex justify-content-between">
                        <div className='d-flex flex-column'>
                            <span className="mr-4">{CommonUtils.formatter.format(props.discountPrice)}</span>
                            <del>{CommonUtils.formatter.format(props.price)}</del>
                        </div>
                        <Link to={`/detail-product/${props.id}`} className='buy'>Mua</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemProduct;
