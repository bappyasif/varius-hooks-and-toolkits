import Link from 'next/link'
import React from 'react'

const PreviewHome = ({enabled}) => {
    return (
        <>
            <div>PreviewHome</div>
            {
                enabled
                ? <Link href={`/api/preview/disable?redirect=/for-preview`}>Disable Preview</Link>
                : <Link href={`/api/preview?redirect=/for-preview/news`}>Enable Preview</Link>
            }
        </>
    )
}

export const getStaticProps = context => {
    const enabled = context?.preview
    return {
        props: {
            enabled: enabled ? enabled : null
        }
    }
}

export default PreviewHome