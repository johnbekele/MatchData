// Pages/PDFWikiManagement/PDFWikiManagementPage.jsx
import React from 'react';
import { useMediaQuery, Chip, Tooltip } from '@mui/material';
import DataTable from '../components/DataTable.jsx';
import ActionButton from '../components/ActionButton.jsx';
import { usePdfWiki } from '../hooks/usePdfWikiMock.js';

function PDFWikiManagementPage() {
  
  const {
    data,
    updateWikiStatus,
    updateTrsiteStatus,
    deleteItem,
    isLoading,
    isError,
    error,
  } = usePdfWiki();

  const isMobile = useMediaQuery('(max-width:768px)');

  const handleAction = (action, row) => {
    switch (action) {
      case 'toggleWiki':
        const newWikiStatus = row.wiki === 'found' ? 'not_found' : 'found';
        updateWikiStatus(row._id, newWikiStatus, {
          onSuccess: () => console.log(`Wiki status updated for ${row.pdfName}`),
          onError: (err) => console.error('Failed to update wiki status:', err)
        });
        break;
      case 'toggleTrsite':
        const newTrsiteStatus = row.trsite === 'found' ? 'not_found' : 'found';
        updateTrsiteStatus(row._id, newTrsiteStatus, {
          onSuccess: () => console.log(`TRsite status updated for ${row.pdfName}`),
          onError: (err) => console.error('Failed to update TRsite status:', err)
        });
        break;
      case 'delete':
        deleteItem(row._id, {
          onSuccess: () => console.log(`Deleted ${row.pdfName}`),
          onError: (err) => console.error('Failed to delete item:', err)
        });
        break;
      case 'edit':
        console.log('Edit action for:', row.pdfName);
        // Implement edit functionality
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleRowSelectionChange = (selectedRows) => {
    console.log('Selected rows:', selectedRows);
  };

  // Define columns
  const columns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 80,
      hide: isMobile 
    },
    {
      field: 'pdfName',
      headerName: 'PDF Name',
      width: isMobile ? 150 : 250,
      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <div className="truncate font-medium text-blue-600">
            {params.value}
          </div>
        </Tooltip>
      ),
    },
    {
      field: 'pdfQuestion',
      headerName: 'PDF Question',
      width: isMobile ? 200 : 300,
      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <div className="truncate">
            {params.value}
          </div>
        </Tooltip>
      ),
    },
    {
      field: 'pdfAnswer',
      headerName: 'PDF Answer',
      width: isMobile ? 200 : 350,
      hide: isMobile,
      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <div className="truncate text-gray-600">
            {params.value}
          </div>
        </Tooltip>
      ),
    },
    {
      field: 'wiki',
      headerName: 'WIKI',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value === 'found' ? 'Found' : 'Not Found'}
          color={params.value === 'found' ? 'success' : 'error'}
          variant="outlined"
          size="small"
          onClick={() => handleAction('toggleWiki', params.row)}
          className="cursor-pointer hover:opacity-80"
        />
      ),
    },
    {
      field: 'trsite',
      headerName: 'TRsite',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value === 'found' ? 'Found' : 'Not Found'}
          color={params.value === 'found' ? 'success' : 'error'}
          variant="outlined"
          size="small"
          onClick={() => handleAction('toggleTrsite', params.row)}
          className="cursor-pointer hover:opacity-80"
        />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 150,
      hide: isMobile,
      renderCell: (params) => (
        <span className="text-gray-500">
          {new Date(params.value).toLocaleDateString()}
        </span>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <ActionButton 
          row={params.row} 
          onAction={handleAction}
        />
      ),
    },
  ];

  // Transform data to rows format
  const rows = data
    ? data.map((item) => ({
        id: item._id,
        _id: item._id,
        pdfName: item.pdfName,
        pdfQuestion: item.pdfQuestion,
        pdfAnswer: item.pdfAnswer,
        wiki: item.wiki,
        trsite: item.trsite,
        createdAt: item.createdAt,
      }))
    : [];

  return (
    <div className="flex flex-col p-2 sm:p-4 md:p-6 w-full mt-10 md:mt-1">
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          PDF Wiki Management
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Manage PDF documents and their Wiki/TRsite status
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40 md:h-64">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : isError ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 md:px-4 md:py-3 rounded relative text-sm md:text-base">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-1">
            {error?.message || 'Failed to load PDF data'}
          </span>
        </div>
      ) : data && data.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="w-full overflow-auto">
            <DataTable
              rows={rows}
              columns={columns}
              density={isMobile ? 'compact' : 'standard'}
              selectedRowsToParent={handleRowSelectionChange}
              hideFooterSelectedRowCount={isMobile}
            />
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 text-gray-700 px-3 py-6 md:px-4 md:py-10 rounded text-center">
          <svg
            className="mx-auto h-8 w-8 md:h-12 md:w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-xs md:text-sm font-medium text-gray-900">
            No PDF documents
          </h3>
          <p className="mt-1 text-xs md:text-sm text-gray-500">
            There are currently no PDF documents in the system.
          </p>
        </div>
      )}
    </div>
  );
}

export default PDFWikiManagementPage;