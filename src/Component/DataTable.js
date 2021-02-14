import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

import './DataTable.css'

const data = require('./data.json')

const columns = [
    { field: 'recipe', headerName: 'Dish', width: 250 },
    { field: 'cuisine', headerName: 'Cuisine', width: 180 },
    { field: 'ingredients', headerName: 'Main Ingredient', width: 250 },
    { field: 'prepTime', headerName: 'Preperation Time', sortable: false, width: 220 }
];

const rows = data.recipes

const DataTable = () => {
    return (
        <div style={{ height: 400, width: '65%' }}>
            <h3>Cuisine Table</h3>
            <DataGrid rows={rows} columns={columns} pageSize={5} disableColumnMenu={true} disableSelectionOnClick={true}/>
        </div>
    );
}

export default DataTable;