import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Input, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'
import React from 'react'

function AddTransactionFrom(props) {
    return (
        <>
            <DialogTitle color={green[700]} id="responsive-dialog-title">
                {"Add a new transaction"}
            </DialogTitle>
            <form>
                <DialogContent>

                    <FormGroup>
                        {/*====== Title ================================ */}
                        <FormControl required margin="normal" autoFocus >
                            <InputLabel htmlFor="title">Title</InputLabel>
                            <Input id="title" type="text" />
                        </FormControl>

                        {/*====== Amount and currency ================== */}
                        <FormGroup row>

                            <FormControl required margin="normal" type="number">
                                <InputLabel htmlFor="amount">Amount</InputLabel>
                                <Input id="amount" type="number" />
                            </FormControl>

                            <FormControl margin="normal" >
                                <InputLabel id="select-currency-type">Currency</InputLabel>
                                <Select
                                    labelId="select-currency-type"
                                    id="currency"
                                    value={1}
                                    label="Currency"

                                >
                                    <MenuItem value={1}>$-USD</MenuItem>

                                </Select>
                            </FormControl>

                        </FormGroup>

                        {/*====== Type ================================= */}
                        <FormControl margin="normal" fullWidth >
                            <InputLabel id="select-expense-type">Transasction type</InputLabel>
                            <Select variant="standard"

                                labelId="select-expense-type"
                                id="expense-type"
                                defaultValue={"expense"}
                                label="expense type"

                            >
                                <MenuItem value={"expense"}>Expense</MenuItem>
                                <MenuItem value={"income"}>Income</MenuItem>

                            </Select>
                        </FormControl>



                    </FormGroup>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => props.openClose(false)} >
                        Disagree
                    </Button>
                    <Button type="submit" variant="contained" autoFocus>
                        Agree
                    </Button>

                </DialogActions>
            </form>
        </>
    )
}

export default AddTransactionFrom
