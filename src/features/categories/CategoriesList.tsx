import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks"
import { useToGetCategories } from "../../hooks/forComponents"
import { increaseCategoryItemCount } from "./categoriesSlice";

// type CategoryApiListType = {
//     strCategory: string,
//     strCategoryThumb: string,
//     idCategory: string
// }

export const CategoriesList = () => {
    const categories = useToGetCategories()

    const dispatch = useAppDispatch();

    const handleClicked = (itemId: string) => {
        dispatch(increaseCategoryItemCount(itemId))
    }

    const renderCategories = (
        categories?.map((item) => {
            const { id, imgSrc, name } = item
            return (
                <div key={id} className="w-1/4 flex flex-col gap-4" onClick={() => handleClicked(`${id}`)}>
                    <h2 className="text-center text-4xl">
                        <Link to={`categories/${name}`}>{name}</Link>
                    </h2>
                    <img src={`${imgSrc}`} alt={`${name}`} />
                </div>
            )
        })
    )

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-6xl">CategoriesList</h2>
            <div className="flex gap-4 justify-around flex-wrap w-full">{renderCategories}</div>
        </div>
    )
}
