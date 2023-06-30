import { useDispatch, useSelector } from "react-redux";
import { handleAge, handleGroup } from "../store";

export const AgeGroup = (props) => {
    const dispatch = useDispatch();

    const ageGrp = useSelector(state => state.ageGroup)

    const handleAgeGroup = (e) => {
        dispatch(handleGroup(e.target.value))
        props.actions.actions.handleAgeGroup()
    }

    const options = ["18-40", "41-62", "63-84", "85-and above"];

    const renderOptions = () => options.map(val => <option key={val} value={val}>{val}</option>)

    return (
        <select name="age group" id="ageGroup" value={ageGrp} onChange={handleAgeGroup}>
            <option value="-1">Choose Your Age Group</option>
            {renderOptions()}
        </select>
    )
}

export const StudentAge = (props) => {
    // const [age, setAge] = useState(0);
    const ageGroup = useSelector(state => state.ageGroup)

    const getMin = () => ageGroup.split("-")[0]

    const getMax = () => ageGroup.split("-")[1]

    const dispatch = useDispatch();

    const age = useSelector(state => state.age)

    const handleAgeOfStudent = (e) => {
        // setAge(e.target.value);
        dispatch(handleAge(e.target.value))
    }

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            if (age < getMin()) {
                alert("age is below minimum age")
            } else if (age > getMax()) {
                alert("age is above maximum age")
            } else {
                // console.log("all good!!", props)
                props.actions.actions.handleStudentAge()
            }
        }
    }

    return (
        <fieldset>
            <label htmlFor="age">Enter Your Age</label>
            <input type="text" id='age' value={age} onChange={handleAgeOfStudent} onKeyUp={handleEnter} />
            <p style={{ fontSize: "11px", color: "purple" }}>age must be within your selected age group</p>
            <p style={{ fontSize: "11px", color: "purple" }}>and hit enter when you are done</p>
        </fieldset>
    )
}