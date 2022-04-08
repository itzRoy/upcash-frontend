import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import AdminDachboardReadonly from './adminDachboardReadonly';
import AdminDachboardEdit from './AdminDachboardEdit';
import Swal from "sweetalert2";
import { Table, TableCell, TableHead, TableRow, TextField, Button, Grid, Container, Stack } from '@mui/material';

const AdminDachboard = (props) => {

    const [AdminInfo, setAdminInfo] = useState({
        id: '',
        username: '',
        password: '',
        editContactId: '',
        Admins: [],
    });

    useEffect(() => {
        axios.get(`admin`)
            .then((res) => {
                let admn = res.data;
                setAdminInfo({ Admins: admn })
            })
            .catch((err) => console.log(err));
    }, []);

    const handlechange = e => {
        setAdminInfo({ ...AdminInfo, [e.target.name]: e.target.value })
    }

    const handleEditUser = (event, user) => {
        event.preventDefault();
        setAdminInfo({ ...AdminInfo, editContactId: user.id })
    }

    const handleCancel = event => {
        event.preventDefault();
        setAdminInfo({ ...AdminInfo, editContactId: null })
    }


    const handleAdd = event => {
        event.preventDefault();
        const userInfo = {
            username: AdminInfo.username,
            password: AdminInfo.password
        };

        axios.post(`addadmin`, userInfo)
            .then((res) => window.location.reload())
            .catch((err) => console.log(err));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your Category has been saved',
            showConfirmButton: false,
            timer: 1500
        })
    }


    const handleEdit = event => {
        event.preventDefault();

        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Cancel`,
        }).then((result) => {

            if (result.isConfirmed) {
                const userInfo = {
                    username: AdminInfo.username,
                    password: AdminInfo.password,
                };
                const editContactId = AdminInfo.editContactId;
                axios.put(`http://127.0.0.1:8000/api/admin/${editContactId}`, userInfo)
                    .then((res) => window.location.reload())
                    .catch((err) => console.log(err));
            }
            else if (result.isDenied) {
                setAdminInfo({ ...AdminInfo, editContactId: null })
            }
        })
    }


    const ConfirmDelete = (id) => {
        Swal.fire({
            title: 'Are you sure? You want to delete this Admin',

            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/admin/${id}`)
                    .then((res) => window.location.reload())
                    .catch((err) => console.log(err));
            }
        })
    }

    return (
        <div>
            <Container maxWidth="xl">

                <Stack direction="row" spacing={2} justifyContent="center" style={{ marginTop: '25px', marginBottom: '25px' }}>
                    <TextField id="outlined-basic" type='text' name='username' onChange={handlechange} label="username" variant="outlined" />
                    <TextField id="outlined-basic" type='text' name='password' onChange={handlechange} label="password" variant="outlined" />
                    <Button type='button' onClick={handleAdd} variant="contained" disableElevation>ADD</Button>
                </Stack>

                <Table aria-label="simple table" >
                    <TableHead >
                        <TableRow>
                            <Grid container spacing={2} >
                                <Grid item xs={3}>
                                    <TableCell >ID</TableCell>
                                </Grid>
                                <Grid item xs={3} >
                                    <TableCell >Username</TableCell>
                                </Grid>
                                <Grid item xs={3}>
                                    <TableCell >Password</TableCell>
                                </Grid>
                                <Grid item xs={3}>
                                    <TableCell >Action</TableCell>
                                </Grid>
                            </Grid>
                        </TableRow>
                    </TableHead>

                    {AdminInfo.Admins.map((user, index) =>
                        <Fragment key={index}>
                            {AdminInfo.editContactId === user.id ?
                                (<AdminDachboardEdit data={user} changeData={handlechange} cancel={handleCancel} save={handleEdit} />) :
                                (<AdminDachboardReadonly data={user} deleteBtn={ConfirmDelete} editclick={handleEditUser} />)}
                        </Fragment>
                    )}
                </Table>
            </Container>
        </div>
    );
};

export default AdminDachboard;
