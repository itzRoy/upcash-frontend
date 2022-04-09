import React, { useState } from 'react';
import { TableBody, TableCell, TableRow, Dialog, Button, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';

const AdminDachboardReadonly = (props) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handledelete = () => {
        props.delete(props.data.id)
        setOpen(false)
    }
    const style = ({
        deleteButton: {
            color: "black",
            '&:hover': {
                color: "red"
            },
        },
        EditButton: {
            color: "black",
            '&:hover': {
                color: "blue"
            },
        },
    });

    return (
        <>
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell >{props.data.id}</TableCell>
                            <TableCell >{props.data.username}</TableCell>
                            <TableCell>*New password*</TableCell>
                            <TableCell>
                                <DeleteOutlinedIcon sx={style.deleteButton} onClick={handleClickOpen} />
                                <EditIcon sx={style.EditButton} onClick={(event) => props.editclick(event, props.data)} />
                            </TableCell>
                </TableRow>
            </TableBody>

            <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this Admin?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handledelete} autoFocus>Agree</Button>
                </DialogActions>
            </Dialog>
        </>);
};

export default AdminDachboardReadonly;