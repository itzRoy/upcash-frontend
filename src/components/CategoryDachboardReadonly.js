import React from 'react';
import { TableBody, TableCell, TableRow, Grid } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';

const adminDachboardReadonly = (props) => {

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
                        <TableCell >{props.data.name}</TableCell>
                    </Grid>
                    <Grid item xs={3}>
                        <TableCell>{props.data.type}</TableCell>
                    </Grid>
                    <Grid item xs={3}>
                        <TableCell>
                            <DeleteOutlinedIcon style={{ color: "red" }} onClick={() => props.deleteBtn(props.data.id)} />
                            <EditIcon style={{ color: "white" }} onClick={(event) => props.editclick(event, props.data)} />
                        </TableCell>
                    </Grid>
                </Grid>
            </TableRow>
        </TableBody>
    );
};

export default adminDachboardReadonly;