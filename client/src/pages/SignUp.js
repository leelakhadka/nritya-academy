import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaRegUser } from "react-icons/fa";
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import axios from 'axios'

function SignUp({ currentUser }) {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    })
    const { first_name, last_name, email, password } = formData

    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const user = {
                first_name,
                last_name,
                email,
                password,
                admin: false
            }
            axios.post('/api/signup', user)
                .then(res => {
                    navigate('/sign-in')
                })
        } catch (error) {
            toast.error('Something went wrong with registration')
        }
    }

    return (
        <>
            <div className='pageContainer'>
                <header>
                    <p className='pageHeader'>Enter Registration information below</p>
                </header>

                <form onSubmit={onSubmit}>
                    <input
                        type='text'
                        className='nameInput'
                        placeholder='FirstName'
                        id='first_name'
                        value={first_name}
                        onChange={onChange}
                    />
                    <input
                        type='text'
                        className='nameInput'
                        placeholder='LastName'
                        id='last_name'
                        value={last_name}
                        onChange={onChange}
                    />
                    <input
                        type='email'
                        className='emailInput'
                        placeholder='Email'
                        id='email'
                        value={email}
                        onChange={onChange}
                    />

                    <div className='passwordInputDiv'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className='passwordInput'
                            placeholder='Password'
                            id='password'
                            value={password}
                            onChange={onChange}
                        />

                        <img
                            src={visibilityIcon}
                            alt='show password'
                            className='showPassword'
                            onClick={() => setShowPassword((prevState) => !prevState)}
                        />
                    </div>

                    <div className='signUpBar'>
                        <p className='signUpText'>Sign Up</p>
                        <button className='signUpButton'>
                            <FaRegUser />
                        </button>
                    </div>
                </form>

                <Link to='/sign-in' className='registerLink'>
                    Sign In Instead
                </Link>
            </div>
        </>
    )
}

export default SignUp