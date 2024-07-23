import React, { useState, useEffect } from 'react';
import { IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CustomDrawer from './Drawer';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { Avatar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import styled from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import quotes from './qoutes.json';
import SearchExercises from './SearchExcercises';
import Exercises from '../components/Exercises';


const Home = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [quote, setQuote] = useState('');
    const navigate = useNavigate();

    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const steps = [
        {
            id: '1',
            message: 'What is your name?',
            trigger: '2',
        },
        {
            id: '2',
            user: true,
            trigger: '3',
        },
        {
            id: '3',
            message: 'Hi {previousValue}, nice to meet you!',
            end: true,
        }
    ];

    const GradientHeading = styled.h1`
        background: linear-gradient(to right, #2E3192, #1BFFFF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
    `;

    const [exercises, setExercises] = useState([]);
    const [bodyPart, setBodyPart] = useState('all');


    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const pageClick = (path) => {
        navigate(path);
    };

    useEffect(() => {
        if (quotes.length === 0) {
            console.log('No quotes found');
            return;
        }

        const getRandomQuote = () => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            return quotes[randomIndex];
        };

        const quoteText = getRandomQuote().quote;
        setQuote(quoteText);
    }, []);

    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                <IconButton color="inherit" onClick={toggleDrawer}>
                    <MenuIcon sx={{ fontSize: '30px' }} />
                </IconButton>
                <CustomDrawer open={drawerOpen} onClose={toggleDrawer} pageClick={pageClick} />
                <Box sx={{ml: 165}}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                </Toolbar>
            </AppBar>
            <br></br>
            <br></br>
            <div>
                <GradientHeading varient="h3">{quote}</GradientHeading>
                <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
                <Exercises setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} />
                <ChatBot steps={steps} floating='true' />
            </div>
        </>
    );
};

export default Home;
