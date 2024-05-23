import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetLoanSummaryQuery } from '../redux/services/loan';
import Loading from './Loading';

const ViewSummary = () => {
    const { loan_id, user_id, month } = useParams();
    const [loanData, setLoanData] = useState(null);
    const { data, isLoading } = useGetLoanSummaryQuery({ loan_id, user_id, month });

    useEffect(() => {
        if (!isLoading && data) {
            setLoanData(data);
        }
    }, [isLoading, data]);

    console.log(data);

    return (
        isLoading ? <Loading /> : (
            <div className='min-h-screen py-20 w-full flex items-center justify-center flex-col gap-10'>
                {loanData ? (
                    <div className="relative overflow-x-auto flex items-center justify-center flex-col gap-8">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    {Object.keys(loanData).map(v => (
                                        <th key={v} scope="col" className="px-6 py-3">
                                            {v}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    {Object.keys(loanData).map(key => (
                                        <td key={key} className="px-6 py-4">
                                            {loanData[key]}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className='font-bold text-3xl capitalize flex items-center justify-center flex-col gap-8'>
                        <h1>No summary yet!</h1>
                    </div>
                )}
            </div>
        )
    );
};

export default ViewSummary;
