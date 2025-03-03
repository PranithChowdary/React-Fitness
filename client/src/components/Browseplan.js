import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, 
  Box,
  Typography, 
  Button, 
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
 } from '@mui/material';

const SavedPlans = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getWorkoutPlans');
        setPlans (response.data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };
    fetchPlans();
  }, []);

  const handleOpen = (plan) => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPlan(null);
  };

  const handleArchive = async (planId) => {
    try {
      await axios.post('http://localhost:4000/archiveWorkoutPlan', { planId });
      setPlans(plans.filter(plan => plan._id !== planId)); // Remove the archived plan from the list
    } catch (error) {
      console.error('Error archiving plan:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Saved Workout Plans
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {plans.map((plan, index) => (
            <Box key={index} m={2} p={2} border={1} borderRadius={4} width={400}>
              <Typography variant="h6">{plan.muscleGroup}</Typography>
              <Button variant="contained" onClick={() => handleOpen(plan)} sx={{ mt: 2, fontWeight: 'bold' }}>
                View Plan
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleArchive(plan._id)}
                sx={{ mt: 2, ml: 2, fontWeight: 'bold' }}
              >
                Archive
              </Button>
            </Box>
          ))}
        </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, bgcolor: 'background.paper', p: 4, boxShadow: 24 }}>
          {selectedPlan && (
            <div>
              <Typography variant="h6">{selectedPlan.muscleGroup}</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Day</b></TableCell>
                      <TableCell><b>Exercise</b></TableCell>
                      <TableCell><b>Sets</b></TableCell>
                      <TableCell><b>Reps</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(selectedPlan.plan).map(([day, { exercises }]) => (
                      <TableRow key={day}>
                        <TableCell>{day}</TableCell>
                        <TableCell>
                          {exercises.map((exercise, index) => (
                            typeof exercise === 'string' ? (
                              exercise
                            ) : (
                              <div key={index}>{exercise.name}</div>
                            )
                          ))}
                        </TableCell>
                        <TableCell>
                          {exercises.map((exercise, index) => (
                            typeof exercise === 'string' ? (
                              ""
                            ) : (
                              <div key={index}>{exercise.sets}</div>
                            )
                          ))}
                        </TableCell>
                        <TableCell>
                          {exercises.map((exercise, index) => (
                            typeof exercise === 'string' ? (
                              ""
                            ) : (
                              <div key={index}>{exercise.reps}</div>
                            )
                          ))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </Box>
      </Modal>
      </Box>
    </Container>
  );
};

export default SavedPlans;