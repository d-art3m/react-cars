import { AppBar, Toolbar, Typography, Link } from '@mui/material';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h5"
          color="inherit"
          noWrap
          component="a"
          href="/"
          sx={{ flexGrow: 1, textDecoration: 'none' }}
        >
          CARS
        </Typography>
        <Link
          variant="button"
          color="inherit"
          href="https://github.com/d-art3m/react-cars"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ textDecoration: 'none' }}
        >
          About
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
