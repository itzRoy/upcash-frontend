import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { Box, height, width } from "@mui/system";
import { DateTime } from "luxon";
import DeleteIcon from '@mui/icons-material/Delete';
import Delete from "@mui/icons-material/Delete";
import { useState } from "react";


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
  }
}

const TransactionCard = (props) => {

  // <-----React Function Start-----> //
  const [open, setOpen] = useState(false);

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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          <Typography fontSize={'0.8rem'} color={'black'}>Note:{note}</Typography>

          {/*=== Delete icon ===*/}
          <Delete onClick={handleClickOpen} sx={style.delete} />

        </Box>

      </Card>


      {/* ==================== MODAL ==================== */}

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle color={red[700]} id="responsive-dialog-title">
          {"Confirm Delete Transaction"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the Transaction: <Typography fontWeight={600} color={green[900]} component={'span'}> {` ${title} `}</Typography>? This Action can not be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" sx={style.confirmButton} onClick={() => props.delete(id)} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default TransactionCard;
