import "./category.scss"
import { Box, Button, Dialog, Divider, Grid, IconButton, Slide, TextField, Typography } from '@mui/material';
import { IoCloseOutline } from 'react-icons/io5';
import React, { useState } from "react"
import axios from "axios";
import { toast } from "react-toastify";
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
const AddCategory = ({ open, handleClose }) => {
    const headers = {};
    const user = JSON.parse(localStorage.getItem("user"))
    headers.authorization = `Bearer ${user?.token}`;
    const configOptions = {
        headers,
    };
    const [name, setName] = useState('')
    const handleChange = (e) => {
        setName(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.post(`/v1/category`, { name }, configOptions)
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
                        Add Category
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
                                    id="catName"
                                    label="Category Names"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" fullWidth variant='contained'>Add Category</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Box>
        </Dialog>

    )
}

export default AddCategory