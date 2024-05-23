import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'usersApi', 
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://gl-interview.azurewebsites.net/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => 'users?offset=0&limit=100'
    }),
    newUser: builder.mutation({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body:newUser,  
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useNewUserMutation } = userApi;
