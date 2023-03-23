import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
font-size: 42px;
color: ${({theme}) => theme.colors.primary}
`

const CssInJs = () => {
    return (
        <>
            <div style={{ color: "darkred" }}>CssInJs - Inline Styling</div>
            <Title>CssInJs - Styled Componenets</Title>
        </>
    )
}

export default CssInJs