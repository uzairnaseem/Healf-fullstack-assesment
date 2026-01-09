// Components
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Styles
import { NotFoundContainer } from '@/components/common/StyledComponents';

export default function NotFound() {
  return (
    <NotFoundContainer maxWidth="xl">
      <Typography variant="h1" fontSize={24}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1">The page you are looking for does not exist.</Typography>
      <Button variant="contained" color="primary" href="/">
        Go to Home
      </Button>
    </NotFoundContainer>
  );
}
