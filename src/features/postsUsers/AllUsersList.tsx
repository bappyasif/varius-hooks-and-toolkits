import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchUsers } from "../posts/fetchRequests";
import { Link } from "react-router-dom";

export const AllUsersList = () => {
    const users = useAppSelector(state => state.postsUsers.users)
    
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const renderUsersList = users.map(item => {
        return (
            <Link to={`/users/${item.id}`}>{item.name} -- {item.username} -- {item.email}</Link>
        )
    })

    return (
        <div>
            <h1>AllUsersList</h1>
            {/* {JSON.stringify(users)} */}
            <div className="flex flex-col gap-4">
                {renderUsersList}
            </div>
        </div>
    )
}