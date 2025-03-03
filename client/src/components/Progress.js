import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Checkbox, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const WorkoutProgress = () => {
    const [workoutData, setWorkoutData] = useState([]);
    const [workoutStats, setWorkoutStats] = useState([]);
    const [currentWeek, setCurrentWeek] = useState(0); // Track current week (0 to 3 for 4 weeks)
    const [completedExercises, setCompletedExercises] = useState({});
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get('http://localhost:4000/getWorkoutPlans');
                if (response.data.length === 0) {
                    setError('No plans available. Please create a workout plan to track progress.');
                } else {
                    setPlans(response.data);
                    setError('');
                }
            } catch (error) {
                console.error('Error fetching plans:', error);
                setError('Error fetching plans. Please try again later.');
            }
        };

        fetchPlans();
    }, []);

    useEffect(() => {
        if (selectedPlan) {
            const fetchPlanData = async () => {
                try {
                    const response = await axios.get('http://localhost:4000/getWorkoutPlans');
                    const primaryPlan = response.data.find(plan => plan._id === selectedPlan);

                    if (!primaryPlan) {
                        console.error('Selected plan not found in workout plans.');
                        return;
                    }

                    // Process workout data
                    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                    const weeklyData = weekDays.map(day => ({
                        day,
                        exercises: primaryPlan.plan[day]?.exercises || [],
                    }));

                    setWorkoutData(weeklyData);

                    // Calculate exercise stats
                    const exerciseStats = {};
                    weeklyData.forEach(({ exercises }) => {
                        exercises.forEach(exercise => {
                            if (typeof exercise === 'string') return;
                            const { name } = exercise;
                            exerciseStats[name] = (exerciseStats[name] || 0) + 1;
                        });
                    });

                    const formattedStats = Object.keys(exerciseStats).map((name) => ({
                        name,
                        value: exerciseStats[name],
                    }));

                    setWorkoutStats(formattedStats);
                } catch (error) {
                    console.error('Error fetching selected plan data:', error);
                }
            };

            fetchPlanData();
        }
    }, [selectedPlan]);

    const handleCheckboxChange = (day) => {
        setCompletedExercises(prev => ({
            ...prev,
            [day]: !prev[day]
        }));
    };

    const currentWeekData = workoutData.slice(currentWeek * 7, (currentWeek + 1) * 7);

    const totalDays = Object.keys(workoutData).length;
    const completedDaysCount = Object.values(completedExercises).filter(Boolean).length;
    const progressPercentage = (completedDaysCount / totalDays) * 100;

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Workout Progress
            </Typography>
            {error ? (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6" color="error">
                        {error}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => navigate('/workoutplan')} sx={{ mt: 2, fontWeight: 'bold' }}>
                        Create Workout Plan
                    </Button>
                </Box>
            ) : (
                <>
                    {plans.length > 0 ? (
                        <>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <InputLabel id="select-plan-label">Select Plan</InputLabel>
                                <Select
                                    labelId="select-plan-label"
                                    value={selectedPlan}
                                    label="Select Plan"
                                    onChange={(e) => setSelectedPlan(e.target.value)}
                                >
                                    {plans.map((plan) => (
                                        <MenuItem key={plan._id} value={plan._id}>
                                            {plan.muscleGroup}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {selectedPlan && (
                                <>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="h6">Workout Breakdown</Typography>
                                            <PieChart width={1000} height={400}>
                                                <Pie
                                                    data={workoutStats}
                                                    cx={300}
                                                    cy={200}
                                                    labelLine={false}
                                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                    outerRadius={150}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {workoutStats.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                                <Legend layout="vertical" align="right" verticalAlign="middle" />
                                            </PieChart>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                                                <CircularProgress variant="determinate" value={progressPercentage} size={100} sx={{ mr: 2 }} />
                                                <Typography variant="h6">
                                                    Weekly Progress: {Math.round(progressPercentage)}%
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h6">Weekly Plan</Typography>
                                            <Table stickyHeader={true}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align='center'><b>Day</b></TableCell>
                                                        <TableCell align='center'><b>Exercise</b></TableCell>
                                                        <TableCell align='center'><b>Sets</b></TableCell>
                                                        <TableCell align='center'><b>Reps</b></TableCell>
                                                        <TableCell align='center'><b>Done</b></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {currentWeekData.map(({ day, exercises }) => (
                                                        <React.Fragment key={day}>
                                                            {exercises.map((exercise, index) => (
                                                                <TableRow key={index} hover={true}>
                                                                    {index === 0 && (
                                                                        <TableCell align='center' rowSpan={exercises.length || 1}>{day}</TableCell>
                                                                    )}
                                                                    <TableCell align='center'>
                                                                        {typeof exercise === 'string' ? exercise : exercise.name}
                                                                    </TableCell>
                                                                    <TableCell align='center'>
                                                                        {typeof exercise === 'string' ? '' : exercise.sets}
                                                                    </TableCell>
                                                                    <TableCell align='center'>
                                                                        {typeof exercise === 'string' ? '' : exercise.reps}
                                                                    </TableCell>
                                                                    {index === 0 && (
                                                                        <TableCell align='center' rowSpan={exercises.length || 1}>
                                                                            <Checkbox
                                                                                checked={completedExercises[day] || false}
                                                                                onChange={() => handleCheckboxChange(day)}
                                                                            />
                                                                        </TableCell>
                                                                    )}
                                                                </TableRow>
                                                            ))}
                                                        </React.Fragment>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                        </>
                    ) : (
                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Typography variant="h6" color="error">
                                No plans available. Please create a workout plan to track progress.
                            </Typography>
                            <Button variant="contained" color="primary" onClick={() => navigate('/workoutplan')} sx={{ mt: 2 }}>
                                Create Workout Plan
                            </Button>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default WorkoutProgress;