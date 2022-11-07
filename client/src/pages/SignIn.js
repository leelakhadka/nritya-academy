import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt } from "react-icons/fa";
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import axios from 'axios'

function SignIn({ currentUser }) {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData

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
                email,
                password
            }
            axios.post('/api/signin', user)
                .then(res => {
                    console.log(res.data)
                    if (res.data) {
                        currentUser(res.data)
                        navigate('/')
                    }
                }
                )
        } catch (error) {
            toast.error('Bad User Credentials')
        }
    }

    return (
        <>
            <div className='pageContainer'>
                <header>
                    <p className='pageHeader'>Enter Login information below</p>
                </header>

                <form onSubmit={onSubmit}>
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

                    <Link to='/forgot-password' className='forgotPasswordLink'>
                        Forgot Password
                    </Link>

                    <div className='signInBar'>
                        <p className='signInText'>Sign In</p>
                        <button className='signInButton'>
                            <FaSignInAlt />
                        </button>
                    </div>
                </form>

                <Link to='/sign-up' className='registerLink'>
                    Sign Up Instead
                </Link>
            </div>
        </>
    )
}

export default SignIn