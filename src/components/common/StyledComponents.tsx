'use client';

// Components
import {
  accordionDetailsClasses,
  accordionSummaryClasses,
  Box,
  Card,
  CardMedia,
  CardProps,
  Container,
  Paper,
  styled,
  Typography
} from '@mui/material';
import { ElementType } from 'react';

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
export const ProductCardContainer = styled(Card)<CardProps & { component?: ElementType }>(() => ({
  boxShadow: 'none',
  borderRadius: '4px'
}));

export const ProductCardTitle = styled(Typography)(() => ({
  fontSize: '0.9rem',
  display: '-webkit-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: '1',
  WebkitBoxOrient: 'vertical'
}));

export const ProductCardImage = styled(CardMedia)(({ theme }) => ({
  height: '270px',
  backgroundColor: theme.palette.grey[100],
  position: 'relative'
}));

export const ProductCardRatingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  margin: theme.spacing(0.3, 0)
}));

// Product List Container
export const ProductListCont = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3)
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

// Sort Controls
export const SortControlsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: theme.spacing(2)
}));

// Filter Panel
export const FilterPanelContainer = styled(Paper)(() => ({
  maxHeight: screen.height * 0.8,
  overflowY: 'auto',
  overflowX: 'hidden',
  [`& .${accordionSummaryClasses.root}, & .${accordionDetailsClasses.root}`]: { padding: 0 }
}));

export const FilterPanelHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1)
}));

export const FilterPanelTitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1)
}));

// Active Filters
export const ActiveFiltersContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: theme.spacing(1)
}));
