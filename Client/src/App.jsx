import { useState } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PDFWikiManagementPage from './page/PDFWikiManagementPage';


function App() {


  // console.log('App initializing...');
  // console.log(
  //   'Initial token in localStorage:',
  //   localStorage.getItem('token') ? 'EXISTS' : 'NOT FOUND'
  // );
  // if (localStorage.getItem('token')) {
  //   console.log(
  //     'Token first 20 chars:',
  //     localStorage.getItem('token').substring(0, 20)
  //   );
  // }

  // Create a client

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
        cacheTime: 1000 * 60 * 30, // Unused data is garbage collected after 30 minutes
        refetchOnWindowFocus: false, // Don't refetch when window regains focus
        retry: 1, // Retry failed requests once
      },
    },
  });

  return (
    <div>
     
        <QueryClientProvider client={queryClient}>
             
       </QueryClientProvider>
    
    </div>
  );
}

export default App;