import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import logol from '../photospages/ashutosh.png';

const Login = (props) => {

  const history = useNavigate()
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const response = await fetch(`http://localhost:8080/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOTM2ZWZmYzBjMzVjZTIyMzIyNzdmIn0sImlhdCI6MTY4ODgxNzU0Mn0.3AwNxNtzOERB9LMz86GlQy0gm9hftYe0zPmdMnK7zrc"
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
      // console.log(json.user.name)

      if (json.success) {
        localStorage.setItem('token', json.token)
        localStorage.setItem('name', json.user.name)

        history('/')
        // props.showAlert("Login successfully",'success')
      }
      else {
        console.log("failed")
        history('../Pagenotfound')
        // props.showAlert("Login failed",'danger')
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
      <Layout>
        <div>
          {/* <form onSubmit={handleSubmit}> */}
          <div className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabindex="-1" role="dialog" id="modalSignin">
            <div className="modal-dialog" role="document">
              <div className="modal-content rounded-4 shadow">
                <div className="modal-header p-5 pb-4 border-bottom-0">
                  <div className="rounded-circle overflow-hidden" style={{ width: "60px", height: "60px" }}>
                    <img src={logol} alt="" style={{ "height": "100%", "width": "100%" }} />
                  </div>
                  <h1 className="fw-bold mb-0 fs-2">Login</h1>
                  <button type="button" onClick={close} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-body p-5 pt-0">
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input type="email" value={credentials.email} name='email' onChange={onChange} className="form-control rounded-3" id="floatingInput" placeholder="name@example.com" />
                      <label for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="password" name='password' value={credentials.password} onChange={onChange} className="form-control rounded-3" id="floatingPassword" autoComplete="on" placeholder="Password" />
                      <label for="floatingPassword">Password</label>
                    </div>
                    <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Login</button>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Layout>
      {/* <form onSubmit={handleSubmit} >
                <div className="mb-3 my-3" >
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} name='email' onChange={onChange} id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputpassword1" className="form-label" >password</label>
                    <input type="password" name='password' value={credentials.password} onChange={onChange} className="form-control" id="password" autoComplete="on"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form> */}
    </>
  )
}

export default Login;
