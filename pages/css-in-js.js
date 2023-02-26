import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
font-size: 47px;
color: ${({theme}) => theme.colors.primary}
`

function CssInJs() {
  return (
    <main>
        <h1 style={{color: "gainsboro"}}>CssInJs</h1>
        <Title>Using Styled Component Css</Title>
    </main>
  )
}

export default CssInJs