import { FormEvent, useState } from "react"
import { useAppDispatch } from "../../hooks"
import { addUser } from "./usersSlice"
import { useDispatch } from "react-redux"

export const AddUser = () => {
    const [name, setName] = useState<string>("")
    const dispatch = useAppDispatch()
    // const dispatch = useDispatch()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(name, "name!!")
        if(name) {
            dispatch(addUser({name: name}))
        } else {
            alert("name cant be empty")
        }
        // dispatch(addUser(name))
        // dispatch(addUser(addUser(name)))
    }
    
    return (
        <div>
            <h2>AddUser</h2>
            <form action="" onSubmit={handleSubmit}>
            {/* <form action="" onSubmit={e => {
                e.preventDefault();
                console.log(name, "name!!")
            }}> */}
                <fieldset>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} placeholder="enter name" />
                </fieldset>
                <button type="submit">Add New User</button>
            </form>
        </div>
    )
}
