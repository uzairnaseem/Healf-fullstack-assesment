// Packages
import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';

// Components
import Box from '@mui/material/Box';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Theme
import theme from '../../theme';

// Styles
import './globals.css';

export const metadata: Metadata = {
  title: 'Healf Full Stack Assesment',
  description: 'Healf Full Stack Assesment'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              {children}
              <Footer />
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
