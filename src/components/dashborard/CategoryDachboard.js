import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { Paper, TextField, MenuItem, Select, Typography, Grid, CardContent, CardActions, Card, Button, Container, Stack, RadioGroup, FormControlLabel, Radio } from '@mui/material';

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
        },
        card: {
            color: "GREY",
            maxWidth: 300,
            backgroundColor: "#432554"
        },
        saveButton: {
            color: "black",
            margin: '0 auto',
            '&:hover': {
                color: "green"
            },
        },
        EditButton: {
            color: "black",
            margin: '0 auto',
            '&:hover': {
                color: "blue"
            },
        },
        cancelButton: {
            color: "black",
            margin: '0 auto',
            '&:hover': {
                color: "red"
            },
        },
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

                    <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
                        {catInfo.categories.map((cat, index) =>
                            <>
                                <Grid item xs={12} sm={6} md={3} >
                                    <Card sx={style.card}>
                                        <CardContent>
                                            <Typography variant="h5">
                                                Id : {cat.id}
                                            </Typography>

                                            {catInfo.editContactId === cat.id ?
                                                <>
                                                    <Typography variant="h5" >
                                                        Name :
                                                        <TextField
                                                            type='text'
                                                            name='name'
                                                            defaultValue={cat.name}
                                                            onChange={handlechange}
                                                            required />
                                                    </Typography>
                                                    <Typography variant="h5">
                                                        Type :
                                                        <Select name="type" onChange={handlechange} defaultValue={cat.type}>
                                                            <MenuItem value={'income'}>income</MenuItem>
                                                            <MenuItem value={'expense'}>expense</MenuItem>
                                                        </Select>
                                                    </Typography>
                                                </> :
                                                <>
                                                    <Typography variant="h5" >
                                                        Name : {cat.name}
                                                    </Typography>
                                                    <Typography variant="h5">
                                                        Type : {cat.type}
                                                    </Typography>
                                                </>
                                            }
                                        </CardContent>
                                        <CardActions >
                                            {catInfo.editContactId === cat.id ?
                                                <>
                                                    <ClearIcon sx={style.cancelButton} onClick={handleCancel} />
                                                    <SaveIcon sx={style.saveButton} onClick={handleEdit} />
                                                </> :
                                                <>
                                                    <EditIcon sx={style.EditButton} onClick={(event) => handleEditUser(event, cat)} />
                                                </>}
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </>
                        )}
                    </Grid>

                </Paper>
            </Container>
        </>
    );
};
export default CatDachboard;
