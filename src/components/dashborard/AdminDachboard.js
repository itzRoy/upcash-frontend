import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import AdminDachboardReadonly from '../dashborard/adminDachboardReadonly';
import AdminDachboardEdit from '../dashborard/AdminDachboardEdit';
import { Table, TableCell, TableHead, TableRow, TextField, Button, Container, Stack, Paper } from '@mui/material';

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
                    })
                .catch((err) => console.log(err));
        }
        else { return "please enter all the field of data" }
    }

    const handledelete = (id) => {
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
        }
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

                    <Table aria-label="simple table" >
                        <TableHead >
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell >Username</TableCell>
                                <TableCell >Password</TableCell>
                                <TableCell >Action</TableCell>
                            </TableRow>
                        </TableHead>

                        {AdminInfo.Admins.map((user, index) =>
                            <Fragment key={index}>
                                {AdminInfo.editContactId === user.id ?
                                    (<AdminDachboardEdit data={user} changeData={handlechange} cancel={handleCancel} save={handleEdit} />) :
                                    (<AdminDachboardReadonly data={user} delete={handledelete} editclick={handleEditUser} />)}
                            </Fragment>
                        )}
                    </Table>
                </Paper>
            </Container>
        </div>
    );
};
export default AdminDachboard;
