import { useEffect, useState, useRef } from 'react'

export const useAuthStatus = (currentUser) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)
    const isMounted = useRef(true)

    useEffect(() => {
        if (isMounted) {
            const data = fetch('/api/auth')
                .then(r => r.json())
            if (data != null) {
                setLoggedIn(true)
            }

            setCheckingStatus(false)
        }

        return () => {
            isMounted.current = false
        }
    }, [isMounted])

    return { loggedIn, checkingStatus }
}
