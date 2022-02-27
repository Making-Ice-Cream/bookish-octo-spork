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
   
    paymentType:Yup.string(),
    installmentNumber:Yup.string(),
    Amount:Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',      
      RollNo:'',
      paymentType:'',
      installmentNumber:'',
      Amount:''
    },
    validationSchema: RegisterSchema,
    onSubmit: async(values,actions) => {
      // navigate('/dashboard', { replace: true });

      if(paymentstatus === "Fetch Details"){

      
      const {RollNo} = values;
      const response =  await fetch(`http://localhost:80/fee_payment_manually`,{
        method : "POST",
        headers :{
            "Accept":"application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          "scholarNumber" : RollNo
        })
    });
    const awaited_response = await response.json();
    
    if(awaited_response.status === 200){
      if(awaited_response.amount === 0){
        alert("Fees is Fully Paid of this Student");
        navigate("/admin/app" , {replace:true});
      }
        actions.resetForm({
        values: {
          firstName: awaited_response.firstname,
          lastName: awaited_response.lastname ,          
          paymentType:awaited_response.paymentType,
          installmentNumber:awaited_response.installmentNumber,
          Amount: awaited_response.amount,
          RollNo
        },
       
    })
        setpaymentstatus("Make Payment");
    }
    else{
      navigate("/500",{replace:true})
    }

    
     }
    
    else{
      const { paymentType, installmentNumber , RollNo } = values;
      const response =  await fetch(`http://localhost:80/submitFee`,{
        method : "POST",
        headers :{
            "Accept":"application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          paymentType,installmentNumber,"scholarNumber" : RollNo
        })
    });
    const awaited_response = await response.json();
   
     if(awaited_response.status === 201){
       alert(awaited_response.message + " ,Now Navigating to Home Page!")
       navigate("/admin/app",{replace:true});

     }
     else{
       navigate("/500", {replace:true});
     }

     
    }
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
