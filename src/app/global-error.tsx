'use client';

// Components
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Styles
import { NotFoundContainer } from '@/components/common/StyledComponents';

export default function GlobalError() {
  return (
    <NotFoundContainer maxWidth="xl">
      <Typography variant="h1" fontSize={24}>
        Application Crashed
      </Typography>
      <Typography variant="body1">Please contact the support team or refresh the page.</Typography>
      <Button variant="contained" color="primary" href="/">
        Refresh
      </Button>
    </NotFoundContainer>
  );
}
