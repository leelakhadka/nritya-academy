import { useNavigate } from 'react-router-dom'

function Navbar({ currentUser }) {
    const navigate = useNavigate()

    return (
        <footer className='navbar'>
            <nav className='navbarNav'>
                <ul className='navbarListItems'>
                    <li className='navbarListItem' onClick={() => navigate('/available_classes')}>
                        <p>
                            Available Classes
                        </p>
                    </li>
                    {
                        currentUser.admin ? <></> :
                            <li className='navbarListItem' onClick={() => navigate('/bookings')}>
                                <p>
                                    My Schedule
                                </p>
                            </li>
                    }

                    <li className='navbarListItem' onClick={() => navigate('/profile')}>
                        <p>
                            Profile
                        </p>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}

export default Navbar