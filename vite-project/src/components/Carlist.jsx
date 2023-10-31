import { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Carlist() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    fetch('https://carrestapi.herokuapp.com/cars')
    .then(response => {
      if (!response.ok)
        throw new Error("Something went wrong: " + response.statusText);
    
      return response.json();  
    })
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error(err))
  }

  const deleteCar = (url) => {
    if (window.confirm("Are your sure?")) {
      fetch(url, { method: 'DELETE' })
      .then(response => {
        if(!response.ok) {
          throw new Error("Error in deletion: " + response.statusText);
        }
        else {
          setOpen(true);
          fetchCars();
        }
      })
      .catch(err => console.error(err))
      }
  }

  const [columnDefs] = useState([
    { field: 'brand', sortable: true, filter: true },
    { field: 'model', sortable: true, filter: true },
    { field: 'color', sortable: true, filter: true },
    { field: 'fuel', sortable: true, filter: true, width: 100 },
    { field: 'year', sortable: true, filter: true, width: 100 },
    { field: 'price', sortable: true, filter: true },
    {
      cellRenderer: params => <Button size="small" onClick={() => deleteCar(params.data._links.car.href)}>Delete</Button>,
      width: 120
    },
  ]);
 
  return(
    <>
      <div className='ag-theme-material' style={{ width: '90%', height: 600 }}>
        <AgGridReact 
          rowData={cars}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
      <Snackbar 
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Car deleted succesfully"
      />
    </>
  );
}

export default Carlist;