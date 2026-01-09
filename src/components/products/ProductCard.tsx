// Components
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

// Types
import { Product } from '@/types/product';

// Others
import { ProductCardContainer, ProductCardTitle } from '../common/StyledComponents';
import { getProductPrice } from '@/lib/helpers';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = getProductPrice(product);

  return (
    <ProductCardContainer as="article" aria-label={`${product.title} product card`}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="240"
          image={product.featuredImage?.url}
          alt={product.featuredImage?.alt || product.title}
          loading="lazy"
          sx={{
            objectFit: 'cover',
            backgroundColor: 'grey.100'
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>
          {product.vendor}
        </Typography>
        <ProductCardTitle>{product.title}</ProductCardTitle>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
          <Rating
            value={product.reviews?.average || 0}
            precision={0.1}
            size="small"
            readOnly
            sx={{ fontSize: '1rem' }}
          />
          <Typography variant="caption" color="text.secondary">
            {product.reviews?.count || 0} {product.reviews?.count === 1 ? 'Review' : 'Reviews'}
          </Typography>
        </Box>

        <Typography sx={{ mt: 1, fontWeight: 600 }}>{price}</Typography>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          size="small"
          aria-label={`Add ${product.title} to cart`}>
          Add to Cart
        </Button>
      </CardActions>
    </ProductCardContainer>
  );
}
