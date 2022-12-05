import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Navbar from "./Navbar";
import BlogHeader from "./BlogHeader";
import PopularPost from "./PopularPost";
import PostList from "./PostList";
import Footer from "./Footer";
import PostForm from "./PostForm";
import PostDetail from "./PostDetail";
import Signup from "./Signup";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "./Profile";
import AuthContext from "../context/AuthContext"


function App() {
  const [auth, setAuth] = useState({});
  return (
    <div>
      <BrowserRouter>
      <AuthContext.Provider value={{ auth, setAuth}}>
      <Navbar/>
      <main>

      <BlogHeader />        
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
      <Routes>
        <Route path="/blog/posts" exact element={<PostList action={"details"} />}/>
        <Route  element={ <ProtectedRoute/>} >
        <Route path='/blog/posts/:id' element={<PostDetail />}/>
        <Route path='/blog/posts/add' element={<PostForm action={"add"} />}/>
        <Route path='/blog/posts/edit/:id' element={<PostForm action={"edit"} />}/>  
        <Route path = '/blog/profile' element={<Profile/>} />
        </Route> 
        <Route path='/blog/users/signup' element={<Signup />}/>
        <Route path='/blog/users/login' element={<Login />}/>
      </Routes>
        <PopularPost/>
          </div> 
        </div>
      </div>
   </main>
   <Footer />
   </AuthContext.Provider>
  </BrowserRouter>       
</div>
    
  );
}

export default App;
