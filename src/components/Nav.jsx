import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
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

const Nav = () => {
    const navigate = useNavigate();

    const [page, setPage] = useState('transaction');

    const drawerWidth = 240;

    const handleClick = (e) => {
        e.preventDefault();
        const name = e.target.name;
        setPage(name);
        navigate(`/home/${name}`);
        console.log(page);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position='fixed'
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: (theme) => theme.palette.primary.dark,
                }}
            >
                <Toolbar>
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
                                onClick={handleClick}
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
                                onClick={handleClick}
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
                                onClick={handleClick}
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
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    p: 3,
                    pl: 0,
                    boxSizing: 'border-box',
                    height: '100vh',
                    backgroundColor: (theme) => theme.palette.primary.light,
                }}
            >
                <Toolbar />

                <Outlet />
            </Box>
        </Box>
    );
};

export default Nav;
