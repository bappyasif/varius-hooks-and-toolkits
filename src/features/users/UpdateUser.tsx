import { ChangeEvent, useState } from "react";
import { RootState } from "../../app/store"
import { useAppDispatch } from "../../hooks";
import { useUsersSelector } from "../../hooks/forUsers"
import { updateUser } from "./usersSlice";

export const UpdateUser = () => {
    const [updatedName, setUpdatedName] = useState<string>("")

    const selectedUser = useUsersSelector((state: RootState) => state.users.selected)

    const dispatch = useAppDispatch();

    const handleUpdate = () => {
        dispatch(updateUser(updatedName))
        setUpdatedName("")
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setUpdatedName(e.target.value)
    }

    return (
        <div>
            <h2>UpdateUser</h2>
            <input type="text" defaultValue={selectedUser} onChange={handleChange} />
            <button onClick={handleUpdate}> Update User : "{selectedUser}" with "{updatedName}"</button>
        </div>
    )
}
