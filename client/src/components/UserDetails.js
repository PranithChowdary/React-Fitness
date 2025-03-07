import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const UserDetails = ({ pageClick }) => {
    const [userDetails, setUserDetails] = useState({});
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [dietPlans, setDietPlans] = useState([]);
    const [error, setError] = useState('');
    const useremail = localStorage.getItem('user-email');
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get('https://react-fitness-backend-xq9u.onrender.com/getUserProfile', {
                    params: { email: useremail },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUserDetails(userResponse.data);

                const workoutResponse = await axios.get('https://react-fitness-backend-xq9u.onrender.com/getWorkoutPlans', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setWorkoutPlans(workoutResponse.data);

                const dietResponse = await axios.get('https://react-fitness-backend-xq9u.onrender.com/getDietPlans', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setDietPlans(dietResponse.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data. Please try again later.');
            }
        };

        fetchUserData();
    }, []);

    return (
        <Box sx={{ p: 2 }}>
            {error ? (
                <Typography variant="body1" color="error">
                    {error}
                </Typography>
            ) : (
                <>
                    <Typography variant="h5" gutterBottom>
                        User Details
                    </Typography>
                    <Typography variant="body1">Name: {userDetails.username}</Typography>
                    <Typography variant="body1">Email: {userDetails.email}</Typography>

                    <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                        Workout Plans
                    </Typography>
                    {workoutPlans.length > 0 ? (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Muscle Group</b></TableCell>
                                        <TableCell><b>Plan Details</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {workoutPlans.map((plan) => (
                                        <TableRow key={plan._id}>
                                            <TableCell>{plan.muscleGroup}</TableCell>
                                            <TableCell>
                                                {Object.entries(plan.plan).map(([day, { exercises }]) => (
                                                    <div key={day}>
                                                        <b>{day}:</b>
                                                        <ul>
                                                            {exercises.map((exercise, index) => (
                                                                <li key={index}>
                                                                    {typeof exercise === 'string' ? exercise : `${exercise.name} - ${exercise.sets} sets of ${exercise.reps} reps`}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography variant="body1">No workout plans available.</Typography>
                    )}

                    <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                        Diet Plans
                    </Typography>
                    {dietPlans.length > 0 ? (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Diet Plan</b></TableCell>
                                        <TableCell><b>Details</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dietPlans.map((plan) => (
                                        <TableRow key={plan._id}>
                                            <TableCell>{plan.name}</TableCell>
                                            <TableCell>{plan.details}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography variant="body1">No diet plans available.</Typography>
                    )}
                </>
            )}
        </Box>
    );
};

export default UserDetails;