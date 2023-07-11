import { Link } from "react-router-dom";

export const Header = () => {
    const routes = [{ name: "posts", url: "/posts" }, { name: "users", url: "/users" }, { name: "home", url: "/" }, { name: "New Post", url: "/posts/newPost" }];

    const renderLinks = routes.map(item => (
        <Link className="text-red-600" to={item.url} key={item.name}>{item.name}</Link>
    ))
    return (
        <div className="flex justify-center gap-10">
            {renderLinks}
        </div>
    )
}
