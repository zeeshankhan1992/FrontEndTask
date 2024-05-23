import React from 'react';
import * as R from "react-router-dom";
import * as L from "./layout/index";
import * as P from "./pages/index"

const App = () => {


  const router = R.createBrowserRouter(
    R.createRoutesFromElements(
      <R.Route path="/" element={<L.RootLayout />}>

        <R.Route index element={<P.Home />} />

        <R.Route path='/users' element={<P.User />} />

        <R.Route path='/new-loan/:id' element={<P.NewLoan />} />

        <R.Route path='/user/:id/loans' element={<P.ViewLoan />} />

        <R.Route path='/loan/update/:loan_id/:user_id' element={<P.UpdateLoan />} />

        <R.Route path='/view-loan/schedule/:loan_id/:user_id/:owner_id' element={<P.ViewSchedule />} />

        <R.Route path='/view-summary/:loan_id/:user_id/:month' element={<P.ViewSummary />} />

        <R.Route path='/share-loan/:loan_id/:owner_id' element={<P.ShareLoan />} />

        <R.Route path='*' element={<P.NotFound />} />

      </R.Route>

    )
  );


  return (
    <R.RouterProvider router={router} />
  )
}

export default App