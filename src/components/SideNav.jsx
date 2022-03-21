import React from 'react';
import { useState, useEffect } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    Drawer,
    ListItem,
    List,
} from '@mui/material';

const SideNav = (props) =>{

    const [page, setPage] = useState('transaction');


    //////////////////////// handle buttons color change

    useEffect(() => {
        setPage(window.location.pathname.split('/').pop());
        console.log(page);
    })

    const drawerWidth = 200;

    return(
        <Drawer
        variant='permanent'
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: (theme) => theme.palette.primary.light,
                border: 'none',
            },
        }}
    >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
            <List style={{ marginTop: '50%' }}>
                <ListItem style={{ padding: '.5vh 0' }}>
                    <Button
                        name='transaction'
                        onClick={props.onClick}
                        style={{ borderRadius: 0, padding: '1rem' }}
                        fullWidth
                        size='large'
                        disableElevation
                        variant='contained'
                        color={
                            page === 'transaction'
                                ? 'secondary'
                                : 'error'
                        }
                    >
                        transactions
                    </Button>
                </ListItem>
                <ListItem style={{ padding: '.5vh 0' }}>
                    <Button
                        name='reports'
                        onClick={props.onClick}
                        style={{ borderRadius: 0, padding: '1rem' }}
                        fullWidth
                        size='large'
                        disableElevation
                        variant='contained'
                        color={
                            page === 'reports' ? 'secondary' : 'error'
                        }
                    >
                        reports
                    </Button>
                </ListItem>
                <ListItem style={{ padding: '.5vh 0' }}>
                    <Button
                        name='profitgoal'
                        onClick={props.onClick}
                        style={{ borderRadius: 0, padding: '1rem' }}
                        fullWidth
                        size='large'
                        disableElevation
                        variant='contained'
                        color={
                            page === 'profitgoal'
                                ? 'secondary'
                                : 'error'
                        }
                    >
                        profit goals
                    </Button>
                </ListItem>
            </List>
        </Box>
    </Drawer>
    )
}

export default SideNav;