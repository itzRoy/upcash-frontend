import React from 'react';
import { TableBody, TableCell, TableRow, Select, TextField, MenuItem } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
const AdminDachboardEdit = (props) => {

    const style = ({
        saveButton: {
            color: "black",
            '&:hover': {
                color: "green"
            },
        },
        cancelButton: {
            color: "black",
            '&:hover': {
                color: "red"
            },
        },

    });

    return (
        <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell >{props.data.id}</TableCell>
                <TableCell >
                    <TextField
                        type='text'
                        name='name'
                        defaultValue={props.data.name}
                        onChange={props.changeData}
                        required />
                </TableCell>
                <TableCell >
                    <Select name="type" onChange={props.changeData} defaultValue={props.data.type}>
                        <MenuItem value={'income'}>income</MenuItem>
                        <MenuItem value={'expense'}>expense</MenuItem>
                    </Select>
                </TableCell>
                <TableCell>
                    <ClearIcon sx={style.cancelButton} onClick={props.cancel} />
                    <SaveIcon sx={style.saveButton} onClick={props.save} />
                </TableCell>
            </TableRow>
        </TableBody>
    );
};
export default AdminDachboardEdit;