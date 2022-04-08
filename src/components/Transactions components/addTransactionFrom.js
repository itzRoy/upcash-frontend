import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormGroup, MenuItem, Snackbar, TextField, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors';
import DateAdapter from '@mui/lab/AdapterLuxon';
import { LocalizationProvider, DateTimePicker, StaticDateTimePicker } from '@mui/lab';
import React, { useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import axios from 'axios';

function AddTransactionFrom(props) {
    const defaultValue = { title: "", amount: "", note: "", category_id: "", currency_id: 1, created_at: DateTime.now(), }
    const errorList = { title: false, amount: false, category_id: false, }
    const [data, setData] = useState({ ...defaultValue })
    const [catType, setCatType] = useState('expense')
    const [categories, setCategories] = useState([])
    const [errors, setErrors] = useState({ ...errorList })
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);


    //===== reset form 
    useEffect(() => {
        setCatType("expense")
        setData({ ...defaultValue })
        setErrors({ ...errorList })
        setOpenErrorAlert(false)
    }, [props.open])

    //===== get categories on category type change
    useEffect(() => {
        axios.get(`income-expense/${catType}`)
            .then(response => setCategories(response.data))
            .catch(err => console.log(err))
    }, [catType])



    //********** Snacks *******
    const showAlert = (event) => {
        if (event === "error") setOpenErrorAlert(true);
        if (event === "success") setOpenSuccessAlert(true);

    };

    const closeAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenErrorAlert(false);
        setOpenSuccessAlert(false)
    };


    // =========================================================================

    //===== handling changing category type =================
    const handelCatTypeChange = (event) => {
        const value = event.target.value
        // reset category_id after changing category type
        setData({ ...data, category_id: "" })
        setCatType(value)
    }

    //=====# handel change from add transaction page and save them in state ====
    const handelChange = (event) => {
        const key = event.target.name
        const value = event.target.value
        const newData = { ...data, [key]: value }

        // save inputted data inside data state
        setData(newData);

        //reset error for changed field
        setErrors({ ...errors, [key]: false })
    }


    // ======== handling From Submit after Validation using handel error function ====
    const handelSubmit = () => {
        if (!checkErrors(data)) {
            props.submit(data);
            props.openClose(false);
            setData({ ...defaultValue })
            showAlert("success")
        }
        else showAlert("error")

    }


    //===== handling error in form
    const checkErrors = (Data) => {
        let errorFlag = false
        let newError = { ...errors };

        if (Data.title === "") {
            newError = { ...newError, title: true }
            errorFlag = true;
        }
        if (Data.amount === "") {
            newError = { ...newError, amount: true }
            errorFlag = true;
        }
        if (Data.category_id === "") {
            newError = { ...newError, category_id: true }
            errorFlag = true
        }
        setErrors(newError);
        return errorFlag
    }


    //======# create and event object for date picker ============
    const handelDatePicker = (val) => {
        const dateTime = val.toISO(DateTime)
        console.log("add time:", dateTime)
        const event = {
            target: {
                name: "created_at",
                value: dateTime
            }
        };
        handelChange(event)
    };

    //======# Handel Modal close and clear form data ========
    const handelClose = () => {
        props.openClose(false);
    }



    // #################################################################################
    // ####### Return ##################################################################
    return (
        <>
            <Dialog
                scroll="paper"
                fullWidth
                maxWidth="md"
                open={props.open}
                onClose={() => props.openClose(false)}
            >

                <DialogTitle color={green[700]} id="responsive-dialog-title">
                    {"Add a new transaction"}

                </DialogTitle>

                <DialogContent>
                    <Divider />

                    <FormGroup>
                        {/*====== Title ================================ */}
                        <FormControl required margin="normal"   >
                            <TextField required
                                label="Title"
                                name="title"
                                type="text"
                                error={errors.title}
                                helperText={errors.title ? "Title is Required" : ""}
                                value={data.title}
                                onChange={e => handelChange(e)} />
                        </FormControl>

                        {/*====== Amount and currency ================== */}
                        <FormGroup sx={{ gap: "10px" }} row >

                            <FormControl sx={{ flexGrow: 0.8 }} required margin="normal" type="number" >

                                <TextField
                                    label="amount"
                                    name="amount"
                                    type="number"
                                    inputProps={{ maxLength: "3" }}
                                    error={errors.amount}
                                    helperText={errors.amount ? "amount is Required" : ""}
                                    onChange={e => handelChange(e)} />
                            </FormControl>

                            <FormControl margin="normal" sx={{ flexGrow: 0.2 }} >
                                <TextField
                                    select
                                    required
                                    name="currency_id"
                                    value={1}
                                    label="Currency"
                                    onChange={(e) => handelChange(e)}
                                >
                                    <MenuItem value={1}>$-USD</MenuItem>

                                </TextField>
                            </FormControl>

                        </FormGroup>

                        {/*====== Type ================================= */}
                        <FormGroup sx={{ columnGap: "10px", }} row >
                            <FormControl sx={{ flexGrow: 0.5 }} margin="normal"  >

                                <TextField variant="outlined"

                                    select
                                    required
                                    name="expense-type"
                                    defaultValue={"expense"}
                                    label="Transaction Type"
                                    onChange={e => handelCatTypeChange(e)}
                                >

                                    <MenuItem value={"expense"}>Expense</MenuItem>
                                    <MenuItem value={"income"}>Income</MenuItem>

                                </TextField>
                            </FormControl>

                            {/*====== Select Category ====================== */}
                            <FormControl margin="normal" sx={{ flexGrow: 0.5 }} >

                                <TextField variant="outlined"
                                    select
                                    required
                                    id="category"
                                    name="category_id"
                                    value={data.category_id}
                                    label="Category"
                                    error={errors.category_id}
                                    helperText={errors.category_id ? "category is Required" : ""}
                                    onChange={e => handelChange(e)}
                                >

                                    {categories.map((item) => {
                                        return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                    })}

                                </TextField>
                            </FormControl>
                        </FormGroup>


                        {/*====== Note ================================ */}
                        <FormControl margin="normal">
                            <TextField label="note" name="note"
                                onChange={e => handelChange(e)}></TextField>
                        </FormControl>


                        {/*====== Select Date ========================== */}
                        <FormControl margin="normal" >
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <DateTimePicker
                                    name="created_at"
                                    label="Date & Time picker"
                                    value={data.created_at}
                                    maxDateTime={DateTime.now()}
                                    renderInput={(params) => <TextField  {...params} />}
                                    onChange={val => handelDatePicker(val)}
                                />
                            </LocalizationProvider>
                        </FormControl>



                    </FormGroup>


                </DialogContent>

                <DialogActions>
                    <Button autoFocus color="error" onClick={handelClose} >
                        cancel
                    </Button>
                    <Button onClick={handelSubmit} type="submit" variant="contained" color="success" autoFocus>
                        Add transaction
                    </Button>

                </DialogActions>


            </Dialog>
            {/*========== Notification ================ */}

            <Snackbar open={openErrorAlert} autoHideDuration={4000} onClose={closeAlert}>
                <Alert
                    onClose={closeAlert}
                    severity="error"

                    sx={{ width: '100%', color: "white", backgroundColor: red[900] }}
                >
                    Required fields can not be empty!
                </Alert>
            </Snackbar>

            <Snackbar open={openSuccessAlert} autoHideDuration={4000} onClose={closeAlert}>
                <Alert
                    onClose={closeAlert}
                    severity="success"
                    sx={{ width: '100%', color: "white", backgroundColor: green[800] }}
                >
                    Transaction was successfully created
                </Alert>
            </Snackbar>
        </>
    )
}

export default AddTransactionFrom
