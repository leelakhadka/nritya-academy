import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios';

function Profile({ currentUser, updatedUser }) {
    debugger
    const navigate = useNavigate()

    console.log("profile")
    console.log(currentUser)
    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setFormData] = useState({
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
    })

    const { first_name, last_name, email } = formData;


    useEffect(() => {

        if (currentUser !== false) {
            fetch('/api/users/1')
                .then(r => r.json())
                .then(data => {
                    console.log(data)
                    const newObj = {
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email: data.email
                    }
                    setFormData(newObj)
                });
        }
    }, [])


    const onSubmit = async () => {
        try {
            if (currentUser.first_name !== first_name || currentUser.last_name !== last_name) {

                const user = {
                    first_name,
                    last_name
                }
                const res = await axios.put(`/api/users/${currentUser.id}`, user);
                console.log(res.data)
                updatedUser(res.data)

            }
        } catch (error) {
            console.log(error)
            toast.error('Could not update profile details')
        }
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const onLogout = () => {
        axios.delete('/api/logout')
            .then(res => {
                navigate('/sign-in')
            })
    }


    return (
        <div className='profile'>

            {
                currentUser === false ?
                    navigate('/sign-in')
                    :
                    <>
                        <header className='profileHeader'>
                            <p className='pageHeader'>My Profile</p>
                            <button type='button' className='logOut' onClick={onLogout}>
                                Logout
                            </button>
                        </header>

                        <main>
                            <div className='profileDetailsHeader'>
                                <p className='profileDetailsText'>Personal Details</p>
                                <p
                                    className='changePersonalDetails'
                                    onClick={() => {
                                        changeDetails && onSubmit()
                                        setChangeDetails((prevState) => !prevState)
                                    }}
                                >
                                    {changeDetails ? 'done' : 'change'}
                                </p>
                            </div>

                            <div className='profileCard'>
                                <form>
                                    <input
                                        type='text'
                                        id='first_name'
                                        className={!changeDetails ? 'profileName' : 'profileNameActive'}
                                        disabled={!changeDetails}
                                        value={first_name}
                                        onChange={onChange}
                                    />
                                    <input
                                        type='text'
                                        id='last_name'
                                        className={!changeDetails ? 'profileName' : 'profileNameActive'}
                                        disabled={!changeDetails}
                                        value={last_name}
                                        onChange={onChange}
                                    />
                                    <input
                                        type='text'
                                        id='email'
                                        className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                                        disabled={!changeDetails}
                                        value={email}
                                        onChange={onChange}
                                    />
                                </form>
                            </div>
                        </main>
                    </>
            }

        </div>
    )
}

export default Profile