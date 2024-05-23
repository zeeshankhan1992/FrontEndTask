import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { Loading } from "../pages/index";
import { FaEye } from "react-icons/fa";
import { useGetLoanByUserIdQuery } from '../redux/services/loan';

const ViewLoan = () => {

  const { id } = useParams();

  const [loanData, setLoanData] = useState([]);

  const { data, isLoading } = useGetLoanByUserIdQuery(id)

  useEffect(() => {

    if (!isLoading) {
      if (data && data.length > 0) {
        setLoanData(data)
      }
    }

  }, [isLoading])
 

  return (
    isLoading ? <Loading /> : <div className='min-h-screen py-20 w-full flex items-center justify-center flex-col gap-10'>
      {loanData.length > 0 ?
        <div className="relative overflow-x-auto flex items-center justify-center flex-col gap-8  ">
          <Link to={`/new-loan/${id}`} className="relative inline-flex items-center justify-center p-0  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="capitalize relative px-4 text-xs py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              add loan
            </span>
          </Link>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {Object.keys(loanData[0]).map(v => <th key={v} scope="col" className="px-6 py-3">
                  {v}
                </th>)}

                <th scope='col' className='px-6 py-3' >Action</th>

                <th scope='col' className='px-6 py-3' >Schedule</th>

              </tr>
            </thead>
            <tbody>
              {loanData.map(item => (
                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  {Object.keys(item).map(key => (
                    <td key={key} className="px-6 py-4">
                      {item[key]}
                    </td>
                  ))}

                  <td className="px-6 py-4">
                    <Link to={`/loan/update/${item.id}/${id}`}>

                      <MdEdit />
                    </Link>
                  </td>

                  <td className="px-6 py-4">
                    <Link to={`/view-loan/schedule/${item.id}/${id}/${item.owner_id}`}>
                      <FaEye />
                    </Link>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>


        : <div className='font-bold text-3xl capitalize flex items-center justify-center flex-col gap-8'>
          <h1>no loans yet !</h1>

          <Link to={`/new-loan/${id}`} className="relative inline-flex items-center justify-center p-0  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="capitalize relative px-4 text-xs py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              create loan
            </span>
          </Link>
        </div>}
    </div>
  )
}

export default ViewLoan