import React, { useState, useEffect } from 'react';
import { Button, IconButton, Toolbar, Box, Tooltip, Avatar, AppBar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CustomDrawer from './Drawer';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import quotes from './qoutes.json';
import SearchExercises from './SearchExcercises';
import Exercises from '../components/Exercises';
import Buttons from './buttons';
import UserDetails from './UserDetails';
import useravatar from '../assets/images/user.jpg';

const Home = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [quote, setQuote] = useState('');
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const pageClick = (path) => {
        navigate(path);
    };

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
            message: 'Hi {previousValue}, nice to meet you! How can I assist you today?',
            trigger: '4',
        },
        {
            id: '4',
            options: [
                { value: 'workout', label: 'Workout Plan', trigger: 'workout' },
                { value: 'progress', label: 'Progress Tracker', trigger: 'progress' },
                { value: 'diet', label: 'Diet Plan', trigger: 'diet' },
                { value: 'user details', label: 'User Details', trigger: 'user details' },
                { value: 'End', label: 'End', trigger: '6' },
            ],
        },
        {
            id: 'workout',
            message: 'You can create and view your workout plans here. /progress',
            trigger: '5',
        },
        {
            id: 'progress',
            message: 'You can track your progress here.',
            trigger: '5',
        },
        {
            id: 'diet',
            message: 'You can create and view your diet plans here.',
            trigger: '5',
        },
        {
            id: 'quote',
            message: 'Here is a motivational quote for you: "{quote}"',
            trigger: '5',
        },
        {
            id: 'user details',
            component: (
                <UserDetails />
            ),
            trigger: '5',
        },
        {
            id: '5',
            component: (
                <Buttons pageClick={pageClick} />
            ),
            trigger:'6',
        },
        {
            id: '6',
            message: 'How can I assist you further?',
            trigger: '4',
        },
        {
            id: '7',
            message: 'Thank you for using our services. Have a great day!',
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

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

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
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={useravatar} />
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
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Button textAlign="center" onClick={() => pageClick('/profile')}>Profile</Button>
                                <br />
                                <Button textAlign="center" onClick={handleLogoutClick}>Logout</Button>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <br />
            <br />
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
