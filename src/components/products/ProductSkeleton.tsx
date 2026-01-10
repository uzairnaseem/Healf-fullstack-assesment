// Components
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

// Styled Components
import { ProductCardContainer } from '../common/StyledComponents';

export function ProductCardSkeleton() {
  return (
    <ProductCardContainer>
      <Skeleton variant="rectangular" height={240} />

      <CardContent sx={{ flexGrow: 1, py: 1, px: 0 }}>
        <Skeleton variant="text" width="30%" height={16} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="50%" height={28} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="30%" height={24} />
      </CardContent>

      <CardActions sx={{ p: 0 }}>
        <Skeleton variant="rounded" width="100%" height={36} />
      </CardActions>
    </ProductCardContainer>
  );
}

interface ProductListSkeletonProps {
  count?: number;
}

export default function ProductListSkeleton({ count = 8 }: ProductListSkeletonProps) {
  return (
    <Grid container rowSpacing={4} columnSpacing={3} sx={{ mt: 3 }}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid key={index} size={{ xs: 12, md: 6, lg: 4 }}>
          <ProductCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}
