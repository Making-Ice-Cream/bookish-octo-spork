import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';


import Label from '../../Label';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

StudentCard.propTypes = {
  product: PropTypes.object
};

export default function StudentCard({ product }) {
  const { name, cover, price, colors, status, priceSale } = product;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Label>
        )}
        <ProductImgStyle alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Tooltip title="Parent Name" arrow>
            <Div color="secondary">Hanuman Singh</Div>
          </Tooltip>
          {/* <Typography variant="subtitle1">
            &nbsp;
            {fCurrency(price)}
          </Typography> */}

          <Tooltip title="Roll Number" arrow>
           <Typography variant="subtitle1">
            10024
            
          </Typography>
          </Tooltip>
          {/* <Typography variant="subtitle2" align="left">
            "deepaky.tt.19@ntij.ac.in"
          </Typography> */}
        </Stack>
        <Grid container  direction="column" spacing={0}>
        <Grid item xs={6} md={4}>
             <Tooltip title="Mobile">
              <Item>+91 9306008049</Item>
              </Tooltip>
            </Grid>
            <Grid item xs={6} md={8}>
            <Tooltip title="Email">
              <Item >deepaky.tt.19@nitj.ac.in</Item>
              </Tooltip>
            </Grid>
            
            <Grid item xs={6} md={4}>
              <Item>1st Installment Paid</Item>
            </Grid>
            <Grid item xs={6} md={4}>
              <Item>2nd Installment Paid</Item>
            </Grid>
        </Grid>
      </Stack>
    </Card>
  );
}




