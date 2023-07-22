import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <div className="w-full">
            <RenderNavs />
        </div>
    )
}

const RenderNavs = () => {
    return (
        <div className="flex gap-x-16 justify-center text-4xl px-4">
            <Link to={"/"}>Home</Link>
            <Link to={"/cuisines"}>Cuisines</Link>
            <Link to={"/categories"}>Categories</Link>
            <Link to={"/ingredients"}>Ingredients</Link>
        </div>
    )
}
