import { Box, Button, Dialog, Divider, Grid, IconButton, Slide, TextField, Typography } from '@mui/material';
import { IoCloseOutline } from 'react-icons/io5';
import Select from 'react-select'
import React, { useEffect, useState } from "react"
import axios from "axios";
import { toast } from "react-toastify";
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const Assign = ({ open, handleClose }) => {
    const { values } = open;
    const [catName, setCatName] = useState([])
    console.log("values --", values)
    const [credentials, setCredentials] = useState({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        department: values.department?._id,
        dep: {
            label: values.department?.departmentName ,
            value: values.department?._id,
        }
    })
    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }
    const headers = {};
    const user = JSON.parse(localStorage.getItem("user"))
    headers.authorization = `Bearer ${user?.token}`;
    const configOptions = {
        headers,
    };
    useEffect(() => {
        const getDepartment = async () => {
            const res = await axios.get('http://localhost:3005/api/v1/department', configOptions)
            setCatName(res.data?.data);
        }
        getDepartment()
    }, [])
    const customStyles = {
        menu: (provided,) => ({
            ...provided,
            position: 'absolute',
            zIndex: 9999
        }),
    }
    const departmentOption = catName?.map((obj) => ({
        ...obj,
        label: obj.departmentName,
        value: obj._id,
        target: { id: 'department', value: obj._id }
    }))
    console.log("getCategories --", credentials.categoryName)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.put(`/v1/employee/${values._id}`, credentials, configOptions)
        if (res.data.success) {
            toast.success(res.data.message)
            handleClose()
        } else {
            toast.error(res.data.message)
        }
    }
    return (
        <Dialog
            open={open.action}
            onClose={handleClose}
            TransitionComponent={Transition}
            fullWidth
            maxWidth='sm'
        >
            <Box sx={{ pb: 3, pl: 3, pr: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignItems: 'center' }}>
                    <Typography variant='h5'>
                        Assign Department
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <IoCloseOutline size={22} />
                    </IconButton>
                </Box>
                <Divider sx={{ mb: 3 }} />
                <Box>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="firstName"
                                    label="First Names"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled
                                    value={credentials.firstName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="lastName"
                                    label="Last Names"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled
                                    value={credentials.lastName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled
                                    value={credentials.lastName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Select
                                    placeholder='Department'
                                    id='categoryName'
                                    menuPlacement="auto"
                                    closeMenuOnSelect
                                    value={credentials.dep}
                                    options={departmentOption}
                                    styles={customStyles}
                                    onChange={(e) => {
                                        handleChange(e)
                                        setCredentials(prev => ({ ...prev, dep: e }))
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" fullWidth variant='contained'>Update</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Box>
        </Dialog>

    )
}

export default Assign