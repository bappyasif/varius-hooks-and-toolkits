import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
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
    const [errorsWhileAddingMoviesIntoList, setErrorsWhileAddingMoviesIntoList] = useState()

    const { id, title, backdrop_path, poster_path, overview, vote_average, release_date } = item;

    const { mutate: addToFavourite } = useMutation({
        mutationFn: newItem => {
            return axios.post("http://localhost:4000/favourites", newItem)
                .then(() => console.log("added new favourite movie"))
                .catch(err => {
                    // console.log(err.message);
                    setErrorsWhileAddingMoviesIntoList(prev => ({ ...prev, "favourites": err.response.data.includes("duplicate id") ? "Already Exists In Favourites Movies List :)" : err.message }))
                })
        }
    })

    const { mutate: addToWishlist } = useMutation({
        mutationFn: newItem => axios.post("http://localhost:4000/wishlist", newItem)
        .then(() => console.log("added a new movie to wishlist"))
        .catch(err => {
            // console.log(err.message, err.response.data.includes("duplicate id"), err);
            setErrorsWhileAddingMoviesIntoList(prev => ({ ...prev, "wishlist": err.response.data.includes("duplicate id") ? "Already Exists In Wishlist :)" : err.message }))
        })
    })

    // const router = useRouter()

    const handleAddToFavourite = () => {
        addToFavourite({ id: id, title: title, poster_path, release_date, vote_average })
        // router.push("/movie/favourites", undefined, { shallow: true })
    }

    const handleAddToWishlist = () => {
        addToWishlist({ id: id, title: title, poster_path, release_date, vote_average })
    }

    const clearErrorsMessages = () => {
        const timer = setTimeout(() => {
            if (errorsWhileAddingMoviesIntoList?.favourites) {
                setErrorsWhileAddingMoviesIntoList(prev => ({ ...prev, "favourites": null }))
            } else if (errorsWhileAddingMoviesIntoList?.wishlist) {
                setErrorsWhileAddingMoviesIntoList(prev => ({ ...prev, "wishlist": null }))
            }
        }, 2000)

        return () => clearTimeout(timer)
    }

    useEffect(() => {
        clearErrorsMessages()
    }, [errorsWhileAddingMoviesIntoList])

    useEffect(() => {
        setErrorsWhileAddingMoviesIntoList({favourites: null, wishlist: null})
    }, [])

    return (
        <>
            <Link href={forDetail ? "#" : `/movie/${id}`}>
                <h2>{title}</h2>
                <img src={`https://image.tmdb.org/t/p/original${poster_path}`} width={330} height={220} alt={title} />
            </Link>
            <h3>{release_date} -- {vote_average}</h3>
            <div style={{ backgroundColor: forDetail && "rgba(29,20,20,.4)", color: forDetail && "whitesmoke" }}>
                <h4>{overview}</h4>

                {errorsWhileAddingMoviesIntoList?.favourites ? <h4>{errorsWhileAddingMoviesIntoList?.favourites}</h4> : null}
                {errorsWhileAddingMoviesIntoList?.wishlist ? <h4>{errorsWhileAddingMoviesIntoList?.wishlist}</h4> : null}

                <div className="flex flex-row justify-center gap-6">
                    <h5>Like this Movie: <button><FaHeart onClick={handleAddToFavourite} fill="red" /></button></h5>
                    <h5>Add this To Wishlist: <button onClick={handleAddToWishlist}><FaCloud fill="magenta" /></button></h5>
                </div>
            </div>
        </>
    )
}