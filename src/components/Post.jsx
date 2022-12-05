import React, { useState, useEffect, useContext } from 'react';
import { apiConnection } from '../lib/function';
import Reaction from './Reaction';
import { PostContext } from '../context/PostContext';
import { Link } from 'react-router-dom';
// import useApi from './hooks/useApi';

function Post(props) {
  let postInfo = useContext(PostContext)
  if(props.post){
   postInfo = props.post
  }
  // var action = props
  // console.log(`This a prop ${[...props]}`)

  const [post, setPost] =useState(postInfo);
  const{_id:id, post_title, author, summary, like_count, dislike_count, view_count, date_time, image} = post

    useEffect(()=>{
      setPost(postInfo)
    },[postInfo])

  const handleLikePost = async() =>{
    // fetch posts from back end
    const response =await apiConnection(`/posts/${id}/like`,"POST")
    // set posts
    setPost(response.data);
  }
  const handleDisLikePost = async() =>{  
    // /fetch posts from back end
    const response =await apiConnection(`/posts/${id}/dislike`,"POST")
    // set posts
    setPost(response.data);

  }

    return (
        <div className="card shadow-sm mb-3">
       {/* <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
    */}
    <img src={image} className="card-img-top " height='255' width='100%' alt="..." />
        <div className="card-body">
          <p className="card-text">{post_title}</p>
          <p className="card-text">{summary}</p>
{props.action === 'view' ? "" : <Link to={`/blog/posts/${id}`}>Continue read... </Link> }
          <div className="d-flex justify-content-between align-items-center">
          </div>
          <hr/>
          <div className="d-flex justify-content-around align-items-center">
            <div className='d-flex justify-content-between gap-2'>
             <small className="card-muted" style={{ fontStyle: "italic" }}>By {author} </small>
               <p className="card-text">{date_time}</p>
            </div>
            <div className='d-flex justify-content-between pt-2 gp-5' >
              <button className='btn btn-default'>
                <Reaction dislikePost={handleDisLikePost} likePost={handleLikePost} like_count={like_count} dislike_count={dislike_count} view_count={view_count} />
             </button>
           </div>
       </div>
   </div>
 </div>
    );
}

export default Post;