import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormGroup, MenuItem, Select, TextareaAutosize, TextField, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'
import DateAdapter from '@mui/lab/AdapterLuxon';
import { LocalizationProvider, DateTimePicker, StaticDateTimePicker } from '@mui/lab';
import React, { useState } from 'react'
import { DateTime } from 'luxon';

function AddTransactionFrom(props) {
    const [data, setData] = useState({ title: "", amount: "", })
    const [error, setError] = useState({})

    // ====# handel change from add transaction page and save them in state ====
    const handelChange = (event) => {
        const key = event.target.name
        const value = event.target.value
        const newData = { ...data, [key]: value }
        console.log(newData)
        setData(newData);
    }


    // =====# create and event object for date picker ============
    const handelDatePicker = (val) => {
        const dateTime = val.toISO(DateTime)
        const event = {
            target: {
                name: "created_at",
                value: dateTime
            }
        };
        handelChange(event)
    };


    return (

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
                        <TextField required label="Title" name="title" type="text"
                            onChange={(e) => handelChange(e)} />
                    </FormControl>

                    {/*====== Amount and currency ================== */}
                    <FormGroup sx={{ gap: "10px" }} row >

                        <FormControl sx={{ flexGrow: 1 }} required margin="normal" type="number" >

                            <TextField label="amount" name="amount" type="number"
                                onChange={(e) => handelChange(e)} />
                        </FormControl>

                        <FormControl required margin="normal" >
                            <TextField
                                select
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
                    <FormGroup sx={{ gap: "10px" }} row >
                        <FormControl sx={{ flexGrow: 1 }} margin="normal"  >

                            <TextField variant="outlined"
                                name="expense-type"
                                defaultValue={"expense"}
                                label="Transaction Type"
                                select
                            // onChange={(e) => handelCurrencyCHange(e)}
                            >

                                <MenuItem value={"expense"}>Expense</MenuItem>
                                <MenuItem value={"income"}>Income</MenuItem>

                            </TextField>
                        </FormControl>

                        {/*====== Select Category ====================== */}
                        <FormControl margin="normal" sx={{ flexGrow: 1 }} >

                            <TextField variant="outlined" select
                                name="category_id"
                                defaultValue={""}
                                label="Category"
                                onChange={(e) => handelChange(e)}
                            >

                                <MenuItem value={"1"}>test</MenuItem>
                                <MenuItem value={"2"}>green</MenuItem>

                            </TextField>
                        </FormControl>
                    </FormGroup>


                    {/*====== Note ================================ */}
                    <FormControl margin="normal">
                        <TextField margin="normal" label="note" name="note"
                            onChange={(e) => handelChange(e)}></TextField>
                    </FormControl>


                    {/*====== Select Date ========================== */}
                    <FormControl margin="normal" >
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DateTimePicker
                                name="created_at"
                                label="Date & Time picker"
                                value={DateTime.now()}
                                maxDateTime={DateTime.now()}
                                renderInput={(params) => <TextField  {...params} />}
                                onChange={(val) => handelDatePicker(val)}
                            />
                        </LocalizationProvider>
                    </FormControl>



                </FormGroup>


            </DialogContent>

            <DialogActions>
                <Button autoFocus color="error" onClick={() => props.openClose(false)} >
                    cancel
                </Button>
                <Button type="submit" variant="contained" color="success" autoFocus>
                    Add transaction
                </Button>

            </DialogActions>


        </Dialog>
    )
}

export default AddTransactionFrom
