import React, { useEffect, useState } from 'react';
import ItemProduct from '../Product/ItemProduct';
import HeaderContent from '../Content/HeaderContent';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProductPreview from '../Product/ProductPreview'; 
function NewProductFeature(props) {
    const [showPreview, setShowPreview] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const handlePreview = (product) => {
        setCurrentProduct(product);
        setShowPreview(true);
    };

    const handleClosePreview = () => {
        setShowPreview(false);
        setCurrentProduct(null);
    };
    useEffect(() => {
        AOS.init({
          duration: 1000, // Thời gian cho hiệu ứng (ms)
        });
      }, []);
    return (
        <section className="new_product_area section_gap_top section_gap_bottom_custom">
            <div className="container">
                <HeaderContent mainContent={props.title}
                    infoContent={props.description} />
                <div  className="row">
                    {props.data && props.data.length > 0 &&
                        props.data.map((item, index) => (
                            <ItemProduct
                                key={item.id}
                                id={item.id}
                                type="col-lg-3 col-md-3"
                                name={item.name}
                                img={item.productDetail[0].productImage[0].image}
                                price={item.productDetail[0].originalPrice}
                                discountPrice={item.productDetail[0].discountPrice}
                                onPreview={() => handlePreview(item)}
                            />
                        ))
                    }
                </div>
            </div>

            {showPreview && currentProduct && (
                <div className="product-preview-overlay" onClick={handleClosePreview}>
                    <ProductPreview 
                        products={props.data} 
                        currentProduct={currentProduct}
                        onPreviewChange={handlePreview}
                        onClose={handleClosePreview}
                    />
                </div>
            )}
        </section>
    );
}

export default NewProductFeature;
