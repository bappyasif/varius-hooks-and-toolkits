import {createSlice, configureStore} from "@reduxjs/toolkit"

const initialState = {
    begin: false,
    // ready: false,
    name: "",
    ageGroup: -1,
    age: 0,
    enrolled: false
}

const appSlice = createSlice({
    name: "student info system redux-store",
    initialState: initialState,
    reducers: {
        handleBegin: (state) => {
            // console.log(state.begin, "state")
            state.begin = !state.begin
        },
        
        handleName: (state, action) => {
            state.name = action.payload
        },
        
        handleGroup: (state, action) => {
            state.ageGroup = action.payload
        },
        
        handleAge: (state, action) => {
            state.age = action.payload
        },
        
        handleEnrolled: (state) => {
            state.enrolled = !state.enrolled
        },

        handleReset: (state) => {
            state.begin = false;
            state.age = 0;
            state.ageGroup = -1;
            state.name = ""
            state.enrolled = false
        }
    }
})

export const {handleBegin, handleAge, handleGroup, handleName, handleEnrolled, handleReset} = appSlice.actions;

const store = configureStore({
    reducer: appSlice.reducer
})

export default store;