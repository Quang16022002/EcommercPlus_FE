import React, { useEffect, useState } from 'react';
import ItemBlog from '../../component/Blog/ItemBlog';
import Pagination from '../../component/Shop/Pagination';
import SpecialItemBlog from '../../component/Blog/SpecialItemBlog';
import RightBlog from '../../component/Blog/RightBlog';
import { PAGINATION } from '../../utils/constant'
import { getAllBlog } from '../../services/userService'
import ReactPaginate from 'react-paginate';
import { useFetchAllcode } from '../customize/fetch';
import {getAllCategoryBlogService,getFeatureBlog} from '../../services/userService'
import { Link } from 'react-router-dom';
function BlogPage(props) {
  const [dataBlog, setdataBlog] = useState([])
  const [dataFeatureBlog, setdataFeatureBlog] = useState([])
  const [dataSubject, setdataSubject] = useState([])
  const [count, setCount] = useState('')
  const [numberPage, setnumberPage] = useState('')
  const [subjectId,setsubjectId] = useState('')
  const [keyword, setkeyword] = useState('')
  useEffect(() => {
    try {
      window.scrollTo(0, 0);
      loadCategoryBlog()
        fetchData('',keyword)
        loadFeatureBlog()
    } catch (error) {
        console.log(error)
    }

}, [])



let fetchData = async (code,keyword) => {
  let arrData = await getAllBlog({

      subjectId:code,
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword:keyword
  })
  if (arrData && arrData.errCode === 0) {
      setdataBlog(arrData.data)
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
  }
}
let loadFeatureBlog = async() =>{
  let res = await getFeatureBlog(6)
  if(res && res.errCode ==0){
    setdataFeatureBlog(res.data)
  }
}
let loadCategoryBlog = async() =>{
  let res = await getAllCategoryBlogService('SUBJECT')
  if(res && res.errCode == 0){
      setdataSubject(res.data)
  }
}
let handleChangePage = async (number) => {
  setnumberPage(number.selected)
  let arrData = await getAllBlog({

    subjectId:subjectId,
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      keyword:keyword

  })
  if (arrData && arrData.errCode === 0) {
      setdataBlog(arrData.data)
     
  }
  
}
let handleClickCategory = (code) =>{
  setsubjectId(code)
  fetchData(code,'')

}
let handleSearchBlog = (text) =>{
  fetchData('',text)
  setkeyword(text)
}
let handleOnchangeSearch = (keyword) =>{
  if(keyword === ''){
    fetchData('',keyword)
      setkeyword(keyword)
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
        
        {/* <a>{dataProduct.name}</a> */}
      </div>
        </div>
      </div>
    </section>
    <section className="blog_area">
            <div className="container">
                <div className="row">
               <div  className='col-md-4'> <RightBlog handleOnchangeSearch={handleOnchangeSearch} handleSearchBlog={handleSearchBlog} dataFeatureBlog={dataFeatureBlog} isPage={true} handleClickCategory={handleClickCategory} data={dataSubject} /></div>
                    <div className="col-md-8 mb-5 mb-lg-0">
                        <div className="blog_left_sidebar">
                           {dataBlog && dataBlog.length > 0 && 
                           dataBlog.map((item,index) =>{
                            return(
                              <ItemBlog key={index} data={item}></ItemBlog>
                            )
                           })
                           }
                     
                       
                          
                        </div>
                    
                        
                      
                       
                    </div>
                   
                </div>
            </div>
        </section>
        
        </>
      

    );
}

export default BlogPage;