import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'bef2d0fefbmsh76da619c07b83c5p1745bdjsnbeddb3c1d98b',
          'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const bodyPartsData = await response.json();

        // Ensure bodyPartsData is an array
        setBodyParts(['all', ...Array.isArray(bodyPartsData) ? bodyPartsData : []]);
      } catch (error) {
        console.error('Error fetching body parts data:', error);
      }
    };

    fetchExercisesData();
  }, []);


  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textalign="center">
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Box sx={{ position: 'relative', width: '100%', p: '20px', display: 'flex', justifyContent: 'center' }}>
        {bodyParts.map((part) => (
          <Button
            key={part}
            onClick={() => setBodyPart(part)}
            sx={{ m: 1, bgcolor: bodyPart === part ? '#FF2625' : '#FFF', color: bodyPart === part ? '#FFF' : '#000' }}
          >
            {part}
          </Button>
        ))}
      </Box>
    </Stack>
  );
};

export default SearchExercises;