'use client';

// Components
import { Box, Container, Paper, styled, Typography } from '@mui/material';

// Footer
export const FooterContainer = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  borderTop: '1px solid',
  borderColor: theme.palette.divider
}));

export const FooterContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  justifyContent: 'space-between',
  gap: theme.spacing(2)
}));

export const FooterLinkContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  flexWrap: 'wrap',
  justifyContent: 'center'
}));

// Empty State
export const EmptyStateContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(8, 4),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2)
}));

export const EmptyStateIconContainer = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  backgroundColor: theme.palette.action.hover,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

// Product Card
export const ProductCardTitle = styled(Typography)(() => ({
  display: '-webkit-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: '1',
  WebkitBoxOrient: 'vertical'
}));

// Not Found
export const NotFoundContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 'auto',
  gap: theme.spacing(1.5)
}));
