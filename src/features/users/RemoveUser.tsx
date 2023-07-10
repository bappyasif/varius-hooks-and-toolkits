import { RootState } from "../../app/store"
import { useAppDispatch } from "../../hooks"
import { useUsersSelector } from "../../hooks/forUsers"
import { deleteUser } from "./usersSlice"

export const RemoveUser = () => {
    const selectedUser = useUsersSelector((state: RootState) => state.users.selected)

    const dispatch = useAppDispatch();

    const handleDelete = () => {
        dispatch(deleteUser(selectedUser))
    }

    return (
        <div>
            <h2>RemoveUser</h2>
            <button onClick={handleDelete}> Delete User : "{selectedUser}"</button>
        </div>
    )
}
