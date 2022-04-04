import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { Box, height, width } from "@mui/system";
import { DateTime } from "luxon";
import DeleteIcon from '@mui/icons-material/Delete';
import Delete from "@mui/icons-material/Delete";
import { useState } from "react";
import EditTransactionFrom from "./editTransactionsForm"


const style = {
  card: {
    height: "50px",
    maxHeight: '100px',

    paddingX: "15px",
    display: "flex",
    flexDirection: 'column',
    alignItems: 'flex-end',
    transition: '500ms',
    my: "3px",

    ":hover": {
      background: '#fff',
      height: '80px'
    }
  },
  delete: {
    ":hover": {
      color: 'red',
      cursor: 'pointer'
    }
  },
  confirmButton: {
    backgroundColor: red[800], ":hover": {
      backgroundColor: green[800]
    }
  },
  edit: {
    fontSize: "0.8rem",
    lineHeight: "25px",
    fontWeight: 800,
    ":hover": {
      color: green[800],
      cursor: 'pointer'
    }
  }
}

const TransactionCard = (props) => {

  // <-----React Function Start-----> //
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // destructure transactions data from props
  const { id, title, amount, note, category, currency, created_at: date } = props.transaction;
  const { name: categoryName, type } = props.transaction.category

  // format date to human Readable
  const dateTime = DateTime.fromISO(date)
  const humanReadable = dateTime.toLocaleString(DateTime.DATETIME_MED);


  const setColor = (type) => {
    if (type === 'expense') return "error";
    return green[800]
  }

  const handleClickOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };


  return (
    <>
      <Card
        sx={style.card}
      >
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>

          {/*=== title & Category ===*/}
          <Box flexGrow={1} height={'50px'} p={'3px'}>
            <Typography overflow={'hidden'} fontWeight={800} >{title}</Typography>
            <Typography fontSize={'0.8rem'} color={'#5B5B5B'} >{`category: ${categoryName}`}</Typography>
          </Box>

          {/*=== amount & Date ===*/}
          <Box height={'50px'} p={'3px'} >
            <Typography textAlign={'right'} fontWeight={600} color={setColor(type)}>{type == 'expense' ? `${amount * -1}$` : `${amount}$`}</Typography>
            <Typography fontSize={'0.8rem'} color={'#5B5B5B'} >{humanReadable}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>

          {/*=== Note ===*/}
          <Typography sx={{ flexGrow: 0.99 }} fontSize={'0.8rem'} color={'black'}>Note:{note}</Typography>


          {/*=== edit icon ===*/}
          <Typography onClick={() => setOpenEdit(true)} sx={style.edit}>Edit</Typography>

          {/*=== Delete icon ===*/}
          <Delete onClick={() => setOpenDeleteDialog(true)} sx={style.delete} />

        </Box>

      </Card>


      {/* ==================== MODAL ==================== */}

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle color={red[700]} id="confirm-delete-dialog">
          {"Confirm Delete Transaction"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the Transaction: <Typography fontWeight={600} color={green[900]} component={'span'}> {` ${title} `}</Typography>? This Action can not be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpenDeleteDialog(false)}>
            Cancel
          </Button>
          <Button variant="contained" sx={style.confirmButton} onClick={() => props.delete(id)} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <EditTransactionFrom open={openEdit} openClose={setOpenEdit} data={props.transaction} update={props.update} />
    </>
  );
};

export default TransactionCard;
