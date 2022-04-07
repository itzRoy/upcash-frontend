import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import CategoryDachboardEdit from './CategoryDachboardEdit';
import CategoryDachboardReadonly from './CategoryDachboardReadonly';
import Swal from "sweetalert2";
import { Table, TableCell, TableHead, TableRow, TextField, Button, Grid, Container, Stack, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const CatDachboard = (props) => {

    const [catInfo, setcatInfo] = useState({
        id: '',
        name: '',
        type: '',
        editContactId: '',
        categories: [],
    });

    useEffect(() => {
        axios.get(`categories`)
            .then((res) => {
                let cat = res.data;
                setcatInfo({ categories: cat })
            })
            .catch((err) => console.log(err));
    }, []);

    const handlechange = e => {
        setcatInfo({ ...catInfo, [e.target.name]: e.target.value })
    }
    const handleEditUser = (event, user) => {
        event.preventDefault();
        setcatInfo({ ...catInfo, editContactId: user.id })
    }
    const handleCancel = event => {
        event.preventDefault();
        setcatInfo({ ...catInfo, editContactId: null })
    }


    const handleAdd = event => {
        event.preventDefault();
        const categoryInfo = {
            name: catInfo.name,
            type: catInfo.type
        };
        axios.post(`http://127.0.0.1:8000/api/categories`, categoryInfo)
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


    const handledelete = (id) => {
        Swal.fire({
            title: 'Are you sure? You want to delete this Category',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/categories/${id}`)
                    .then((res) => window.location.reload())
                    .catch((err) => console.log(err));
            }
        })
    }

    const handleEdit = event => {

        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Cancel`,
        }).then((result) => {

            if (result.isConfirmed) {
                const catinfo = {
                    name: catInfo.name,
                    type: catInfo.type,
                };
                const editContactId = catInfo.editContactId;
                axios.put(`http://127.0.0.1:8000/api/categories/${editContactId}`, catinfo)
                    .then((res) => window.location.reload())
                    .catch((err) => console.log(err));
            }
            else if (result.isDenied) {
                setcatInfo({ ...catInfo, editContactId: null })
            }
        })
    }



    return (
        <div >
            <Container maxWidth="xl"  >

                <Stack direction="row" spacing={2} justifyContent="center" style={{ marginTop:'25px',marginBottom:'25px',color:'white'}}>
                    <TextField id="outlined-basic" type='text' name='name' onChange={handlechange} label="Name" variant="outlined" />
                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={handlechange}>
                        <FormControlLabel value="income" name='type' control={<Radio />} label="income" />
                        <FormControlLabel value="expense" name='type' control={<Radio />} label="expense" />
                    </RadioGroup>
                    <Button style={{ width: "10%"}} type='button' onClick={handleAdd} variant="contained" disableElevation>ADD</Button>
                </Stack>
    
                <Table aria-label="simple table" >
                    <TableHead >
                        <TableRow>
                            <Grid container spacing={2} >
                                <Grid item xs={3}>
                                    <TableCell >ID</TableCell>
                                </Grid>
                                <Grid item xs={3} >
                                    <TableCell >Name</TableCell>
                                </Grid>
                                <Grid item xs={3}>
                                    <TableCell >Type</TableCell>
                                </Grid>
                                <Grid item xs={3}>
                                    <TableCell >Action</TableCell>
                                </Grid>
                            </Grid>
                        </TableRow>
                    </TableHead>

                    {catInfo.categories.map((cat, index) =>
                        <Fragment key={index}>
                            {catInfo.editContactId === cat.id ?
                                (<CategoryDachboardEdit data={cat} changeData={handlechange} cancel={handleCancel} save={handleEdit} />) :
                                (<CategoryDachboardReadonly data={cat} deleteBtn={handledelete} editclick={handleEditUser} />)}
                        </Fragment>
                    )}
                </Table>
               
            </Container>
        </div>
    );
};

export default CatDachboard;
