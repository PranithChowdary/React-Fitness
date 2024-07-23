import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Collapse,
    IconButton,
    Box,
    Button,
    Typography } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import dietPlan from '../assets/diet.json';

function DietPlan(){
    const [openRows, setOpenRows] = useState({});

    const handleRowClick = (day) => {
        setOpenRows((prev) => ({ ...prev, [day]: !prev[day] }));
    };

    const renderMeals = (meals) => {
        return meals.map((meal, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle1"><b>{meal.name}</b></Typography>
                <Typography variant="body2">
                    {meal.items.join(', ')}
                </Typography>
                <Typography variant="caption">Calories: {meal.calories}</Typography>
            </Box>
        ));
    };
    return (
        <>
            <TableContainer sx={{ display:'flex' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell><b>Day</b></TableCell>
                            <TableCell><b>Meals</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(dietPlan.dietPlan).map(([day, { meals }]) => (
                            <React.Fragment key={day}>
                                <TableRow onClick={() => handleRowClick(day)}>
                                    <TableCell>
                                        <IconButton size="small">
                                            {openRows[day] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{day}</TableCell>
                                    <TableCell>
                                        {meals.map((meal) => meal.name).join(', ')}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                                        <Collapse in={openRows[day]} timeout="auto" unmountOnExit>
                                            <Box margin={1}>
                                                {renderMeals(meals)}
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            <br/>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button variant="contained">Generate Another Plan</Button>
                    <Button variant="contained">Save Plan</Button>
            </Box>
        </>
        );
    };
export default DietPlan;