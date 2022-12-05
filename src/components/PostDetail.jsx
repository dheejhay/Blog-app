import React from 'react';
import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { apiConnection, abortController } from '../lib/function';
import { PostContext } from '../context/PostContext';
import Post from './Post';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';

function PostDetail(props) {
    const [post, setPost] = useState({
        post_title: "",
        date: "",
        article: "",
        author: "",
        image: "",
    });

    const {id}=useParams()
    useEffect(()=>{
        const singlePost = async()=>{
            // fetch posts from back end
            const response = await apiConnection("/posts/" +id)
            setPost(response.data)
        }
        singlePost()
        return()=>{
            if(abortController){
                abortController.abort()
            }
        }
    }, [id])
    return (
            <PostContext.Provider value={post}>
                <Post/>
                <Link to={`/blog/posts/edit/${id}`}>Edit</Link>
                <CommentForm />
            </PostContext.Provider>
    );
}

export default PostDetail;