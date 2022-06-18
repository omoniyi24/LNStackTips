import {useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import {useContext} from "react";
import QuestionContext from "../context/question/QuestionContext";
// import QuestionContext from "../../context/question/QuestionContext";


function SignIn() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const {showDashboard, setShowDashboard} = useContext(QuestionContext)


    const {email, password} = formData

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setShowDashboard(true)
        window.location = "/dashboard"
    }

    return (
        <>
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div
                    className="w-full p-6 m-auto bg-white border-t-4 border-blue-600 rounded-md shadow-md border-top lg:max-w-md">
                    <h1 className="text-3xl font-semibold text-center text-blue-700">LOGO</h1>
                    <form className="mt-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm text-gray-800">Email</label>
                            <input type="email"
                                   className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                        </div>
                        <div className="mt-4">
                            <div>
                                <label htmlFor="password" className="block text-sm text-gray-800">Password</label>
                                <input type="password"
                                       className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                            </div>
                            <a href="#" className="text-xs text-gray-600 hover:underline">Forget Password?</a>
                            <div className="mt-6">
                                <button
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                    <p className="mt-8 text-xs font-light text-center text-gray-700"> Don't have an account? <a href="/signUp"
                                                                                                                className="font-medium text-blue-600 hover:underline">Sign
                        up</a></p>
                </div>
            </div>
        </>
    )
}

export default SignIn