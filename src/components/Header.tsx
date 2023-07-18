import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <div>
            <RenderNavs />
        </div>
    )
}

const RenderNavs = () => {
    return (
        <div>
            <Link to={"/"}>Home</Link>
        </div>
    )
}
