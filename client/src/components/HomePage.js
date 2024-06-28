import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CustomDrawer from './Drawer';
import { useNavigate } from 'react-router-dom';
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
                <IconButton color="inherit" onClick={toggleDrawer} sx={{ mr: 170 }}>
                    <MenuIcon sx={{ fontSize: '30px' }} />
                </IconButton>
                <CustomDrawer open={drawerOpen} onClose={toggleDrawer} pageClick={pageClick} />
            </AppBar>
            <div>
                <GradientHeading>{quote}</GradientHeading>
                <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
                <Exercises setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} />
                <ChatBot steps={steps} floating='true' />
            </div>
        </>
    );
};

export default Home;
