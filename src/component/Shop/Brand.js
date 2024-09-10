import React, { useState, useEffect, useRef } from 'react';
import './Brand.scss';
import { getAllCodeService } from '../../services/userService';

function Brand(props) {
    const [activeLinkId, setActiveLinkId] = useState('');
    const [arrBrand, setArrBrand] = useState([]);
    const [isBrandListVisible, setIsBrandListVisible] = useState(false);
    const [isBrandSelected, setIsBrandSelected] = useState(false);
    const brandRef = useRef(null); // Tham chiếu đến thành phần

    let handleClickBrand = (code) => {
        props.handleRecevieDataBrand(code);
        setActiveLinkId(code);
        setIsBrandListVisible(false);
        setIsBrandSelected(true);
    };

    let toggleBrandList = () => {
        setIsBrandListVisible(!isBrandListVisible);
    };

    useEffect(() => {
        let fetchBrand = async () => {
            let arrData = await getAllCodeService('BRAND');
            if (arrData && arrData.errCode === 0) {
                arrData.data.unshift({
                    createdAt: null,
                    code: "ALL",
                    type: "BRAND",
                    value: "Tất cả",
                });
                setArrBrand(arrData.data);
            }
        };
        fetchBrand();
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (brandRef.current && !brandRef.current.contains(event.target)) {
                setIsBrandListVisible(false); // Ẩn danh sách nếu click ra ngoài
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [brandRef]);
    return (
        <aside style={{ backgroundColor: 'white' }} className="brand_shop" ref={brandRef}>
            <div 
                className="brand_title" 
                onClick={toggleBrandList} 
                style={{ 
                    cursor: 'pointer', 
                }}
            >
                <p style={{color: isBrandSelected ? 'rgb(18, 18, 18)' : 'black' , marginRight:12 }}>Thương hiệu <i style={{}} class="fa-solid icon-brand fa-sort-down"></i></p>
            </div>
            {isBrandListVisible && (
                
                <ul className="brand_option_list d-flex">
                    <i class="fa-solid fa-caret-up"></i>
                    {arrBrand && arrBrand.length > 0 &&
                        arrBrand.map((item, index) => {

                            return (
                                <li
                                    className={item.code === activeLinkId ? 'active_brand' : 'brand_item'}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleClickBrand(item.code)}
                                    key={index}
                                >
                                    <a>{item.value}</a>
                                </li>
                            );
                        })
                    }
                </ul>
            )}
        </aside>
    );
}

export default Brand;
