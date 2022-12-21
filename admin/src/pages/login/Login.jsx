import axios from 'axios';
import './login.scss'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-toastify';
import { Button, TextField } from '@mui/material';

const Login = () => {
  const navigate = useNavigate()
  const [role, setRole] = useState('')
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  })

  const { loading, error, dispatch } = useContext(AuthContext);
  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }
  const handleClick = async e => {
    e.preventDefault()
    dispatch({ type: "LOGIN_START" })
    try {
      if (!role){
        return toast.error("please choose login as ")
      }
      if (!credentials.email){
        return toast.error("please enter email")
      }
      if (!credentials.password){
        return toast.error("please enter passsword")
      }
      if (role === 'manager') {
        const res = await axios.post('v1/manager/login', credentials)
        console.log("success", res.data)
        if (res.data.data.role === "manager") {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data })
          navigate("/")
        } else {
          dispatch({ type: "LOGIN_FAILURE", payload: "You are not authorized" })
        }
      } else if (role === 'employee') {
        const res = await axios.post('v1/employee/login', credentials)
        if (res.data.data.role === "employee") {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data })
          navigate("/")
        } else {
          dispatch({ type: "LOGIN_FAILURE", payload: "You are not authorized" })
        }
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data })
    }
  }
  return (
    <div className='login' >
      <div className='lContainer'>
        <h1>Login</h1>
        <TextField
          type={'email'}
          label={'email'}
          id="email"
          onChange={handleChange}
          variant="outlined"
          size="small"
        />
        <TextField
          type={'password'}
          label={'password'}
          id="password"
          onChange={handleChange}
          variant="outlined"
          size="small"
        />
        <select className='lInput' id="cars" placeholder='Login as' onChange={(e) => { setRole(e.target.value) }}>
          <option value="" disabled selected>login as </option>
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select>
        <Button
          fullWidth
          variant='contained'
          disabled={loading}
          onClick={handleClick}>Log In</Button>
        {error && <span style={{ color: "red", margin: "0 0 10px" }}>{error.message}</span>}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Link to="/register"
            style={{ fontSize: "14px", textDecoration: "none" }}
          >
            Don't have an account ? Sign Up
          </Link>
          
        </div>

      </div>
    </div>
  )
}

export default Login