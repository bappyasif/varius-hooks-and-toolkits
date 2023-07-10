import { AddUser } from "../features/users/AddUser"
import { RemoveUser } from "../features/users/RemoveUser"
import { UpdateUser } from "../features/users/UpdateUser"
import { UsersLists } from "../features/users/UsersLists"

export const Users = () => {
  return (
    <div>
        <h2>Users</h2>
        <UsersLists />
        <AddUser />
        <RemoveUser />
        <UpdateUser />
    </div>
  )
}
