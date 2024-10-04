import React from 'react';
import { useEffect, useState } from 'react';
import './VoucherHomePage.scss';
import VoucherItem from './VoucherItem';
import { getAllVoucher } from '../../services/userService';
import moment, { now } from 'moment';
import { toast } from 'react-toastify';
import { PAGINATION } from '../../utils/constant';
import ReactPaginate from 'react-paginate';
import { saveUserVoucherService } from '../../services/userService';
import CommonUtils from '../../utils/CommonUtils';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
function VoucherHomePage(props) {
    const [dataVoucher, setdataVoucher] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const [user, setUser] = useState({})
    function compareDates(d1, d2) {
        var parts = d1.split('/');
        var d1 = Number(parts[2] + parts[1] + parts[0]);
        parts = d2.split('/');
        var d2 = Number(parts[2] + parts[1] + parts[0]);
        if (d1 <= d2) return true
        if (d1 >= d2) return false

    }

    useEffect(() => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            setUser(userData)
            fetchData();
        } catch (error) {
            console.log(error)
        }

    }, [])
    let fetchData = async () => {
        let arrData = await getAllVoucher({

            limit: PAGINATION.pagerow,
            offset: 0

        })
        let arrTemp = []
        if (arrData && arrData.errCode === 0) {
            let nowDate = moment.unix(Date.now() / 1000).format('DD/MM/YYYY')

            for (let i = 0; i < arrData.data.length; i++) {
                let fromDate = moment.unix(arrData.data[i].fromDate / 1000).format('DD/MM/YYYY')
                let toDate = moment.unix(arrData.data[i].toDate / 1000).format('DD/MM/YYYY')
                let amount = arrData.data[i].amount
                let usedAmount = arrData.data[i].usedAmount
                if (amount !== usedAmount && compareDates(toDate, nowDate) === false && compareDates(fromDate, nowDate) === true) {
                    arrTemp[i] = arrData.data[i]

                }
            }
            setdataVoucher(arrTemp)
            setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
        }
    }
    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getAllVoucher({
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow

        })
        if (arrData && arrData.errCode === 0) {
            setdataVoucher(arrData.data)

        }
    }
    let sendDataFromVoucherItem = async (id) => {
        if (user && user.id) {
            let res = await saveUserVoucherService({
                userId: user.id,
                voucherId: id
            })
            if (res && res.errCode === 0) {
                toast.success("Lưu mã voucher thành công !")
                await fetchData()
            } else {
                toast.error(res.errMessage)
            }
        } else {
            toast.error("Đăng nhập để lưu mã giảm giá")
        }

    }
    return (

        <div className='mb-5'>
            <section class="">
      <div style={{backgroundColor:'#fff', marginTop:100}} class="mbanner_inner d-flex align-items-center">
        <div class="container">
        <div style={{padding:0}} className="page_link">
        <i class="fa-solid fa-house"></i>
        <Link to={"/"}>Trang chủ</Link>
        <i class="fa-solid fa-angles-right"></i>
        <Link to={"/shop"}>voucher</Link>
        
        {/* <a>{dataProduct.name}</a> */}
      </div>
        </div>
      </div>
    </section>
            <div className="container voucher">
    
    
    
                <div className="voucher-banner">
                    <img className="photo-banner" src='https://images.bloggiamgia.vn/full/09-02-2023/ma-giam-gia-1675908056318.png' ></img>
                
                </div>
                <div className="voucher-list">
                    {dataVoucher && dataVoucher.length > 0 &&
                        dataVoucher.map((item, index) => {
                            let percent = ""
                            if (item.typeVoucherOfVoucherData.typeVoucher === "percent") {
                                percent = item.typeVoucherOfVoucherData.value + "%"
                            }
                            if (item.typeVoucherOfVoucherData.typeVoucher === "money") {
                                percent = CommonUtils.formatter.format(item.typeVoucherOfVoucherData.value)
    
                            }
                            let MaxValue = item.typeVoucherOfVoucherData.maxValue
    
                            return (
                                <div className=''>
                                    
                                  <div >
                                        <VoucherItem sendDataFromVoucherItem={sendDataFromVoucherItem} id={item.id} width="550px" height="330px" key={index} name={item.codeVoucher} widthPercent={item.usedAmount * 100 / item.amount} maxValue={MaxValue} usedAmount={Math.round((item.usedAmount * 100 / item.amount) * 10) / 10} typeVoucher={percent} />
                                        
                                  </div>
                                    </div>
                            )
                        })
                    }
    
    
                </div>
                
    
            </div>
        </div>
       
    );
}

export default VoucherHomePage;