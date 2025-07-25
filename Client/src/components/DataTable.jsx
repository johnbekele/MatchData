import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

function DataTable({
  rows,
  columns,
  density,
  hideFooterSelectedRowCount,
  onSelectionChange,
  selectedRowsToParent,
  darkMode = false, // Add darkMode as a prop with default value
}) {
  // State to track selected rows
  const [selectedRows, setSelectedRows] = useState([]);

  // Handle row selection change
  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection);
    selectedRowsToParent(newSelection);
    // If you provided an external handler, call it with the selected rows
    if (onSelectionChange) {
      // Get the full row data for selected IDs
      const selectedRowsData = rows.filter((row) =>
        newSelection.includes(row.id)
      );
      onSelectionChange(newSelection, selectedRowsData);
    }

    // You can also log or process the selected rows here
  };

  // State for pagination
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  // Theme-based styles
  const getThemeStyles = () => {
    return {
      height: 700,
      width: '100%',
      backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
      color: darkMode ? '#ffffff' : '#1e1e1e',
      boxShadow: darkMode
        ? '0 4px 6px rgba(0, 0, 0, 0.3)'
        : '0 1px 3px rgba(0, 0, 0, 0.12)',
    };
  };

  // DataGrid theme styles
  const getDataGridStyles = () => {
    return {
      border: 0,
      color: darkMode ? '#e0e0e0' : 'inherit',
      '& .MuiDataGrid-cell': {
        borderBottom: darkMode ? '1px solid #333' : '1px solid #f0f0f0',
      },
      '& .MuiDataGrid-columnHeaders': {
        backgroundColor: darkMode ? '#333' : '#f5f5f5',
        color: darkMode ? '#fff' : 'inherit',
      },
      '& .MuiDataGrid-footerContainer': {
        backgroundColor: darkMode ? '#333' : '#f5f5f5',
        borderTop: darkMode ? '1px solid #444' : '1px solid #ddd',
      },
      '& .MuiTablePagination-root': {
        color: darkMode ? '#e0e0e0' : 'inherit',
      },
      '& .MuiCheckbox-root': {
        color: darkMode ? '#90caf9' : 'inherit',
      },
      '& .MuiDataGrid-row:hover': {
        backgroundColor: darkMode
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(0, 0, 0, 0.04)',
      },
    };
  };

  return (
    <Paper sx={getThemeStyles()}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={getDataGridStyles()}
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={handleSelectionChange}
        hideFooterSelectedRowCount={hideFooterSelectedRowCount}
        density={density || 'standard'}
        slots={{ footer: CustomFooter }}
      />
    </Paper>
  );
}

export default DataTable;