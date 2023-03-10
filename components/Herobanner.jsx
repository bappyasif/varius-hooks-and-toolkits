import Image from 'next/image'
import React from 'react'
import banner from "../public/hero_banner.jpg"

export const Herobanner = () => {
  return (
    <div 
        style={{
            backgroundImage: `url(https://cdnb.artstation.com/p/assets/images/images/054/052/959/large/leon-tukker-overview.jpg?1663666082)`,
            backgroundSize: "cover",
            minHeight: "330px"
        }}
    >
        <h1 className='text-8xl text-white text-center align-middle'>Your Gaming Dashboard Is Here Finally....</h1>
    </div>
    // <Image className='max-w-2xl h-4/6' src={banner} width={990} height={270} alt={"hero banner from artist leon tukker"} />
  )
}
