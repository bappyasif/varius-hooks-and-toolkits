import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { FaCloud, FaHeart } from "react-icons/fa"

export const ItemsRenderables = ({ data }) => {
    const renderData = () => data?.map(item => <RenderData key={item.id} item={item} />)
    return (
        <section className="flex flex-row flex-wrap justify-evenly gap-4">
            {renderData()}
        </section>
    )
}


const RenderData = ({ item }) => {
    const { id, title, backdrop_path, poster_path, overview, vote_average, release_date } = item;
    console.log(poster_path)
    return (
        <article className="w-1/5">
            {/* <Image src={`${poster_path}`} width={330} height={220} /> */}
            {/* <Image src={poster_path} width={330} height={220} /> */}
            {/* <Image src={`https://image.tmdb.org/t/p/original/130H1gap9lFfiTF9iDrqNIkFvC9.jpg`} width={330} height={220} /> */}
            {/* <Image src={`${poster_path}`} width={330} height={220} alt={title} /> */}
            {/* <Image src={`https://image.tmdb.org/t/p/original${poster_path}`} width={330} height={220} alt={title} /> */}

            {/* <Link href={`/movie/${id}`}>
                <h2>{title}</h2>
                <img src={`https://image.tmdb.org/t/p/original${poster_path}`} width={330} height={220} alt={title} />
            </Link>
            <h3>{release_date} -- {vote_average}</h3>
            <h4>{overview}</h4>
            <p className="flex flex-row justify-center gap-2">
                <h5>Like this Movie: <FaHeart fill="red" /></h5>
                <h5>Add this To Wishlist <FaCloud fill="skyblue" /> </h5>
            </p> */}

            <RenderMovie item={item} />
        </article>
    )
}

export const RenderMovie = ({ item, forDetail }) => {
    const { id, title, backdrop_path, poster_path, overview, vote_average, release_date } = item;
    
    const {mutate: addFavourite} = useMutation({
        mutationFn: newItem => {
            return axios.post("http://localhost:4000/favourites", newItem).then(()=>console.log("added new favourite movie")).catch(err=>console.log(err))
        }
    })

    return (
        <>
            <Link href={`/movie/${id}`}>
                <h2>{title}</h2>
                <img src={`https://image.tmdb.org/t/p/original${poster_path}`} width={330} height={220} alt={title} />
            </Link>
            <h3>{release_date} -- {vote_average}</h3>
            <div style={{backgroundColor: forDetail && "rgba(29,20,20,.4)", color: forDetail && "whitesmoke"}}>
                <h4>{overview}</h4>
                <div className="flex flex-row justify-center gap-6">
                    <h5>Like this Movie: <FaHeart onClick={() => addFavourite({id: id, title: title})} fill="red" /></h5>
                    <h5>Add this To Wishlist <FaCloud fill="skyblue" /> </h5>
                </div>
            </div>
        </>
    )
}