import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {

    const links = [
        { title: "home", url: "/" },
        { title: "users", url: "/users" }
    ]

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <Link to={'/'} className='text-white font-bold'>
                    React
                </Link>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {links.map(v => <li key={v.title}>
                            <NavLink
                                to={v.url}
                                className="block capitalize py-2 px-3  bg-blue-700 rounded md:bg-transparent   md:p-0  text-white "
                                aria-current="page"
                            >
                                {v.title}
                            </NavLink>
                        </li>)}
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Header