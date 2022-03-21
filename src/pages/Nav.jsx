import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import TopNav from '../components/TopNav';
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
import SideNav from '../components/SideNav';

const Nav = () => {
    const navigate = useNavigate();


    //////////<---------------------------->//////////////////


    const handleClick = (e) => {
        e.preventDefault();
        const name = e.target.name;
        navigate(`/home/${name}`);
    };



    return (
        <Box sx={{ display: 'flex' }}>
            <TopNav />
            <SideNav onClick={handleClick} />
            <Box
                component='main'
                sx={{flexGrow: 1, p: 3, pl: 0, boxSizing: 'border-box',height: '100vh',
                    backgroundColor: (theme) => theme.palette.primary.light,
                }}
            >
                <Toolbar />
                {/* outlet to output nested routes */}
                <Outlet />
            </Box>
        </Box>
    );
};

export default Nav;
