import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../Config/EnvConfig';

// Get the auth token
const getToken = () => localStorage.getItem('token');

// Get API functions
const fetchPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data.reverse();
};



// Custom hook for posts with user data
export function usePost() {
  const queryClient = useQueryClient();

  // Query for fetching all posts
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

 

  return {
    posts: postsWithUsers,
    
}}