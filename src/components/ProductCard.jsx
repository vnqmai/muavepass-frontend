import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/numberUtils';

export default function ProductCard({product, hideBuyNow}) {
  const navigate = useNavigate();
  return (
    <Card>
      <CardActionArea onClick={() => {navigate(`/products/${product?._id}`)}}>
        <CardMedia
          component="img"
          height="140"
          image={require(`../assets/events/${product?.event_image}`)}
          alt={`[HCM] Family show: "Beauty and the Beast" | THE UK PANTO`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${product?.product_name} (seat: ${product?.seat})`}
          </Typography>
          {
            product?.cost !== product?.price && (
              <Typography variant="body2" sx={{ color: 'text.secondary', textDecoration: "line-through" }}>
                {`Giá gốc: ${formatCurrency(product?.cost)}`}
              </Typography>
            )
          }
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`Giá: ${formatCurrency(product?.price)}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      {
        !hideBuyNow && (
          <CardActions>
            <Button size="small" color="primary"  onClick={() => {navigate(`/order/${product._id}`)}}>
              Mua ngay
            </Button>
          </CardActions>
        )
      }
    </Card>
  );
}
