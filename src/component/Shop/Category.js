import React, { useState, useEffect, useRef } from 'react';
import './Brand.scss'; // Sử dụng chung file SCSS với Brand
import { getAllCodeService } from '../../services/userService';

function Category(props) {
    const [arrCategory, setArrCategory] = useState([]);
    const [activeLinkId, setActiveLinkId] = useState('');
    const [isCategoryListVisible, setIsCategoryListVisible] = useState(false);
    const [isCategorySelected, setIsCategorySelected] = useState(false);
    const categoryRef = useRef(null); // Tham chiếu đến thành phần

    let handleClickCategory = (code) => {
        props.handleRecevieDataCategory(code);
        setActiveLinkId(code);
        setIsCategoryListVisible(false);
        setIsCategorySelected(true);
    };

    let toggleCategoryList = () => {
        setIsCategoryListVisible(!isCategoryListVisible);
    };

    useEffect(() => {
        let fetchCategory = async () => {
            let arrData = await getAllCodeService('CATEGORY');
            if (arrData && arrData.errCode === 0) {
                arrData.data.unshift({
                    createdAt: null,
                    code: "ALL",
                    type: "CATEGORY",
                    value: "Tất cả",
                });
                setArrCategory(arrData.data);
            }
        };
        fetchCategory();
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (categoryRef.current && !categoryRef.current.contains(event.target)) {
                setIsCategoryListVisible(false); // Ẩn danh sách nếu click ra ngoài
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [categoryRef]);

    return (
        <aside style={{ backgroundColor: 'white' }} className="brand_shop" ref={categoryRef}>
            <div 
                className="brand_title" 
                onClick={toggleCategoryList} 
                style={{ cursor: 'pointer' }}
            >
                <p style={{ color: isCategorySelected ? 'rgb(18, 18, 18)' : 'black', marginRight: 12 }}>
                    Danh mục <i className="fa-solid icon-brand fa-sort-down"></i>
                </p>
            </div>
            {isCategoryListVisible && (
                <ul className="brand_option_list d-flex">
                    <i className="fa-solid fa-caret-up"></i>
                    {arrCategory && arrCategory.length > 0 &&
                        arrCategory.map((item, index) => {
                            return (
                                <li
                                    className={item.code === activeLinkId ? 'active_brand' : 'brand_item'}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleClickCategory(item.code)}
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

export default Category;
