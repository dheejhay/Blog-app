import Reaction from './Reaction';
import React, { useState } from 'react';
import { apiConnection } from '../lib/function';

function Comment() {
    const [comment, setComments] =useState();
    const{_id:id, author, text, like_count, dislike_count, view_count, date_time} = comment

    const handleLikePost = async() =>{
        // fetch posts from back end
        const response =await apiConnection(`/posts/${id}/like`,"POST")
        // set posts
        setComments(response.data);
      }
      const handleDisLikePost = async() =>{  
        // /fetch posts from back end
        const response =await apiConnection(`/posts/${id}/dislike`,"POST")
        // set posts
        setComments(response.data);
    
      }
    return (
        <div className="card-body">
        <p className="card-text">{text}</p>
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
    );
}

export default Comment;