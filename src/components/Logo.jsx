import React from 'react';
import {
    Box,
    Typography,
    Button
} from '@mui/material';

const Logo = () => {
    return(
    <Box component='div' sx={{ flexGrow: 1 }}>
        <Button>
            <Typography
                color='common.white'
                variant='h6'
                fontWeight={400}
                component='h1'
            >
                up
            </Typography>
            <Typography
                color='secondary'
                display='inline'
                variant='h6'
            >
                CASH
            </Typography>
        </Button>
    </Box>
    )
}

export default Logo;