import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'

const PrivateRoute = ({ currentUser }) => {
    const { loggedIn, checkingStatus } = useAuthStatus(currentUser)

    if (checkingStatus) {
        return <p>Loading...</p>
    }

    return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoute