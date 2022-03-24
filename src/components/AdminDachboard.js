import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import AdminDachboardReadonly from '../components/adminDachboardReadonly';
import AdminDachboardEdit from '../components/AdminDachboardEdit';

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

    const handleAdd = event => {
        event.preventDefault();
        const userInfo = {
            username: AdminInfo.username,
            password: AdminInfo.password
        };

        axios.post(`http://127.0.0.1:8000/api/admin`, userInfo)
            .then((res) => window.location.reload())
            .catch((err) => console.log(err));
    }


    const handledelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/admin/${id}`)
            .then((res) => window.location.reload())
            .catch((err) => console.log(err));

    }

    const handleEditUser = (event, user) => {
        event.preventDefault();
        setAdminInfo({ ...AdminInfo, editContactId: user.id })
    }

    const handleCancel = event => {
        event.preventDefault();
        setAdminInfo({ ...AdminInfo, editContactId: null })
    }

    const handleEdit = event => {
        const userInfo = {
            username: AdminInfo.username,
            password: AdminInfo.password,
        };
        const editContactId = AdminInfo.editContactId;

        axios.put(`http://127.0.0.1:8000/api/admin/${editContactId}`, userInfo)
            .then((res) => window.location.reload())
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <Container maxWidth="xl">

                <Stack direction="row" spacing={2} justifyContent="center" >
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
                                (<AdminDachboardReadonly data={user} deleteBtn={handledelete} editclick={handleEditUser} />)}
                        </Fragment>
                    )}
                </Table>
            </Container>
        </div>
    );
};

export default AdminDachboard;
