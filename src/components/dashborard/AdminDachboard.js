import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';
import { TextField, DialogTitle, Grid, Typography, CardActions, CardContent, DialogContent, DialogActions, Card, DialogContentText, Dialog, Button, Container, Stack, Paper } from '@mui/material';

const AdminDachboard = (props) => {

    const [AdminInfo, setAdminInfo] = useState({
        id: '',
        username: '',
        password: '',
        editContactId: '',
        Admins: [],
    });

    const [open, setOpen] = useState(false);
    const [openPass, setOpenPass] = useState(false);

    useEffect(() => {
        axios.get(`admin`)
            .then((res) => {
                let admn = res.data;
                setAdminInfo({ Admins: admn })
            })
            .catch((err) => console.log(err));
    }, []);

    const handleClosePass = () => {
        setOpenPass(false);
    };

    const handleClickOpenPass = () => {
        setOpenPass(true);
    };

    const handleClickOpen = (event,user) => {
        setOpen(true);
        setAdminInfo({ ...AdminInfo, id: user.id})

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlechange = e => {
        setAdminInfo({ ...AdminInfo, [e.target.name]: e.target.value })
    }

    const handleEditFlag = (event, user) => {
        event.preventDefault();
        setAdminInfo({ ...AdminInfo, editContactId: user.id, username: user.username, password: user.password })
    }

    const handleCancel = event => {
        event.preventDefault();
        setAdminInfo({ ...AdminInfo, editContactId: null })
    }

    const handleAdd = event => {
        event.preventDefault();
        let newData = { ...AdminInfo };
        const userInfo = {
            username: AdminInfo.username,
            password: AdminInfo.password
        };
        axios.post(`http://127.0.0.1:8000/api/addadmin`, userInfo)
            .then(
                (response) => {
                    if (response.status === 201) {
                        newData.Admins.push({ id: response.data.id, username: response.data.username, password: response.data.password })
                    }
                }
            ).then(() => {
                setAdminInfo(newData)
                console.log("newData:", newData);
            })
            .catch((err) => console.log(err));
    }

    const handleEdit = event => {
        let newData = { ...AdminInfo };
        event.preventDefault();
        const userInfo = {
            username: AdminInfo.username,
            password: AdminInfo.password,
        };
        if (AdminInfo.username) {
            const editContactId = AdminInfo.editContactId;
            axios.put(`http://127.0.0.1:8000/api/admin/${editContactId}`, userInfo)
                .then(
                    (response) => {
                        if (response.status === 201 || response.status === 200) {
                            const index = AdminInfo.Admins.findIndex(x => x.id === editContactId)
                            const newData = { ...AdminInfo, Admins: [...AdminInfo.Admins] }
                            newData.Admins[index] = { id: editContactId, username: userInfo.username, password: userInfo.password }
                            console.log(index, newData)
                            setAdminInfo({ ...newData, editContactId: null })
                        }

                        console.log("newdata", newData);
                        setOpenPass(false);
                    })

                .catch((err) => console.log(err));
        }
        else { return "please enter all the field of data" }
    }

    const handledelete = (id) => {

        setOpen(false);
        let newData = []
        axios.delete(`http://127.0.0.1:8000/api/admin/${id}`)
            .then(
                (response) => {
                    if (response.status === 200) {
                        newData = AdminInfo.Admins.filter((item) => {
                            return item.id !== id
                        })
                    }
                }
            ).then(() => setAdminInfo({ Admins: newData }))

            .catch((err) => console.log(err));

    }

    const style = ({
        stack: {
            marginTop: '25px',
            marginBottom: '25px',
            color: 'white',
            justifyContent: "center"
        },
        saveButton: {
            color: "black",
            margin:'0 auto',
            '&:hover': {
                color: "green"
            },
        },
        cancelButton: {
            color: "black",
            margin:'0 auto',
            '&:hover': {
                color: "red"
            },
        },
        lockButton: {
            color: "black",
            margin:'0 auto',
            '&:hover': {
                color: "yellow"
            },
        },
        deleteButton: {
            color: "black",
            margin:'0 auto',
            '&:hover': {
                color: "red"
            },
        },
        EditButton: {
            color: "black",
            margin:'0 auto',
            '&:hover': {
                color: "blue"
            },
        },
        card: {
            color: "GREY",
            maxWidth: 300,
            backgroundColor: "#432554"
        },
     
    });

    return (
        <div>
            <Container maxWidth="xl">
                <Paper sx={{ padding: "20px" }}>
                    <Stack direction="row" spacing={2} sx={style.stack}>
                        <TextField id="outlined-basic" type='text' name='username' onChange={handlechange} label="username" variant="outlined" />
                        <TextField id="outlined-basic" type='text' name='password' onChange={handlechange} label="password" variant="outlined" />
                        <Button type='button' onClick={handleAdd} variant="contained" disableElevation>ADD</Button>
                    </Stack>
                    <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
                        {AdminInfo.Admins.map((user) =>
                            <>
                            
                                <Grid item xs={12} sm={6} md={3} >
                                    <Card sx={style.card}>
                                        <CardContent>
                                            <Typography variant="h5">
                                                ID : {user.id}
                                            </Typography>

                                            {AdminInfo.editContactId === user.id ?

                                                <Typography variant="h5">
                                                    Name :
                                                    <TextField type='text'
                                                        name='username'
                                                        defaultValue={user.username}
                                                        onChange={handlechange}
                                                        required
                                                    />
                                                </Typography> :
                                                <Typography variant="h5" >
                                                    UserName : {user.username}
                                                </Typography>
                                            }
                                        </CardContent>
                                        <CardActions >
                                            {AdminInfo.editContactId === user.id ?
                                                <>
                                                    <ClearIcon sx={style.cancelButton} onClick={handleCancel} />
                                                    <SaveIcon sx={style.saveButton} onClick={handleEdit} />
                                                    <LockIcon sx={style.lockButton} onClick={handleClickOpenPass} />
                                                </> :
                                                <>
                                                    <DeleteOutlinedIcon sx={style.deleteButton} onClick={(event) => handleClickOpen(event, user)} />
                                                    <EditIcon sx={style.EditButton} onClick={(event) => handleEditFlag(event, user)} />
                                                </>}
                                        </CardActions>
                                    </Card>
                                </Grid>

                                <Dialog open={open} onClose={handleClose}>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Are you sure you want to delete this Admin?
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Disagree</Button>
                                        <Button onClick={()=>handledelete(AdminInfo.id)} autoFocus>Agree</Button>
                                    </DialogActions>
                                </Dialog>

                                <Dialog open={openPass} onClose={handleClosePass}>
                                    <DialogTitle id="alert-dialog-title">
                                        {"Enter your new password"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <TextField type='password'
                                            name='password'
                                            defaultValue={AdminInfo.password}
                                            onChange={handlechange}
                                            required
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClosePass}>Disagree</Button>
                                        <Button onClick={handleEdit} autoFocus>Agree</Button>
                                    </DialogActions>
                                </Dialog>
                            </>
                        )}
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
};
export default AdminDachboard;
