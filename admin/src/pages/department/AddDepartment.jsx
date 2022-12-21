import "./department.scss"
import { Box, Button, Dialog, Divider, Grid, IconButton, Slide, TextField, Typography } from '@mui/material';
import { IoCloseOutline } from 'react-icons/io5';
import Select from 'react-select'
import React, { useEffect, useState } from "react"
import axios from "axios";
import { toast } from "react-toastify";
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const AddDepartment = ({ open, handleClose }) => {
    const [catName, setCatName] = useState([])
    const [credentials, setCredentials] = useState({
        departmentName: '',
        categoryName: '',
        location: ''
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
        const getCategory = async () => {
            const res = await axios.get('http://localhost:3005/api/v1/category', configOptions)
            setCatName(res.data?.data);
        }
        getCategory()
    }, [])
    const customStyles = {
        menu: (provided,) => ({
            ...provided,
            position: 'absolute',
            zIndex: 9999
        }),
    }
    const categoryOption = catName?.map((obj) => ({
        ...obj,
        label: obj.name,
        value: obj._id,
        target: { id: 'categoryName', value: obj._id }
    }))
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.post(`/v1/department`, credentials, configOptions)
        if (res.data.success) {
            toast.success(res.data.message)
            handleClose()
        } else {
            toast.error(res.data.message)
        }
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            fullWidth
            maxWidth='sm'
        >
            <Box sx={{ pb: 3, pl: 3, pr: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignItems: 'center' }}>
                    <Typography variant='h5'>
                        Create Category
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
                                    id="departmentName"
                                    label="Department Names"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={credentials.departmentName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Select
                                    placeholder='Categories'
                                    id='categoryName'
                                    menuPlacement="auto"
                                    closeMenuOnSelect
                                    // value={credentials.cat}
                                    options={categoryOption}
                                    styles={customStyles}
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="location"
                                    label="Location"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={credentials.location}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" fullWidth variant='contained'>Add Department</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Box>
        </Dialog>

    )
}

export default AddDepartment