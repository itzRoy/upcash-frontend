import React from "react";
import Logo from "./Logo";
import { useNavigate } from 'react-router-dom';

import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button
} from '@mui/material';

const TopNav = () =>{


    const navigate = useNavigate();


    return(
        <AppBar
                position='fixed'
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: (theme) => theme.palette.primary.dark,
                }}
            >

                <Toolbar>

                    <Logo />

                    <Box>
                        <Typography
                            marginRight={3}
                            variant='body1'
                            display='inline'
                        >
                            username
                        </Typography>
                        <Button
                            onClick={() => {
                                navigate('/');
                            }}
                            variant='contained'
                            color='error'
                        >
                            log out
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
    )
}


export default TopNav;