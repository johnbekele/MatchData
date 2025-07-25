// hooks/usePdfWikiMock.js
import { useState, useEffect } from 'react';
import { mockPdfWikiData, mockPdfWikiAPI } from '../../utils/MockData.js';

export const usePdfWiki = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    mockPdfWikiAPI.getPdfWikiData()
      .then(result => {
        setData(result);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  const updateWikiStatus = (id, status, callbacks) => {
    mockPdfWikiAPI.updateWikiStatus(id, status)
      .then(result => {
        setData(prev => prev.map(item => 
          item._id === id ? result.item : item
        ));
        callbacks?.onSuccess?.(result);
      })
      .catch(err => {
        callbacks?.onError?.(err);
      });
  };

  const updateTrsiteStatus = (id, status, callbacks) => {
    mockPdfWikiAPI.updateTrsiteStatus(id, status)
      .then(result => {
        setData(prev => prev.map(item => 
          item._id === id ? result.item : item
        ));
        callbacks?.onSuccess?.(result);
      })
      .catch(err => {
        callbacks?.onError?.(err);
      });
  };

  const deleteItem = (id, callbacks) => {
    mockPdfWikiAPI.deleteItem(id)
      .then(result => {
        setData(prev => prev.filter(item => item._id !== id));
        callbacks?.onSuccess?.(result);
      })
      .catch(err => {
        callbacks?.onError?.(err);
      });
  };

  return {
    data,
    updateWikiStatus,
    updateTrsiteStatus,
    deleteItem,
    isLoading,
    isError,
    error
  };
};