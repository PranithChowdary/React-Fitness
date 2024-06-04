import React from 'react';
import { Typography, Button, Grid, Stack, styled } from '@mui/material';

// const StyledContainer = styled(Container)(({ theme }) => ({
//     backgroundImage: `url(/land.jpeg)`, // Assuming the image is in the public folder
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     minHeight: '100vh',
//     minWidth: '200vh',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
// }));

const Content = styled(Stack)(({ theme }) => ({
    backgroundColor: '#79d8f7', 
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
}));

const LandingPage = () => {
    return (
        // <StyledContainer maxWidth="lg">
            <Content spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h1" component="h1" gutterBottom>
                        Fit & Fun: Your AI-Powered Workout Companion
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button variant="contained" size="large" fullWidth href='/login'>
                                Sign In
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" size="large" fullWidth href='/register'>
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Content>
        /* </StyledContainer> */
    );
};

export default LandingPage;
