import React from 'react'
import SignUp from './SignUp'
import LogoText from "./LogoText"
import styled from 'styled-components'


const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  background-color: rgba(143, 144, 204, 0.336)
 !important;
`
const InnerContainer = styled.div`
  background-image: url("/imgs/bg.jpg");
  background-repeat: no-repeat;
  background-size: auto;
  display: flex;
  align-items: center;
  height: 100vh;
  width: 55vw
`


export default function Landing() {
  return (
    <Container>
      <InnerContainer>
        <LogoText />
      </InnerContainer>
      <SignUp/>
    </Container>
  )
}
