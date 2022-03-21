import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import CategoryDachboardEdit from '../components/CategoryDachboardEdit';
import CategoryDachboardReadonly from '../components/CategoryDachboardReadonly';

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
        axios.get(`http://127.0.0.1:8000/api/categories`)
            .then((res) => {
                let cat = res.data;
                setcatInfo({ categories: cat })
            })
            .catch((err) => console.log(err));
    }, []);

    const handlechange = e => {
        setcatInfo({ ...catInfo, [e.target.name]: e.target.value })
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
    }


    const handledelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/categories/${id}`)
            .then((res) => window.location.reload())
            .catch((err) => console.log(err));

    }

    const handleEditUser = (event, user) => {
        event.preventDefault();
        setcatInfo({ ...catInfo, editContactId: user.id })
    }

    const handleCancel = event => {
        event.preventDefault();
        setcatInfo({ ...catInfo, editContactId: null })
    }

    const handleEdit = event => {
        const catinfo = {
            name: catInfo.name,
            type: catInfo.type,
        };
        const editContactId = catInfo.editContactId;

        axios.put(`http://127.0.0.1:8000/api/categories/${editContactId}`, catinfo)
            .then((res) => window.location.reload())
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <Container maxWidth="xl">

                <Stack direction="row" spacing={2} justifyContent="center" >
                    <TextField id="outlined-basic" type='text' name='name' onChange={handlechange} label="Name" variant="outlined" />
                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={handlechange}>
                        <FormControlLabel value="income" name='type' control={<Radio />} label="income" />
                        <FormControlLabel value="expense" name='type' control={<Radio />} label="expense" />
                    </RadioGroup>
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
