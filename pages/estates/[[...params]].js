import { useRouter } from 'next/router'
import React from 'react'

// optional catch all routes syntax [[...params]].js instead of [...params].js
function RealEstateCatchAll() {
    const router = useRouter();
    const {params = []} = router.query;
    if(params.length === 2) {
        return (
            <h2>Viewing estates price ranging from {params[0]} to {params[1]}</h2>
        )
    } else if(params.length === 1) {
        return (
            <h2>Viewing estates listings for price ${params[0]}</h2>
        )
    }

  return (
    <div>RealEstateCatchAll</div>
  )
}

export default RealEstateCatchAll