import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import Badge from '@mui/material/Badge';
import { Box, Card, Link, Typography, Stack , Popper } from '@mui/material';
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
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

          <Tooltip title="Scholar Number" arrow>
           <Typography variant="subtitle1">
            10024
            
          </Typography>
          </Tooltip>
          {/* <Typography variant="subtitle2" align="left">
            "deepaky.tt.19@ntij.ac.in"
          </Typography> */}
        </Stack>

        

        <Stack direction = "row" spacing = {9}>
        <Tooltip title="Gender" arrow>
           <Typography  variant="body" style = {{color:"#6C567B"}}>
            Male
            
          </Typography>
          </Tooltip>

          <Tooltip title="Payment Type" arrow>
           <Typography  style = {{color:"#8B9A46"}}
           variant="body" aria-describedby={id} type="button" onClick={handleClick}>
            Installment
            
          </Typography>
          
          </Tooltip>
          <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' ,padding:4 , borderRadius : 5}}>
          <Stack >
            <Typography mb = {2} varient = "h5">
            <Badge badgeContent={"Paid"} color="primary">
                1 Installment &nbsp;&nbsp;
            </Badge>
              
              
            </Typography>
            <Typography varient = "h5">
            <Badge badgeContent={"Unpaid"} color="error">
                2 Installment &nbsp;&nbsp;
            </Badge>
              
              
            </Typography>
            
          </Stack>
        </Box>
      </Popper>

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
            
            {/* <Grid item xs={6} md={4}>
              <Item>1st Installment Paid</Item>
            </Grid>
            <Grid item xs={6} md={4}>
              <Item>2nd Installment Paid</Item>
            </Grid> */}
        </Grid>
      </Stack>
    </Card>
  );
}




