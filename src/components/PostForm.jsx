import React, {useEffect, useState} from 'react';
import { apiConnection, connectApiToFetchImage, abortController} from '../lib/function';
import { useParams } from 'react-router-dom';

function PostForm(props) {
  const [post, setPost] = useState({
    post_title: "",
    article: "",
    image: "",
    summary: "",
    author: ""
  })
  
  const{post_title, summary, article, author}=post

  const {id} = useParams()

  const handleChange=(event) => {
    const value = event.target.value;
    if(event.target.name === "image"){
      setPost({...post,[event.target.name]:event.target.files[0]});
    }else{
      setPost({...post,[event.target.name]:value});
    }
  };

  useEffect(()=>{
    const EditPost = async()=> {
      try {
        if(id){
          const response = await apiConnection("/posts/" +id)
          setPost(response.data);
        }
      } catch (error) {
        console.log(error)
      }
    }
    EditPost()
    return()=>{
      if(abortController){
        abortController.abort()
      }
    }
  },[id])

 const handleSubmit = async(event) => {
    event.preventDefault();
    // var src = URL.createObjectURL('http://localhost:5506/public/images/');
    let action = props.action
    let response

    switch (action) {
        case 'add':
            response = await connectApiToFetchImage("/posts", "POST", post);
              if(response.success){
                // setPost(response.data)
              } else {
                alert(response.message)
              }
            break;
            case 'edit':
                response = await connectApiToFetchImage("/posts/" + id, "PUT", post);
                if(response.success){
                    // setPost(response.data)
                } else{
                    alert(response.message)
                }

            break;
        default:
            break;
    }
}
    return (
      <div>
      <form className="row g-3 " style={{margin:"2em"}} onSubmit={handleSubmit} >
      <div className="col-md-">
<label htmlFor="text" className="form-label">Author</label>
<input type="text" className="form-control" id="author" name="author" value={author} onChange={(event)=>handleChange(event)}/>
</div>
<div className="col-md-">
<label htmlFor="post_title" className="form-label">Title</label>
<input type="text" className="form-control cont" id="post_title" name="post_title" value={post_title} onChange={(event)=>handleChange(event)}/>
</div>

<label htmlFor="text" className="form-label">article
<textarea className="form-control" id="article" name="article" value={article} onChange={(event)=>handleChange(event)} ></textarea>
</label>  

<div className="mb-3 mt-3">
<label htmlFor="text" className="form-label">summary</label>
      <textarea className="form-control" rows="5" id="summary" name="summary" value={summary} onChange={(event)=>handleChange(event)} ></textarea>
  </div>

<label htmlFor="image" className="form-label">Image
<input onChange={(event)=>handleChange(event)} type="file" className="form-control" name="image" id="image" /> 
</label>

<div className="col-12">
<button type="submit" className="btn btn-secondary">Publish</button>
</div>
</form>
      </div>
    );
}

export default PostForm;