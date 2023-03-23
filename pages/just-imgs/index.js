import Image from 'next/image'
import React from 'react'
// import img from "../../public/images/1.jpg"
import img from "@/public/images/1.jpg"

const JustImages = () => {
    return (
        <>
            <div>JustImages</div>
            <Image src={img} placeholder={"blur"} alt="placeholder image in blurred to avoid layout shifts" width={290} height={490} />
            {
                [1, 2, 3, 4, 5, 6].map(path => <Image src={`/images/${path}.jpg`} blurDataURL={`/images/${path}.jpg`} width={290} height={420} alt={path} />)
                // [1, 2, 3, 4, 5, 6].map(path => <Image src={`/images/${path}.jpg`} width="290" height="4200" alt={path} />)
                // [1, 2, 3, 4, 5, 6].map(path => <img src={`/images/${path}.jpg`} width="290" height={"420"} alt={path} />)
            }
        </>
    )
}

export default JustImages