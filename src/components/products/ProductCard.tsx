// Components
import Image from 'next/image';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';

// Types
import { Product } from '@/types/product';

// Others
import { getProductPrice } from '@/lib/helpers';
import {
  ProductCardContainer,
  ProductCardImage,
  ProductCardRatingContainer,
  ProductCardTitle
} from '../common/StyledComponents';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = getProductPrice(product);

  return (
    <ProductCardContainer component="article" aria-label={`${product.title} product card`}>
      <ProductCardImage>
        <Image
          src={product.featuredImage?.url || ''}
          alt={product.featuredImage?.alt || product.title}
          layout="fill"
          objectFit="contain"
          loading="lazy"
        />
      </ProductCardImage>

      <CardContent sx={{ flexGrow: 1, py: 1, px: 0 }}>
        <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>
          {product.vendor}
        </Typography>
        <Tooltip title={product.title}>
          <ProductCardTitle>{product.title}</ProductCardTitle>
        </Tooltip>

        <ProductCardRatingContainer>
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
        </ProductCardRatingContainer>

        <Typography fontSize="0.9rem">{price}</Typography>
      </CardContent>

      <CardActions sx={{ p: 0 }}>
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
