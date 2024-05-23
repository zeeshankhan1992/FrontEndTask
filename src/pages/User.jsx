import NewUser from '../components/NewUser';
import React, { useEffect, useState } from 'react';
import { useGetAllUsersQuery } from "../redux/services/users";
import { Link } from 'react-router-dom';
import { Loading } from "./index";

const User = () => {

    const [users, setUsers] = useState([]);

    const [openNewUser, setOpenNewUser] = useState(false);

    const { data, refetch, isLoading } = useGetAllUsersQuery();

    useEffect(() => {
        refetch()
        if (!isLoading) {
            if (data?.length > 0) {
                setUsers(data)
            }
        }
    }, [isLoading]);


    return (
        isLoading ? <Loading /> : <div className='min-h-screen py-20 w-full flex items-center justify-center flex-col gap-10'>

            {openNewUser && <NewUser refetch={refetch} setOpenNewUser={setOpenNewUser} openNewUser={openNewUser} />}

            <button onClick={() => setOpenNewUser(!openNewUser)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span className="capitalize relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    create new User
                </span>
            </button>


            {users?.length > 0 ? <div className='w-full px-20'>{users.map(v =>

                <div key={v.id} className='flex items-center gap-2 mb-4 justify-between border-b pb-4'>
                    <div className='flex gap-4 items-center'><h1 className='font-bold'>Id: </h1> <p>{v.id}</p></div> <div className="flex gap-4 items-center justify-start  w-[60%]"> <h1 className='font-bold'>User Name: </h1> <p>{v.username}</p>
                    </div>


                    <div className='flex gap-5'>
                        <Link to={`/new-loan/${v.id}`} onClick={() => setOpenNewUser(!openNewUser)} className="relative inline-flex items-center justify-center p-0  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                            <span className="capitalize relative px-4 text-xs py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                create loan
                            </span>
                        </Link>


                        <Link to={`/user/${v.id}/loans`} onClick={() => setOpenNewUser(!openNewUser)} className="relative inline-flex items-center justify-center p-0  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                            <span className="capitalize relative px-4 text-xs py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                view loan
                            </span>
                        </Link>
                    </div>

                </div>

            )}</div> : <div className='font-bold text-3xl capitalize'>no users found !</div>}

        </div>
    )
}

export default User