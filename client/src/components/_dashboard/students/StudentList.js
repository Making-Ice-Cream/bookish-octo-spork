import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import StudentCard from './StudentCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function ProductList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <StudentCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
