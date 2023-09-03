import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import logol from '../photospages/ashutosh.png';

const Register = () => {
  const history = useNavigate();

  const [credentials, setCredentials] = useState({name: "" ,email: "",phone:"", password: "" })

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const response = await fetch(`http://localhost:8080/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOTM2ZWZmYzBjMzVjZTIyMzIyNzdmIn0sImlhdCI6MTY4ODgxNzU0Mn0.3AwNxNtzOERB9LMz86GlQy0gm9hftYe0zPmdMnK7zrc"
        },
        body: JSON.stringify({ name: credentials.name,email: credentials.email,phone: credentials.phone, password: credentials.password })
      });
      const json = await response.json();
      console.log(json)

      if (json.success) {
         localStorage.setItem('token', json.token)
        history('/login')
        console.log('User Registered');
        // props.showAlert("created user successfully", 'success')
      }
      else {
        // props.showAlert("signup failed", 'danger')
        history('../Pagenotfound')
        console.log('Signup Failed');
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const close=()=>{
    history('/')
  }
  return (
    <>
      <Layout title={"Register-Ashutosh Enterprise"}>
        <div className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabindex="-1" role="dialog" id="modalSignin">
          
            <div className="modal-dialog" role="document">
              <div className="modal-content rounded-4 shadow">
                <div className="modal-header p-5 pb-4 border-bottom-0">
                  <div className="rounded-circle overflow-hidden" style={{ width: "60px", height: "60px" }}>
                    <img src={logol} alt="" style={{ "height": "100%", "width": "100%" }} />
                  </div>
                  <h1 className="fw-bold mb-0 fs-2">Sign up for free</h1>
                  <button type="button" onClick={close} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-body p-5 pt-0">
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input type="name" placeholder="name" className="form-control rounded-3" value={credentials.name} name='name' onChange={onChange} id="floatingname"  />
                      <label htmlhtmlfor="floatingname" >Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="email" name='email' value={credentials.email} onChange={onChange} className="form-control rounded-3" id="floatingInput" placeholder="name@example.com" />
                      <label htmlfor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="tel" placeholder="" className="form-control rounded-3" value={credentials.phone} name='phone' onChange={onChange} id="floatingPhonenumber"  />
                      <label htmlhtmlfor="floatingPhonenumber" >Phone Number</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="password" name="password" value={credentials.password} autoComplete="on" onChange={onChange} className="form-control rounded-3" id="floatingPassword" placeholder="Password" />
                      <label htmlfor="floatingPassword">Password</label>
                    </div>
                    <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Sign up</button>
                    <small className="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small>
                    <hr className="my-4" />
                    <h2 className="fs-5 fw-bold mb-3">Or use a third-party</h2>
                    <button className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3" type="submit">
                      <svg className="bi me-1" width="16" height="16"></svg>
                      Sign up with Twitter
                    </button>
                    <button className="w-100 py-2 mb-2 btn btn-outline-primary rounded-3" type="submit">
                      <svg className="bi me-1" width="16" height="16"></svg>
                      Sign up with Facebook
                    </button>
                    {/* <button className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3" type="submit">
            <svg className="bi me-1" width="16" height="16"></svg>
            Sign up with GitHub
          </button> */}
                  </form>
                </div>
              </div>
            </div>
          
        </div>
      </Layout>
    </>
  )
}

export default Register;
