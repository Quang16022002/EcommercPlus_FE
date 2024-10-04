import React, { useState } from 'react';
import './RightBlog.scss'
function ItemCategory(props) {
    
    let handleClickCategory = (code) =>{
        props.handleClickCategory(code)
        
    }
    return (
        <li className='' style={{cursor:'pointer', padding:'10px ', borderRadius:10}} onClick={() => handleClickCategory(props.data.code)} class={props.data.code === props.activeLinkId ? "d-flex activeCategory": "item-blog d-flex"}>
            <a  style={{width:'100%', display:'flex', alignItems:'center'}}>
             <p style={{margin:'0'}}>{props.data.value}</p>
              <p style={{margin:0}}>({props.data.countPost})</p>
              <i style={{position:'absolute', right:20}} class="fa-solid icoa fa-angle-right"></i>
               </a>
         </li>
    );
}

export default ItemCategory;