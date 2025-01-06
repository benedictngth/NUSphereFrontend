import { Box, CircularProgress, Typography } from '@mui/material';

interface spinnerProps {
  text:string
}
export const Spinner = ({text} : spinnerProps ) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full screen center alignment
      }}
    >
      <CircularProgress />
      <Typography sx={{ml:1}}variant="h6">{text}</Typography>
    </Box>
  );
}

