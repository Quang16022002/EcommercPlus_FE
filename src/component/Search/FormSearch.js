import React from 'react';
import { useEffect, useState } from 'react';
import './FormSearch.scss'
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';


const FormSearch = (props) => {
    const [keyword, setkeyword] = useState('')

    let handleSearchProduct = () =>{
        props.handleSearch(keyword)
    }
    let handleOnchange = (keyword)=>{
        setkeyword(keyword)
        props.handleOnchange(keyword)
    }


    return (
        <form   >
        <div className="form-group">
            <div className="input-group mb-3 row">
                <input onChange={(e) => handleOnchange(e.target.value)} value={keyword} type="search" className="col-md-10" placeholder={`Tìm kiếm theo ${props.title}`} />
                <div className="col-md-2 d-flex  ">
                    <button onClick={() =>handleSearchProduct()}  className="btn-search" type="button"><i className="ti-search" /></button>
                </div>
            </div>
        </div>
        
        </form>
    )
}
export default FormSearch;



