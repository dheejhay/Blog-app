import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import { useNavigate } from 'react-router-dom';

function Login() {
    const {logIn, setAuth} = useApi();
    let navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({ username: '', password: ''});

    const handleChange = (event) => {
        const value = event.target.value; 
        setUserLogin({ ...userLogin, [event.target.name]: value });  
     }
    

    const handleLogin = async (event) => {
        event.preventDefault();

        const response = await logIn(userLogin);
        if(response.status){
            // console.log(response.data)
            setAuth(response.data);
            setUserLogin({ username: '', password: ''});
            navigate('/blog/posts');
        } else {
            alert(response.message)
        }
    }

    return (
        <div>
        <form className="row g-3 " onSubmit={handleLogin}>
        <div className="col-md-">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control cont" id="username" name="username" required="required" onChange={(event)=>handleChange(event)}/>
        </div>
        <div className="input-box">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control cont" id="password" name="password" required="required" onChange={(event)=>handleChange(event)} />
        </div>
        <div className="col-12">
            <button type="submit" className="btn btn-secondary">Login</button>
        </div>
    </form>
        </div>
    );
}

export default Login;