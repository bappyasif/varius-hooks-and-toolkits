import React from 'react'

export const RenderNewsArticles = ({data}) => {
    const renderData = () => data?.map((item, idx) => <RenderArticle key={item.title + idx} item={item} idx={idx} />)
  return (
    <section className='gap-8 xs:columns-1 md:columns-2 lg:columns-3 px-2'>
        {renderData()}
    </section>
  )
}

const RenderArticle = ({item, idx}) => {
    const {title, content, description, link, image_url, video_url} = item

    return (
        <article className='text-xl'>
            <h2 className='text-4xl text-red-400'>{title}</h2>
            <p className='hover: bg-slate-200'>{description}</p>
            <img className='w-full aspect-square mb-6 m-auto' src={image_url ? image_url : `https://picsum.photos/500/300?random=${idx}`} alt={title} />
            <h3 className='bg-zinc-200'>{content}</h3>
            {video_url ? <video className='w-full aspect-video mb-6 m-auto' controls src={video_url ? video_url : "https://picsum.photos/200/300"} alt={description} /> : null}
            <button className='bg-blue-600 p-1 px-2 mb-4 rounded-lg'><a target={"_blank"} href={link}>Click Here To Read From Source Site</a></button>
        </article>
    )
}
