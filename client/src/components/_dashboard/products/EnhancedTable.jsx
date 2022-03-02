import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

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
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', name: 'Jon', scholarNumber: 35 },
  { id: 2, lastName: 'Lannister', name: 'Cersei', scholarNumber: 42 },
  { id: 3, lastName: 'Lannister', name: 'Jaime', scholarNumber: 45 },
  { id: 4, lastName: 'Stark', name: 'Arya', scholarNumber: 16 },
  { id: 5, lastName: 'Targaryen', name: 'Daenerys', scholarNumber: null },
  { id: 6, lastName: 'Melisandre', name: null, scholarNumber: 150 },
  { id: 7, lastName: 'Clifford', name: 'Ferrara', scholarNumber: 44 },
  { id: 8, lastName: 'Frances', name: 'Rossini', scholarNumber: 36 },
  { id: 9, lastName: 'Roxie', name: 'Harvey', scholarNumber: 65 },
];

export default function DataGridDemo() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
