import React, {useState} from 'react';
import useApi from '../hooks/useApi';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const {openCall} = useApi();
    let navigate = useNavigate();
    const [userSignup, setUserSignup] = useState({ username: '', password: '', name: '', email:''});

    const handleChange = (event) => {
        const value = event.target.value; 
        setUserSignup({ ...userSignup, [event.target.name]: value });  
     }

    const handleSignup = async (event) => {
        try {
            event.preventDefault();
            const response = await openCall("/users/signup", "POST", userSignup);
            if(response.status){
                setUserSignup(response.data);
                navigate('/blog/users/login');
            } else {
                alert(response.message)
                alert(response.status)
            }
        } catch (error) {
            console.log("error", error)
        }  
    } 

    return (
        <div>
            <form className="row g-3 " onSubmit={handleSignup}>
                <div className="col-md-">
                    <label htmlFor="text" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" required="required" onChange={(event)=>handleChange(event)}/>
                </div>
                <div className="col-md-">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control cont" id="username" name="username" required="required" onChange={(event)=>handleChange(event)}/>
                </div>
                <div className="col-md-">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control cont" id="email" name="email" required="required" onChange={(event)=>handleChange(event)}/>
                </div>
                <div className="input-box">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control cont" id="password" name="password" required="required" onChange={(event)=>handleChange(event)}/>
                </div>
                <div className="input-box">
                    <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control cont" id="confirm_password" name="confirm_password" required="required" onChange={(event)=>handleChange(event)}/>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-secondary">Signup</button>
                </div>
                <p>Already have an account? <Link to={'/users/blog/login'}>Login</Link></p>
            </form>
        </div>
    );
}

export default Signup;

// const refresh = async () => { 
//     const refreshEndpoint = "/users/refresh";
//     try {
//       const response = await openCall(refreshEndpoint,);
//       if (response.status) {
//         setAuth(response.data);     request.headers.delete("Authorization");
// request.headers.append (
//           "Authorization",
//           `Bearer ${response.data.accessToken}`
//         );
//         const output = await fetch(request);
//         if (outpu
//         if (output.status === 200) {
//           return output.json();
//         } else {
//           return output;
//         }
//       } else {
//         navigate("/", { replace: true });
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };