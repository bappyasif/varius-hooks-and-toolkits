import { Footer } from '@/layouts/footer'
import Head from 'next/head'
import React from 'react'

const CustomLayout = () => {
    return (
        <>
        <Head>
            <title>Custom Layout</title>
            <meta name='description' content='making use of custom layout with metadata' />
        </Head>
        <div className='content'>CustomLayout</div>
        </>
    )
}

CustomLayout.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
            <Footer />
        </>
    )
}

export default CustomLayout