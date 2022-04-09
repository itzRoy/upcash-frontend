import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import CategoryDachboardEdit from '../dashborard/CategoryDachboardEdit';
import CategoryDachboardReadonly from '../dashborard/CategoryDachboardReadonly';
import { Table, TableCell, Paper, TableHead, TableRow, TextField, Button, Container, Stack, RadioGroup, FormControlLabel, Radio } from '@mui/material';

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

    const handleEditUser = (event, cat) => {
        event.preventDefault();
        setcatInfo({ ...catInfo, editContactId: cat.id, name: cat.name, type: cat.type })
    }

    const handleCancel = event => {
        event.preventDefault();
        setcatInfo({ ...catInfo, editContactId: null })
    }

    const handleAdd = event => {
        event.preventDefault();
        let newData = { ...catInfo };
        const categoryInfo = {
            name: catInfo.name,
            type: catInfo.type
        };
        axios.post(`http://127.0.0.1:8000/api/categories`, categoryInfo)
            .then(
                (response) => {
                    if (response.status === 201 || response.status === 200) {
                        newData.categories.push({ id: response.data.Data.id, name: response.data.Data.name, type: response.data.Data.type })
                    }
                }
            ).then(() => {
                setcatInfo(newData)
            })
            .catch((err) => console.log(err));
    }

    const handledelete = (id) => {
        let newData = []
        axios.delete(`http://127.0.0.1:8000/api/categories/${id}`)
            .then(
                (response) => {
                    if (response.status === 200) {
                        newData = catInfo.categories.filter((item) => {
                            return item.id !== id
                        })
                        console.log(newData);
                    }
                }
            ).then(() => setcatInfo({ categories: newData }))

            .catch((err) => console.log(err));
    }

    const handleEdit = event => {
        let newData = { ...catInfo };
        event.preventDefault();
        const catinfo = {
            name: catInfo.name,
            type: catInfo.type
        };
        if (catInfo.name && catInfo.type) {
            const editContactId = catInfo.editContactId;
            axios.put(`http://127.0.0.1:8000/api/categories/${editContactId}`, catinfo)
                .then(
                    (response) => {
                        console.log('respone', response);
                        if (response.status === 201 || response.status === 200) {
                            const index = catInfo.categories.findIndex(x => x.id === editContactId)
                            const newData = { ...catInfo, categories: [...catInfo.categories] }
                            newData.categories[index] = { id: editContactId, name: catinfo.name, type: catinfo.type }
                            console.log(index, newData)
                            setcatInfo({ ...newData, editContactId: null })
                        }
                        console.log("newdata", newData);
                    })

                .catch((err) => console.log(err));
        }
        else { return "please enter all the field of data" }
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
        < >
            <Container maxWidth="xl"  >
                <Paper sx={{ padding: "20px" }}>
                    <Stack direction="row" spacing={2} sx={style.stack} >
                        <TextField
                            id="outlined-basic"
                            type='text'
                            name='name'
                            onChange={handlechange}
                            label="Name"
                            variant="outlined" />

                        <RadioGroup sx={{ color: "black" }} row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={handlechange} >
                            <FormControlLabel value="income" name='type' control={<Radio />} label="income" />
                            <FormControlLabel value="expense" name='type' control={<Radio />} label="expense" />
                        </RadioGroup>
                        <Button type='button' onClick={handleAdd} variant="contained" disableElevation>ADD</Button>
                    </Stack>

                    <Table aria-label="simple table" >
                        <TableHead >
                            <TableRow >
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        {catInfo.categories.map((cat, index) =>

                            <Fragment key={index}>
                                {catInfo.editContactId === cat.id ?
                                    (<CategoryDachboardEdit data={cat} changeData={handlechange} cancel={handleCancel} save={handleEdit} />) :
                                    (<CategoryDachboardReadonly data={cat} delete={handledelete} editclick={handleEditUser} />)}

                            </Fragment>
                        )}
                    </Table>
                </Paper>
            </Container>
        </>
    );
};
export default CatDachboard;
