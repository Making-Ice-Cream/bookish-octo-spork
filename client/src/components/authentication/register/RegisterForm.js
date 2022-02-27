import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const [paymentstatus, setpaymentstatus ] = useState("Fetch Details")
  const navigate = useNavigate();
  // const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    RollNo : Yup.string(),
    email:Yup.string(),
    paymentType:Yup.string(),
    installmentNumber:Yup.string(),
    Amount:Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      RollNo:'',
      paymentType:'',
      installmentNumber:'',
      Amount:''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values,actions) => {
      // navigate('/dashboard', { replace: true });
       console.log("hjgh")
    //   actions.resetForm({
    //     values: {
    //       // the type of `values` inferred to be Blog
    //       email: `Installment`,
    //       RollNo:''
    //     },
    // })
     }
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              disabled
              label="First name"
              {...getFieldProps('firstName')}
              
            />

            <TextField
            disabled
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                disabled
                type="string"
                label="Payment Type"
                {...getFieldProps('paymentType')}
                
              />
              <TextField
                fullWidth
                disabled
                type="string"
                label="Installment Number"
                {...getFieldProps('installmentNumber')}
              />

           </Stack>
        <TextField
            fullWidth
            focussed="true"
            label="Scholar Number"
            type = "number"
            {...getFieldProps('RollNo')}
            error={Boolean(touched.RollNo && errors.RollNo)}
            helperText={touched.RollNo && errors.RollNo}
          />

         
          <TextField
            fullWidth
            
            type="String"
            label="Required Amount"
            {...getFieldProps('Amount')}
            disabled
            helperText = "Automatically fetched from Database"
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
           {paymentstatus}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
