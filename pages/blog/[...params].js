import { useRouter } from 'next/router'
import React from 'react'

// it will catch any routes that is in within this folder and thus routes nested in it no matter how far nested it might be
const CatchAllBlogRoutes = () => {
    const router = useRouter();
    const {params = []} = router.query;
    console.log(params)

    if(params.length === 5) {
      return <h2>blog -- {params[0]}, {params[1]} -- {params[2]}, {params[3]} -- {params[4]}</h2>
    }
  return (
    <div>CatchAllBlogRoutes</div>
  )
}

export default CatchAllBlogRoutes