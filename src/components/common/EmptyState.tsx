// Components
import { Typography } from '@mui/material';
import { EmptyStateContainer, EmptyStateIconContainer } from './StyledComponents';

// Icons
import SearchIcon from '@mui/icons-material/Search';

interface EmptyStateProps {
  title: string;
  description?: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <EmptyStateContainer elevation={0}>
      <EmptyStateIconContainer>
        <SearchIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
      </EmptyStateIconContainer>

      <Typography variant="h5" component="h2" fontWeight={600}>
        {title}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500 }}>
        {description}
      </Typography>
    </EmptyStateContainer>
  );
}
