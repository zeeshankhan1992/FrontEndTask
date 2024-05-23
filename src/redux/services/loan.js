import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const loanApi = createApi({
  reducerPath: 'loanApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://gl-interview.azurewebsites.net/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    newLoan: builder.mutation({
      query: (data) => ({
        url: 'loans',
        method: 'POST',
        body: data,
      }),
    }),
    updateLoan: builder.mutation({
      query: ({ loan_id, user_id, data }) => ({
        url: `loans/${loan_id}?user_id=${user_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    shareLoan: builder.mutation({
      query: ({ loan_id, user_id, owner_id }) => ({
        url: `loans/${loan_id}/share?user_id=${user_id}&owner_id=${owner_id}`,
        method: 'POST'
      }),
    }),
    getLoanByUserId: builder.query({
      query: (id) => ({
        url: `users/${id}/loans`,
        method: 'GET',
      }),
    }),
    getLoanSchedule: builder.query({
      query: ({ loan_id, user_id }) => ({
        url: `loans/${loan_id}?user_id=${user_id}`,
        method: 'GET',
      }),
    }),
    getLoanSummary: builder.query({
      query: ({ loan_id, user_id, month }) => ({
        url: `loans/${loan_id}/month/${month}?user_id=${user_id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {

  useNewLoanMutation,
  useGetLoanByUserIdQuery,
  useUpdateLoanMutation,
  useGetLoanScheduleQuery,
  useGetLoanSummaryQuery,
  useShareLoanMutation

} = loanApi;
