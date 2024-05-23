import React, { useState } from 'react';
import { useNewUserMutation } from "../redux/services/users";

const NewUser = ({ setOpenNewUser, openNewUser, refetch }) => {
    const [username, setUsername] = useState('');
    const [createUser, { isLoading }] = useNewUserMutation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await createUser({ username });
            console.log(res);

            if (res && res.error) {
                alert(res.error.data.detail)
            } else if (res && res.data) {
                alert("User added Successfully !")
                username('')
                refetch();
            } else {
                alert("Something Went Wrong !")
            }

        } catch (error) {
            console.error('Failed to create a new user:', error);
        }
    };


    return (
        <div className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center gap-10 flex-col'>

            <button
                onClick={() => { setOpenNewUser(!openNewUser) }}
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
                <span className="sr-only">Close menu</span>
                <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col gap-5'>
                <div>
                    <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        User name
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John"
                        required
                    />
                </div>

                <button
                    disabled={isLoading}
                    type='submit'
                    className="relative inline-flex items-center justify-center w-full p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                >
                    <span className="capitalize relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full">
                        {isLoading ? "Wait ..." : "Create New User"}
                    </span>
                </button>

            </form>
        </div>
    );
};

export default NewUser;
