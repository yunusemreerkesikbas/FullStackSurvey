import {Link} from "react-router-dom";
import {useState} from "react";
import axiosClient from "../axios.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Signup() {
    const {setCurrentUser,setUserToken} = useStateContext();
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState({__html: ''})
    const onSubmit = (e) => {
        e.preventDefault();
        setError({__html: ''})
        axiosClient.post('/signup', {
            name: fullname,
            email,
            password,
            password_confirmation: passwordConfirmation
        })
            .then(({data}) => {
                setCurrentUser(data.user)
                setUserToken(data.token)
            })
            .catch((error) => {
                if (error.response) {
                    const finalErrors = Object.values(error.response.data.errors).reduce((acc, next) => [
                        ...acc, ...next
                    ], [])
                    console.log(finalErrors);
                    setError({__html: finalErrors.join('<br>')})
                }

                console.error(error);
            })
    }
    return (
        <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign up for free
            </h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {error.__html && (
                    <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>
                    </div>)}
                <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Full Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="full-name"
                                name="name"
                                type="text"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                required
                                placeholder="Full Name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                                placeholder="Email address"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>

                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                                placeholder="Password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <label htmlFor="password-confirmation"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm Password
                            </label>

                        </div>
                        <div className="mt-2">
                            <input
                                id="password-confirmation"
                                name="password_confirmation"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                type="password"
                                required
                                placeholder="Password Confirmation"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    <Link to='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Login with your account
                    </Link>
                </p>
            </div>
        </>
    )
}
