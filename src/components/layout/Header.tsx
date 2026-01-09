// Components
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// Icons
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Header() {
  return (
    <AppBar position="sticky" color="transparent" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <HealthAndSafetyIcon color="primary" fontSize="large" sx={{ mr: 1 }} />

            <Typography variant="h6">Health Supplements</Typography>
          </Box>

          <IconButton aria-label="Shopping cart Icon" color="primary" size="large">
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
