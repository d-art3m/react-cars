import { Box, LinearProgress } from '@mui/material';

function Preloader() {
  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <LinearProgress />
    </Box>
  );
}

export default Preloader;