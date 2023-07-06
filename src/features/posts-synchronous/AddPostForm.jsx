import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from './postSlice'
import { selectAllUsers } from '../users/usersSlice'

export const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    // const users = useSelector(selectAllUsers)
    const dispatch = useDispatch();

    const users = useSelector(selectAllUsers)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    const onSavePostClicked = () => {
        // this works fine couldb ebettere by using a "prepare" within postSlice reducer "postAdded" action object, so that we dont duplicate same update logic ecerytime from other components as well
        // if (title && content) {
        //     dispatch(
        //         postAdded({
        //             id: nanoid(),
        //             title,
        //             content
        //         })
        //     )
        // }

        // now we can simply pass in arguments needed for "prepare" functioin within postAdded action
        if (title && content && userId) {
            dispatch(
                postAdded(title, content, userId)
            )
        }

        setContent('')
        setTitle('')
        setUserId('')
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    // making form submit button responsive to this logic
    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    disabled={!canSave}
                    onClick={onSavePostClicked}
                >Save Post</button>
            </form>
        </section>
    )
}
