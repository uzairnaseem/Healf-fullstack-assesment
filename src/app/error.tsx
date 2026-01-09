'use client';

// Components
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Styles
import { NotFoundContainer } from '@/components/common/StyledComponents';

export default function Error() {
  return (
    <NotFoundContainer maxWidth="xl">
      <Typography variant="h1" fontSize={24}>
        Failed to load products!
      </Typography>
      <Typography variant="body1">Please refresh the page or try again later.</Typography>
      <Button variant="contained" color="primary" href="/">
        Refresh
      </Button>
    </NotFoundContainer>
  );
}
