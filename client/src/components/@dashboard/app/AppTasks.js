import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import {useState} from "react";
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Card,
  Checkbox,
  CardHeader,
  Typography,
  FormControlLabel,
  Stack
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';

let TASKS = [
 
  'Write a Blog if required',


];

TASKS = JSON.parse(localStorage.getItem("task")) === null? TASKS :  JSON.parse(localStorage.getItem("task"));
TaskItem.propTypes = {
  task: PropTypes.string,
  checked: PropTypes.bool,
  formik: PropTypes.object
};

function TaskItem({ task, checked, formik, ...other }) {
  const { getFieldProps } = formik;


  return (
    <Stack direction="row" justifyContent="space-between" sx={{ py: 0.75 }}>
      <FormControlLabel
        control={
          <Checkbox {...getFieldProps('checked')} value={task} checked={checked} {...other} />
         
        }
        
        label={
          <Typography
            variant="body2"
            sx={{
              ...(checked && {
                color: 'text.disabled',
                textDecoration: 'line-through'
              })
            }}
          >
            {task}
          </Typography>
        }
      />
    </Stack>
  );
}

export default function AppTasks() {
  const [rendersite , setrendersite] = useState(false);
  let [items, setItems] = useState("");

  const Add = () => {
      items = items.trim();
      if(items.length === 0){
        alert("Add an Proper Task");
        return;
      }
     
   
      TASKS.push(items);
       setItems("");
       localStorage.setItem("task", JSON.stringify(TASKS));
     
     if(!rendersite) {
      setrendersite(true);
     }else{
      setrendersite(false);
     }
   }
  const formik = useFormik({
    initialValues: {
      checked: [TASKS[1]]
    },
    onSubmit: (values) => {
      // console.log("line 86")
      console.log(values);
    }
  });
  
  function insertTask(e) {
    setItems(e.target.value);
  }

  const { values, handleSubmit } = formik;
  // let result = values.checked;
  // console.log(result);
  TASKS = TASKS.filter((e1)=> !values.checked.includes(e1))
  localStorage.setItem("task", JSON.stringify(TASKS));

  return (
    <Card>
      <CardHeader title="Tasks" />
      <Box sx={{ px: 3, py: 1 }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            
            
            {TASKS.map((task) => ( 
              
              <TaskItem
                key={task}
                task={task}
                formik={formik}
                checked={values.checked.includes(task)}
              />
            ))}
          </Form>
        </FormikProvider>
        <TextField id="outlined-basic" label= "ADD TASK" variant="outlined" value = {items} onChange = {insertTask}/ >
        
        

        <Tooltip title="Add Task" >
        <IconButton aria-label="delete" size="medium" style ={{backgroundColor : "green", color:"white", marginLeft:"10px", marginTop: "5px"}} onClick = {Add}>
              <AddIcon  fontSize="inherit" />
        </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
}