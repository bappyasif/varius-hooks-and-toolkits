import { FormEvent, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { PostType, addPost } from "./postsSlice";
import { v4 as uuid } from "uuid"

export const AddNewPost = () => {
    const dispatch = useAppDispatch();

    const posts = useAppSelector(state => state.posts.posts);

    const userPostsOnly = (userId:number) => posts.filter(item => item.userId === Number(userId))

    const handleAdd = (data: PostType) => {
        // data.id = userPostsOnly(data.userId).length + 1
        data.id = posts.length + userPostsOnly(data.userId).length + 1
        dispatch(addPost(data))
        // data.userId = 
        // console.log(data, "post Data!!", foundUser(data.userId))
    }
    return (
        <div className="flex flex-col gap-4">
            <h1>AddNewPost</h1>
            {/* <NameSelector /> */}
            <PostForm handleAdd={handleAdd} />
        </div>
    )
}

type FormType = {
    handleAdd: (data: PostType) => void
}

const PostForm = ({ handleAdd }: FormType) => {
    const ref = useRef(document.querySelector("form") as HTMLFormElement)
    // const ref = useRef<HTMLFormElement>(document.querySelector("form") as HTMLFormElement)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const formData = new FormData(e.target)
        // const formData = new FormData(e.currentTarget)
        const formData = new FormData(ref.current)
        const title = formData.get("Title") as string
        const body = formData.get("Body") as string
        const userId = Number(formData.get("name"))
        // const postData = { title, id: uuid(), userId, body }
        const postData = { title, id: 11, userId, body, up: 0, down: 0 }
        handleAdd(postData)
        console.log(formData.get("name"), "fiormData", formData.getAll("name"))
        ref.current.reset()
    }

    return (
        <form ref={ref} className="flex flex-col gap-4" action="" onSubmit={handleSubmit}>
            {/* {nameSelector} */}
            <NameSelector />
            <RenderFields />
            <button>Add post</button>
        </form>
    )
}

const NameSelector = () => {
    const users = useAppSelector(state => state.postsUsers.users)

    const usersOptions = users.map(item => (
        <option key={item.id} value={item.id}>{item.name}</option>
    ))

    const nameSelector = (
        <select className="bg-transparent flex justify-center mx-auto w-2/4" name="name" id="name">
            <option value="-1">Choose User</option>
            {usersOptions}
        </select>
    )

    return nameSelector
}

const RenderFields = () => {
    // const fields = ["Name", "Title", "Body"];
    const fields = ["Title", "Body"];
    const renderFields = fields.map(name => (
        <fieldset className="flex flex-col w-1/2" key={name}>
            <label htmlFor={name}>{name}</label>
            {
                name === "Body"
                    ? <textarea name="Body" id="Body"></textarea>
                    : <input name={name} type="text" id={name} placeholder="Type Here...." />
            }
        </fieldset>
    ))

    return (
        <div className="flex flex-col gap-4 items-center">{renderFields}</div>
    )
}