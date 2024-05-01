'use client'
import {fetchUserData, UserData} from "@/app/dashboard/action.ts";
import {useEffect, useState} from "react";

export default function Dashboard() {

    const [userData, setUserData] = useState<UserData>(null)

    useEffect(() => {
        if (!userData) {
            const fetchUser = async () => {
                const user = await fetchUserData()
                setUserData(user)
            }

            fetchUser()
        }
    }, [userData])

    if (!userData) {
        return <p>Loading...</p>
    }

    console.log(userData.user)

    if (!userData.user.isAuthorized) {
        return <p>Unauthorized</p>
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard {userData.user.userID}</p>
        </div>
    )
}
