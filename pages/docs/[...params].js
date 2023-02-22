import { useRouter } from 'next/router'
import React from 'react'

// we can render any combination of "/docs/" such as http://localhost:3000/docs/1/some/2 to this page, known as Catch All Routes
function Docs() {
    const router = useRouter();
    // const {params} = router.query;

    // to avoid getting undefined error at rendering initially, we are initializing it with an empty array
    // this time params wil be an array which will include dynamics routes thats in it
    const {params = []} = router.query;
    console.log(params)

    // making a informed choice to show different contents when params length are different before showing up catch all route page
    if(params.length === 2) {
        return (
            <h2>Viewing docs for feature {params[0]} and concept {params[1]}</h2>
        )
    } else if(params.length === 1) {
        return (
            <h2>Viewing docs for feature {params[0]}</h2>
        )
    }

    return (
      <div>Docs Page Catch All Routes Example</div>
    )
  }

// // we can render any com,bination opf "/docs/" such as http://localhost:3000/docs/1/some/2 to this page, known as Catch All Routes
// function Docs() {
//   return (
//     <div>Docs Page Catch All Routes Example</div>
//   )
// }

export default Docs