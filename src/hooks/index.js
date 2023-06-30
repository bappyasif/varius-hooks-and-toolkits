import { useSelector } from "react-redux"

export const useGetStoreStates = () => {
    // const ready = useSelector(state => state.ready);
    const name = useSelector(state => state.name);
    const ageGroup = useSelector(state => state.ageGroup);
    const age = useSelector(state => state.age);
    const enrolled = useSelector(state => state.enrolled);

    return {
        age, name, ageGroup, enrolled
    }
}