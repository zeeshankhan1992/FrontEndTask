import React from 'react';
import { useNewLoanMutation } from "../redux/services/loan"
import { useParams } from 'react-router-dom';

const NewLoan = () => {

    const { id } = useParams();

    const [newLoan, { isLoading }] = useNewLoanMutation();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create an empty object to store field values
        const formData = {};

        // Loop through each form element and store its value in formData
        event.target.querySelectorAll('input, select').forEach((element) => {
            formData[element.id] = parseInt(element.value);
        });


        try {
            const res = await newLoan({ ...formData, owner_id: id });

            console.log(res);
            if (res.error) {
                alert(res.error.data.detail);
            } else if (res.data) {
                alert('Loan added Successfully');
            } else {
                alert('Something Went Wrong !');
            }

            console.log(res);
        } catch (error) {
            console.error('Failed to add to loan:', error);
        }
    };



    return (

        <section className='w-full min-h-screen flex items-center justify-center'>

            <form onSubmit={handleSubmit} className="mx-auto bg-gray-900 min-w-[800px] px-10 py-10 rounded-md">


                <div className="mb-5">
                    <label
                        htmlFor="amount"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="0"
                        required=""
                    />
                </div>



                <div className="mb-5">
                    <label
                        htmlFor="apr"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your Apr
                    </label>
                    <input
                        type="text"
                        id="apr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="0"
                        required=""
                    />
                </div>





                <div className="mb-5">
                    <label
                        htmlFor="term"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your Term
                    </label>
                    <input
                        type="text"
                        id="term"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="0"
                        required=""
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="active"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Select Active
                    </label>
                    <select
                        id="active"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option selected="">Choose a Option</option>
                        <option value="active">Active</option>
                        <option value="unactive">Un Active</option>
                    </select>

                </div>

                <button
                    disabled={isLoading}
                    type='submit' className="relative inline-flex items-center justify-center w-full p-0.5 mb-2  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                    <span className="capitalize relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full">
                        {isLoading ? "Wait ..." : "create new Loan"}
                    </span>
                </button>
            </form>


        </section>
    )
}

export default NewLoan