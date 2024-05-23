import React, { useEffect, useState } from 'react';
import { useGetLoanScheduleQuery } from "../redux/services/loan";
import { Link, useParams } from 'react-router-dom';
import Loading from './Loading';
import { MdSummarize } from "react-icons/md";
import { FaShare } from "react-icons/fa";

const ViewSchedule = () => {

    const { loan_id, user_id,owner_id } = useParams();

    const [loanData, setLoanData] = useState([]);

    const { data, isLoading } = useGetLoanScheduleQuery({ loan_id, user_id })



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

                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {Object.keys(loanData[0]).map(v => <th key={v} scope="col" className="px-6 py-3">
                                    {v}
                                </th>)}

                                <th scope='col' className='px-6 py-3' >Summary</th>

                                <th scope='col' className='px-6 py-3' >share</th>

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
                                        <Link to={`/view-summary/${loan_id}/${user_id}/${item.month}`}>
                                            <MdSummarize />
                                        </Link>
                                    </td>

                                    <td className="px-6 py-4">
                                        <Link to={`/share-loan/${loan_id}/${owner_id}`}>
                                            <FaShare />
                                        </Link>
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                : <div className='font-bold text-3xl capitalize flex items-center justify-center flex-col gap-8'>
                    <h1>no schedule yet !</h1>
                </div>}
        </div>
    )
}

export default ViewSchedule