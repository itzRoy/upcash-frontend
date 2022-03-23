import { Card, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { Box, height } from "@mui/system";
import { DateTime } from "luxon";
import DeleteIcon from '@mui/icons-material/Delete';
import Delete from "@mui/icons-material/Delete";


const style = {
  height: "50px",
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
}

const TransactionCard = (props) => {
  // <-----React Function Start-----> //
  const { id, title, amount, note, category, currency, created_at: date } = props.transaction;
  const { name: categoryName, type } = props.transaction.category

  // format date to human Readable
  const dateTime = DateTime.fromISO(date)
  const humanReadable = dateTime.toLocaleString(DateTime.DATETIME_MED);

  const setColor = (type) => {
    if (type === 'expense') return "error";
    return green[800]
  }

  return (
    <>
      <Card
        sx={style}
      >
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Box flexGrow={1} height={'50px'} p={'3px'}>
            <Typography overflow={'hidden'} fontWeight={800} >{title}</Typography>
            <Typography fontSize={'0.8rem'} color={'#5B5B5B'} >{`category: ${categoryName}`}</Typography>
          </Box>
          <Box height={'50px'} p={'3px'} >
            <Typography textAlign={'right'} fontWeight={600} color={setColor(type)}>{type == 'expense' ? `-${amount}$` : `${amount}$`}</Typography>
            <Typography fontSize={'0.8rem'} color={'#5B5B5B'} >{humanReadable}</Typography>
          </Box >
        </Box>
        <Box>
          <Delete></Delete>
        </Box>

      </Card>
    </>
  );
};

export default TransactionCard;
