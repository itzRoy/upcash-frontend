import React from 'react';
import { TableBody, TableCell, TableRow, Grid } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
const AdminDachboardEdit = (props) => {
    return (
        <TableBody>

            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <Grid container>
                    <Grid item xs={3}>
                        <TableCell >{props.data.id}</TableCell>
                    </Grid>
                    <Grid item xs={3}>
                        <TableCell >
                            <input type='text'
                                name='name'
                                defaultValue={props.data.name}
                                onChange={props.changeData}
                                required
                            ></input>
                        </TableCell>
                    </Grid>
                    <Grid item xs={3}>
                        <TableCell >
                            <select name="type" onChange={props.changeData}>
                                <option value="income">income</option>
                                <option value="expense">expense</option>
                            </select>
                        </TableCell>
                    </Grid>
                    <Grid item xs={3}>
                        <TableCell>
                            <ClearIcon style={{ color: "yellow"}} onClick={props.cancel} />
                            <SaveIcon style={{ color: "white"}} onClick={props.save} />
                        </TableCell>
                    </Grid>
                </Grid>
            </TableRow>

        </TableBody>
    );
};

export default AdminDachboardEdit;