import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleEnrolled } from "../store";

export const StudentEnrolled = (props) => {
    return (
        <div>
            <h2>Student Enrolled Completed. Congratulation you are now officially enrolled :)</h2>
            <CountdownBeforeExitingChatbot />
        </div>
    )
}

export const CountdownBeforeExitingChatbot = () => {
    const [count, setCount] = useState();

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const countDown = () => {
        const timer = setTimeout(() => {
            if (count <= 1) {
                clearTimeout(timer)
                navigate("/confirmation")
            } else {
                setCount(prev => {
                    return count - 1
                })
            }
        }, 1000)

        return () => clearTimeout(timer)
    }

    useEffect(() => {
        setCount(5);
        dispatch(handleEnrolled())
    }, [])

    useEffect(() => {
        count && countDown()
    }, [count])

    return (
        <div>
            <h2>Thank you. In 5 seconds, bot will exit</h2>
            <StyledCountdown count={count} />
        </div>
    )
}

const StyledCountdown = ({ count }) => {
    const [styledCounts, setStyledCounts] = useState([]);

    const styleIt = () => {
        if (count === 1) {
            setStyledCounts(prev => [...prev, `${count}`])
        } else if (count % 2 === 0) {
            setStyledCounts(prev => [...prev, `${count}...`])
        } else if (count % 2 !== 0) {
            setStyledCounts(prev => [...prev, `${count}..`])
        }
    }

    const renderStyleIt = () => styledCounts.map(item => <span key={item}>{item}</span>)

    useEffect(() => {
        count && styleIt()
    }, [count])

    return (
        <div>{renderStyleIt()}</div>
    )
}