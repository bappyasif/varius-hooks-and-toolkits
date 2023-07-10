import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { useUsersSelector } from "../../hooks/forUsers"
import { UsersListType, selectedUser, usersList } from "./usersSlice"
import { ChangeEvent } from "react"
import { useAppDispatch } from "../../hooks"

export const UsersLists = () => {
  const postsLists = useUsersSelector((state: RootState) => state.users.users)
  // const postsLists = usePostsListsSelector
  // const listsUsingHook:UsersListType = useSelector(usersList)
  // const {users:UsersListType} = useSelector(usersList)

  const selectedOption = useUsersSelector((state: RootState) => state.users.selected)
  
  console.log(postsLists, "postslsit1!", selectedOption)

  const dispatch = useAppDispatch()

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectedUser({name: e.target.value}))
  }

  const usersOptions = postsLists.map((item, idx) => (
    <option key={item.name + idx} value={item.name}>{item.name}</option>
  ))

  const renderUsers = (
    <select name="users" id="users" onChange={handleSelectChange}>
      <option value="-1">Choose user</option>
      {usersOptions}
    </select>
  )

  return (
    <div>
      <h2>PostsLists {postsLists?.length}</h2>
      <h2>{JSON.stringify(postsLists)}</h2>
      {renderUsers}
      <h2></h2>
    </div>
  )
}
