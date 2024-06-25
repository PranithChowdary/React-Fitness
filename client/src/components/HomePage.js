import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CustomDrawer from './Drawer';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import styled from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import quotes from '../Data/qoutes.json';

const Home = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [quote, setQuote] = useState('');
    const navigate = useNavigate();

    const steps=[
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
    align-text : center;
    `;

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

        const typingDelay = 50;
        const quoteText = getRandomQuote().quote;
        let charIndex = 0;

        const typingEffect = setInterval(() => {
            if (charIndex === quoteText.length) {
                clearInterval(typingEffect);
            } else {
                setQuote((prevQuote) => prevQuote + quoteText.charAt(charIndex));
                charIndex++;
            }
        }, typingDelay);

        return () => clearInterval(typingEffect);
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
        <GradientHeading style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>{quote}</GradientHeading>
        <ChatBot steps={steps} floating='True'/>
        </div>
    </>
    );
};



export default Home;