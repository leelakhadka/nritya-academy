import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios';

function Profile({ currentUser, updatedUser, createdDanceClass, logoutUser }) {
    const navigate = useNavigate()
    console.log(currentUser)
    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setFormData] = useState({
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
    })
    const [category, setCategory] = useState('')
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [start_time, setStartTime] = useState('')
    const [duration, setDuration] = useState(1)
    const [image, setImage] = useState('')

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


    const onDanceClassSubmit = async (e) => {
        e.preventDefault();

        try {
            const danceClass = {
                category,
                location,
                date,
                start_time,
                duration,
                image
            }
            console.log(danceClass)

            const response = await fetch('/api/dance_classes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(danceClass),
            })

            const data = await response.json()

            console.log(data)
            createdDanceClass(data)
            setCategory('');
            setDate('');
            setDuration(1);
            setImage('');
            setLocation('');
            setStartTime('');
            toast.success("Created " + data.category + " successfully");
        } catch (error) {
            console.log(error)
            toast.error('Could not create dance class')
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
        logoutUser('')
        navigate('/sign-in')
    }


    return (
        <div className='profile'>

            {
                currentUser === "" ?
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


                            {
                                currentUser.admin ?
                                    <>
                                        < div >

                                            <section className="danceClassForm">
                                                <header className='profileHeader'>
                                                    <p className='pageHeader'>Add a Dance Class</p>
                                                </header>
                                                <form onSubmit={onDanceClassSubmit}>
                                                    <div className='form-group'>
                                                        <input
                                                            type='text'
                                                            id='category'
                                                            value={category}
                                                            placeholder='Category'
                                                            onChange={e => setCategory(e.target.value)}
                                                        />
                                                        <input
                                                            type='text'
                                                            id='location'
                                                            value={location}
                                                            placeholder='location'
                                                            onChange={e => setLocation(e.target.value)}
                                                        />
                                                        <input
                                                            type='text'
                                                            id='date'
                                                            value={date}
                                                            placeholder='date in format 2022-11-11'
                                                            onChange={e => setDate(e.target.value)}
                                                        />
                                                        <input
                                                            type='text'
                                                            id='start_time'
                                                            value={start_time}
                                                            placeholder='start time in format 10:00 AM'
                                                            onChange={e => setStartTime(e.target.value)}
                                                        />
                                                        <input
                                                            type='number'
                                                            id='duration'
                                                            value={duration}
                                                            placeholder='duration'
                                                            onChange={e => setDuration(e.target.value)}
                                                        />
                                                        <input
                                                            type='text'
                                                            id='image'
                                                            value={image}
                                                            placeholder='image'
                                                            onChange={e => setImage(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <button className='btn btn-secondary' type='submit'>Add This Class</button>
                                                    </div>
                                                </form>
                                            </section>
                                        </div >
                                    </>
                                    :
                                    <></>
                            }
                        </main>
                    </>
            }

        </div>
    )
}

export default Profile