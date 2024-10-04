import React from 'react';
import './DescriptionProduct.scss'
function DescriptionProduct({ data }) {
  return (
    <div className="content-container">
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );
}

export default DescriptionProduct;
