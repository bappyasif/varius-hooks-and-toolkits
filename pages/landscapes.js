import Image from "next/image"
import img from "@/public/people_on_rice_fields.jpg"

function LandscapesPage() {
    const imgsNames = ["a_view_of_bandarban", "a_view_of_hatir_jheel", "a_view_of_river",
        "farm_land_near_river_banks", "people_on_rice_fields", "rice_field_near_river_bank",
        "sundarban"]
    return (
        <main>
            <h1>LandscapesPage</h1>
            {/* using a placeholder image until it loads, thus removing layout shift which hamper in smooth user expirience */}
            <Image src={img} width="340" height={"450"} placeholder={"blur"} />
            <br />
            {
                // even though using img is very useful but unless its been served optimized images, it might affect app performance noticeably
                // thats where nextjs Image element seems to be very useful, cause it optimizes imgaes before rendering, thus improving app performance
                // imgsNames.map(path => <img src={`/${path}.jpg`} alt={path} width="340" height={"450"} />)

                // apart from image optimization, Image element also has "lazy loading" feature is included, which means picture will load only when viewport comes into view
                // apart from lazy loading Image  elemnt also provides a placeholder image of actual image till gets downloaded and rendered
                // imgsNames.map(path => <Image src={`/${path}.jpg`} blurDataURL={img} placeholder={"blur"} alt={path} width="340" height={"450"} />)

                // placeholder img needs to be a static import img instead of path to that image, when used blurDataURL, its recommended not to use placeholder, as this can cause error while rendering
                imgsNames.map(path => <Image src={`/${path}.jpg`} blurDataURL={img} alt={path} width="340" height={"450"} />)
            }
        </main>
    )
}

export default LandscapesPage