import React, { useEffect, useState } from 'react';
import { useGetAllUsersQuery } from '../redux/services/users';
import { useShareLoanMutation } from "../redux/services/loan";
import Loading from './Loading';
import { useParams } from 'react-router-dom';

const ShareLoan = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const { loan_id,owner_id } = useParams();
    const { data, refetch, isLoading } = useGetAllUsersQuery();
    const [shareLoan, { isLoading: loanIsLoading }] = useShareLoanMutation();
 

    useEffect(() => {
        refetch();
        if (!isLoading && data?.length > 0) {
            setUsers(data);
        }
    }, [data, isLoading, refetch]);

    const handleRadioChange = (userId) => {
        setSelectedUserId(userId);
    };

    const handleSubmit = async () => {
        try {
            const res = await shareLoan({ loan_id, user_id: selectedUserId, owner_id});

            if(res && res.data){
                alert('Shared Successfully !')
            }else{
                alert("Something Went Wrong !");
            }
 
        } catch (error) {
            alert("Something Went Wrong !");
            console.error(error);
        }
    }

    return (
        isLoading ? <Loading /> : (
            <div className='min-h-screen py-20 w-full flex items-center justify-center flex-col gap-10'>
                {users?.length > 0 ? (
                    <div className='w-full px-20'>
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedUserId || loanIsLoading}
                            className="relative disabled:opacity-50 inline-flex items-center justify-center p-0 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                            <span className="capitalize relative px-4 text-xs py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Submit
                            </span>
                        </button>
                        {users.map(user => (
                            <div key={user.id} className='flex items-center gap-2 mb-4 justify-between'>
                                <div className='flex gap-4 items-center'></div>
                                <div className="flex gap-4 items-center justify-start w-[60%]">
                                    <input
                                        type="radio"
                                        checked={selectedUserId === user.id}
                                        onChange={() => handleRadioChange(user.id)}
                                    />
                                    <h1 className='font-bold'>User Name: </h1>
                                    <p>{user.username}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='font-bold text-3xl capitalize'>No users found!</div>
                )}
            </div>
        )
    );
};

export default ShareLoan;
