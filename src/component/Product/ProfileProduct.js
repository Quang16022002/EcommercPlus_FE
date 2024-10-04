import React from 'react';
import './ProfileProduct.scss'
function ProfileProduct(props) {
    let data = props.data
    return (
        <div className="table-responsive">
            <table className="table">
                <tbody className='table-product'>
                    <tr >
                        <td >
                            <h5 >Kích thước</h5>
                        </td>
                        <td>
                            <h5 >{data.width}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>Dung lượng pin</h5>
                        </td>
                        <td>
                            <h5>{data.height}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>Khối lượng</h5>
                        </td>
                        <td>
                            <h5>{data.weight}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>Kiểm tra chất lượng</h5>
                        </td>
                        <td>
                            <h5>có</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>Bảo hành</h5>
                        </td>
                        <td>
                            <h5>có</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>Công nghệ màn hình</h5>
                        </td>
                        <td>
                            <h5>Super Retina</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>Thẻ SIM</h5>
                        </td>
                        <td>
                            <h5>2 SIM</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>Hệ điều hành</h5>
                        </td>
                        <td>
                            <h5>
iOS 17
</h5>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ProfileProduct;