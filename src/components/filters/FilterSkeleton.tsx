// Components
import Skeleton from '@mui/material/Skeleton';

// Others
import { FilterPanelContainer, FilterPanelHeaderContainer } from '../common/StyledComponents';

export default function FilterSkeleton() {
  return (
    <FilterPanelContainer elevation={0}>
      <FilterPanelHeaderContainer>
        <Skeleton variant="text" width={100} height={32} />
        <Skeleton variant="rounded" width={80} height={28} />
      </FilterPanelHeaderContainer>

      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} variant="text" width={100} height={24} sx={{ mt: 1.5 }} />
      ))}
    </FilterPanelContainer>
  );
}
