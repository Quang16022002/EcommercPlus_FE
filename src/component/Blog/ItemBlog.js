import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

function ItemBlog(props) {
    return (
        <article className="blog_item">
            <Link to={`/blog-detail/${props.data.id}`} className="blog_item_img">
                <img style={{height:'514px', objectFit:'cover',borderRadius:10}} className="card-img rounded-0" src={props.data.image} alt="" />
                <a  href="#" className="blog_item_date">
                    <h3>{moment(props.createdAt).format("DD")}</h3>
                    <p>{moment(props.createdAt).format("MMM")}</p>
                </a>
            </Link>
            <div style={{boxShadow:' 2px 4px 12px #00000014', border:'1px solid rgb(212, 212, 212)', borderRadius:'0 0 8px 8px', padding:'40px 25px'}} className="blog_detailss">
                <Link style={{color:'#797979', fontSize:'18px'}} className="d-inline-block" to={`/blog-detail/${props.data.id}`}>
                    <h2 style={{fontSize:26}}>{props.data.title}</h2>
                
                <p>{props.data.shortdescription}</p>
                <ul className="blog-info-link">
                    <li><i className="ti-user" /> {props.data.userData.firstName+" "+props.data.userData.lastName}</li>
                    <li><i className="ti-comments" /> {props.data.commentData.length} Bình luận</li>
                </ul>
                </Link>
            </div>
        </article>
    );
}

export default ItemBlog;