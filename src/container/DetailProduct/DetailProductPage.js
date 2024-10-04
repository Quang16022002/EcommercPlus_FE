import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getDetailProductByIdService, getProductRecommendService } from '../../services/userService';
import InfoDetailProduct from '../../component/Product/InfoDetailProduct';
import ProfileProduct from '../../component/Product/ProfileProduct';
import ReviewProduct from '../../component/Product/ReviewProduct';
import DescriptionProduct from '../../component/Product/DescriptionProduct';
import ProductFeature from '../../component/HomeFeature/ProductFeature';
import './DetailProductPage.scss';

function DetailProductPage(props) {
    const [dataProduct, setDataProduct] = useState({});
    const [dataDetailSize, setdataDetailSize] = useState({});
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [dataProductRecommend, setdataProductRecommend] = useState([]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            fetchProductFeature(userData.id);
            setUser(userData);
        }

        window.scrollTo(0, 0);
        fetchDetailProduct();
    }, []);

    let sendDataFromInforDetail = (data) => {
        setdataDetailSize(data);
    };

    let fetchDetailProduct = async () => {
        let res = await getDetailProductByIdService(id);
        if (res && res.errCode === 0) {
            setDataProduct(res.data);
        }
    };

    let fetchProductFeature = async (userId) => {
        let res = await getProductRecommendService({
            limit: 20,
            userId: userId
        });
        if (res && res.errCode === 0) {
            setdataProductRecommend(res.data);
        }
    };
    return (
        <div>
            <div className="product_image_area">
                <div className="container">
                    <InfoDetailProduct userId={user && user.id ? user.id : ''} dataProduct={dataProduct} sendDataFromInforDetail={sendDataFromInforDetail} />
                </div>
            </div>

            <section className="product_description_area">
                <div className="container">
                    {/* Chia bố cục thành 2 cột ngang: thông số chi tiết và mô tả chi tiết */}
                    <div className="row  information">
                        <div className="col-md-8  information-left">
                            <h2>Đặc điểm nổi bật của {dataProduct.name} </h2>
                            <DescriptionProduct data={dataProduct.contentHTML} />
                        </div>
                        <div className="col-md-4  ">
                            <div className='information-right'>
                                <h2>Thông số chi tiết</h2>
                                <ProfileProduct data={dataDetailSize} />
                            </div>
                        </div>
                    </div>

                    {/* Đánh giá sản phẩm nằm dưới */}
                    <div className="row mt-4">
                        <div  className=" review-p col-md-8">
                            <h4 style={{fontSize:16, fontWeight:600}}>Đánh giá & nhận xét cho {dataProduct.name}</h4>
                            <ReviewProduct />
                        </div>
                    </div>
                </div>

                {/* Sản phẩm gợi ý */}
               <div className='mt-5'> 
                    {user && dataProductRecommend && dataProductRecommend.length > 0 &&
                        <ProductFeature title={"Sản phẩm bạn quan tâm"} data={dataProductRecommend} />
                    }
               </div>
            </section>
        </div>
    );
}

export default DetailProductPage;
