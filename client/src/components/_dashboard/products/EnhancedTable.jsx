import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { CSVLink, CSVDownload } from "react-csv";

const columns = [
  { field: 'id', headerName: 'S.No.', width: 90 },
  {
    field: 'scholarNumber',
    headerName: 'Scholar Number',
    width: 150,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 140,
    editable: true,
  },
  {
    field: 'installmentNumber',
    headerName: 'Installment No.',
    type: 'number',
    width: 130,
    editable: true,
  },
  {
    field: 'Amount',
    headerName: 'Amount',
    type: 'number',
    width: 130,
    editable: true,
  },
  {
    field: 'dueDate',
    headerName: 'Due Date',
    description: 'This column has a value getter and is not sortable.',
    type:'string',
    sortable: false,
    width: 160,
    // valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

// const rows = [
//   { id: 1, lastName: 'Snow', name: 'Jon', scholarNumber: 35 },
//   { id: 2, lastName: 'Lannister', name: 'Cersei', scholarNumber: 42 },
//   { id: 3, lastName: 'Lannister', name: 'Jaime', scholarNumber: 45 },
//   { id: 4, lastName: 'Stark', name: 'Arya', scholarNumber: 16 },
//   { id: 5, lastName: 'Targaryen', name: 'Daenerys', scholarNumber: null },
//   { id: 6, lastName: 'Melisandre', name: null, scholarNumber: 150 },
//   { id: 7, lastName: 'Clifford', name: 'Ferrara', scholarNumber: 44 },
//   { id: 8, lastName: 'Frances', name: 'Rossini', scholarNumber: 36 },
//   { id: 9, lastName: 'Roxie', name: 'Harvey', scholarNumber: 65 },
// ];

export default function DataGridDemo(props) {
  const [loading, setLoading] = React.useState(false);
  let fetched_data  = props.data[0] ;
  
  let result = [];
  
  for(let i = 0 ; i < fetched_data.length ; i += 1){
     console.log(fetched_data[i].dueDate);
    let obj = {
      id : `${i}`,
      name : fetched_data[i].name,
      Amount:fetched_data[i].Amount,
      installmentNumber : parseInt(fetched_data[i].installNumber, 10),
      scholarNumber : parseInt(fetched_data[i].scholarNumber , 10),
      dueDate : fetched_data[i].dueDate

    }
    result.push(obj);
  }

  function handleClick(e) {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }
   
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={result}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        disableSelectionOnClick
      />
      <CSVLink data={result} filename={`pending-dues-${props.data[1]}.csv`}>
      <LoadingButton  
      style = {{marginTop : "20px"}}
      color="primary"
                            onClick={handleClick}
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"> 
                            Save
                            </LoadingButton>
                            </CSVLink>
    </div>
  );
}
