import { Card, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { Box } from "@mui/system";
import { DateTime } from "luxon";

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
        sx={{
          height: "50px",
          paddingX: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: "3px",
        }}
      >
        <Box width={'50%'}>
          <Typography overflow={'hidden'} fontWeight={800} >{title}</Typography>
          <Typography fontSize={'0.8rem'} color={'#5B5B5B'} >{`category: ${categoryName}`}</Typography>
        </Box>
        <Typography flexGrow={0.5} color={setColor(type)}>{type == 'expense' ? `-${amount}$` : `${amount}$`}</Typography>

        <Typography>{humanReadable}</Typography>

      </Card>
    </>
  );
};

export default TransactionCard;
