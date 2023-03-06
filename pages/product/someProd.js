import React from 'react'

// when routes to /product/someProd, will render this page instead of dynamic page
// routes will always match with more specific route before rendering any dynamic routes
// when route can match to a more specific route, next js will render that page unless not found only then dynamic route will be rendered (when exists)
function SomeProd() {
  return (
    <div>Some Prod</div>
  )
}

export default SomeProd