import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import Post from "./Post";

function PostList(props) {
    const {openCall, controller} = useApi()
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        const getPost = async() =>{
          // /fetch posts from back end
          const response =await openCall ("/posts","GET")
          // set posts
          setPosts(response.data);
          
        }
         getPost()
         return()=>{
           if(controller){
           controller.abort() 
           }
         }
         },[])
    
    return (
     <div className="col-9">
     {posts.map((post) => (
         <Post
         key={post._id}
         post={post}
         view={props.action}
         />
     ))}
   </div>
    );
}

export default PostList;