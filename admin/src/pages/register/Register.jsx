import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

const Register = () => {
    const navigate = useNavigate()
    const [role, setRole] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [credentials, setCredentials] = useState({
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        gender: undefined,
        hobbies: undefined,
        password: undefined,
        confirmPassword: undefined
    })
    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }
    const handleClick = async e => {
        e.preventDefault()
        try {
            if (!role) {
                return toast.error("please choose register as ")
            } 
            if (!credentials.firstName) {
                return toast.error("please enter first name")
            } 
            if (!credentials.lastName) {
                return toast.error("please enter last name")
            } 
            if (credentials.password !== credentials.confirmPassword) {
                return toast.error("Password and confirm password does not matched.")
            }
            if (credentials.password.length < 8 || credentials.password.length > 20) {
                return toast.error("Password must be between 8 to 20 char long")
            }
            if (role === 'manager') {
                setLoading(true)
                const res = await axios.post('v1/manager', credentials)
                setLoading(false)
                if (res.data.success) {
                    toast.success(res.data.message)
                    navigate("/login")
                } else {
                    setLoading(false)
                    toast.error(res.data.message)
                }
            } else if (role === 'employee') {
                setLoading(true)
                const res = await axios.post('v1/employee', credentials)
                setLoading(false)
                if (res.data.success) {
                    toast.success(res.data.message)
                    navigate("/login")
                } else {
                    setLoading(false)
                    toast.error(res.data.message)
                }
            }
        } catch (error) {
            toast.error("Something went wrong!!")
        }
    }
    return (
        <div className='login' >
            <div className='lContainer'>
                <h1>Register</h1>
                <TextField
                    type={'text'}
                    label={'Enter your first name'}
                    id="firstName"
                    variant="outlined"
                    size="small"
                    onChange={handleChange}
                />
                <TextField
                    type={'text'}
                    label={'Enter your last name'}
                    id="lastName"
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                />
                <TextField
                    type={'email'}
                    label={'Email'}
                    id="email"
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                />
                <select className='lInput' id="gender" onChange={handleChange}>
                    <option value="" disabled selected>Gender : </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Others</option>
                </select>
                <TextField
                    type={'text'}
                    label={'enter your hobbies'}
                    id="hobbies"
                    onChange={handleChange}
                    variant="outlined"
                    multiline
                    rows={4}
                />
                <TextField
                    type={'password'}
                    label={'password'}
                    id="password"
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                />
                <TextField
                    type={'password'}
                    label={'confirm password'}
                    id="confirmPassword"
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                />
                <select className='lInput' id="role" onChange={(e) => { setRole(e.target.value) }}>
                    <option value="" disabled selected>Register as </option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                </select>
                <Button 
                fullWidth 
                variant='contained' 
                disabled={loading}
                onClick={handleClick}>Register</Button>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Link to="/login"
                        style={{ fontSize: "14px", textDecoration: "none" }}
                    >
                        Already have an account ? Sign In
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Register