// Components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {
  FooterContainer,
  FooterContentContainer,
  FooterLinkContainer
} from '../common/StyledComponents';

export default function Footer() {
  return (
    <FooterContainer>
      <Container maxWidth="xl" component="footer">
        <FooterContentContainer>
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Health Supplements. All rights reserved.
            </Typography>
          </Box>

          <FooterLinkContainer>
            <Link href="#" underline="hover" color="text.secondary" variant="body2">
              About
            </Link>
            <Link href="#" underline="hover" color="text.secondary" variant="body2">
              Contact
            </Link>
            <Link href="#" underline="hover" color="text.secondary" variant="body2">
              Privacy
            </Link>
            <Link href="#" underline="hover" color="text.secondary" variant="body2">
              Terms
            </Link>
          </FooterLinkContainer>
        </FooterContentContainer>
      </Container>
    </FooterContainer>
  );
}
