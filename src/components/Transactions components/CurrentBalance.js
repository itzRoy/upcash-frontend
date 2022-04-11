import { Card, Divider, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'

const style = {
    noDataBox: {
        padding: '10px',
        height: 'auto',
        width: '100%',
        display: "grid",
        placeContent: 'center'
    }
}



function CurrentBalance(props) {

    const [balance, setBalance] = useState({
        income: 0,
        expense: 0,
        balance: 0,
    });

    //check if there is data in props
    let data = props.transactions.length
    useEffect(() => {


        let income = 0
        let expense = 0

        props.transactions.map(transaction => {
            if (transaction.category.type === 'expense') expense += parseInt(transaction.amount)
            if (transaction.category.type === 'income') income += parseInt(transaction.amount)
        })

        let balance = income + (expense * -1)

        setBalance({
            income: income.toFixed(2),
            expense: (expense * -1).toFixed(2),
            balance: balance.toFixed(2),
        });
    }, [props])


    return (
        <Card sx={{
            width: 'auto',
            height: "fit-content",
            backgroundColor: 'rgb(231, 235, 240)',
            padding: "10px",
        }}>


            <Typography variant='h6' color="primary">CurrentBalance</Typography>
            <Divider />
            {data ? <>
                <Box mt={'10px'} display={'flex'}>
                    <Typography flex={1} fontWeight="bold">Income:</Typography>
                    <Typography color={green[700]}>{`${balance.income}`}$</Typography>
                </Box>

                <Box display={'flex'} my={'10px'}>
                    <Typography flexGrow={1} fontWeight="bold">Expense:</Typography>
                    <Typography color={red[700]}>{`${balance.expense}`}$</Typography>
                </Box>
                <Divider>Balance</Divider>

                <Box display={'flex'} justifyContent={'right'}>
                    <Typography variant='h6' color={balance.balance > 0 ? green[700] : red[700]}>{`${balance.balance}`}$</Typography>
                </Box>
            </> :
                <Box sx={style.noDataBox}>
                    <Typography variant={'p'} textAlign="center">No transactions data</Typography>
                </Box>}
        </Card>
    )
}

export default CurrentBalance
