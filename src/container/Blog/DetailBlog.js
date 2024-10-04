import React, { useEffect, useState } from 'react';
import CommentBlog from '../../component/Blog/CommentBlog';
import CommentFormBlog from '../../component/Blog/CommentFormBlog';
import RightBlog from '../../component/Blog/RightBlog';
import {
  getDetailBlogByIdService, getAllCategoryBlogService, createNewcommentService,
  getAllcommentByBlogIdService, getFeatureBlog
} from '../../services/userService'
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import moment from 'moment';
import './DetailBlog.scss'
function DetailBlog(props) {
  const [dataSubject, setdataSubject] = useState([])
  const [dataComment, setdataComment] = useState([])
  const [dataBlog, setdataBlog] = useState({})
  const { id } = useParams();
  const [user, setUser] = useState({})
  const [dataFeatureBlog, setdataFeatureBlog] = useState([])
  useEffect(() => {
    try {
      window.scrollTo(0, 0);
      loadCategoryBlog()
      loadFeatureBlog()
      if (id) {
        loadDataBlog(id)
        loadComment(id)
      }
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData) {
        setUser(userData)
      }

    } catch (error) {
      console.log(error)
    }

  }, [id])
  let loadComment = async (id) => {
    let res = await getAllcommentByBlogIdService(id)
    if (res && res.errCode === 0) {

      setdataComment(res.data)
    }
  }
  let loadFeatureBlog = async () => {
    let res = await getFeatureBlog(6)
    if (res && res.errCode == 0) {
      setdataFeatureBlog(res.data)
    }
  }
  let loadCategoryBlog = async () => {
    let res = await getAllCategoryBlogService('SUBJECT')
    if (res && res.errCode == 0) {
      setdataSubject(res.data)
    }
  }
  let loadDataBlog = async (id) => {
    let res = await getDetailBlogByIdService(id)
    if (res && res.errCode == 0) {
      setdataBlog(res.data)
    }
  }
  let handleAddComment = async (content) => {
    if (user && user.id) {
      let res = await createNewcommentService({
        content: content,
        blogId: id,
        userId: user.id,
      })
      if (res && res.errCode == 0) {
        toast.success('Đăng bình luận thành công')
        loadComment(id)
      } else {
        toast.error(res.errMessage)
      }
    } else {
      toast.error("Hãy đăng nhập để bình luận")
    }
  }
  return (
    <>
    <section class="">
      <div style={{backgroundColor:'#fff', marginTop:100}} class="mbanner_inner d-flex align-items-center">
        <div class="container">
        <div style={{padding:0}} className="page_link">
        <i class="fa-solid fa-house"></i>
        <Link to={"/"}>Trang chủ</Link>
        <i class="fa-solid fa-angles-right"></i>
        <Link to={"/shop"}>Bài viết</Link>
        <i class="fa-solid fa-angles-right"></i>
        <span style={{color:'#9A9999'}}>{dataBlog.title}</span>
        {/* <a>{dataProduct.name}</a> */}
      </div>
        </div>
      </div>
    </section>
      <section className="blog_area single-post-area section_gap">
        <div className="container">
          <div className="row">
            <div style={{padding:'0 100px'}} className="col-lg-12 posts-list m">
              <div className="single-post-item">
                <div className="feature-img">
                  <img style={{ width: '100%', height: 'auto', objectFit: 'cover' }} className="img-fluid" src={dataBlog.image} alt="" />
                </div>
                <div style={{padding:'25px 25px'}} className="blog_details">
                  <h2>{dataBlog.title}</h2>
                  <ul className="blog-info-link mt-3 mb-4">
                    <li><a href="#"><i className="ti-user" /> {dataBlog.userData && dataBlog.userData.firstName + " " + dataBlog.userData.lastName}</a></li>
                    <li><a href="#"><i className="ti-comments" /> {dataComment.length} Bình luận</a></li>
                  </ul>
                  <div className="quote-wrapper">
                    <div className="quotes">
                      {dataBlog.shortdescription}
                    </div>
                  </div>
                  <p dangerouslySetInnerHTML={{ __html: dataBlog.contentHTML }} className="excert">

                  </p>

                </div>
              </div>

              <div className="comments-area">
                <h4>{dataComment.length} Bình luận</h4>
                {dataComment && dataComment.length > 0 &&
                  dataComment.map((item, index) => {
                    if (item.user) {
                      let name = item.user.firstName + " " + item.user.lastName
                      return (
                        <CommentBlog img={item.user.image} name={name} content={item.content} key={index}
                          date={moment(item.createdAt).fromNow()}
                        />
                      )
                    }

                  })
                }


              </div>
              <CommentFormBlog handleAddComment={handleAddComment} />
            </div>
           <div style={{padding:'0 50px'}} className='mx-5'> <RightBlog dataFeatureBlog={dataFeatureBlog} isPage={false} data={dataSubject}></RightBlog></div>
          </div>
        </div>
      </section>
    </>


  );
}

export default DetailBlog;