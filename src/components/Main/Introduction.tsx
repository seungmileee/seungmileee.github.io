import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import ProfileImage from 'components/Main/ProfileImage'

type IntroductionProps = {
  profileImage: IGatsbyImageData
}

const Background = styled.div`
  width: 100%;
  background: url(./banner.png);
  color: #ffffff;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 768px;
  height: 400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
    padding: 0 20px;
  }
`

const SubTitle = styled.div`
  font-size: 30px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 25px;
    font-weight: lighter;
  }
`

const Title = styled.div`
  margin-top: 5px;
  font-size: 40px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 25px;
  }
`

const Introduction: FunctionComponent<IntroductionProps> = function ({
  profileImage,
}) {
  return (
    <Background>
      <Wrapper>
        <ProfileImage profileImage={profileImage} />
        <div>
          <Title>Seungmi</Title>
          <SubTitle>
            Hi! Thank You for Visiting My Blog!
            <br /> Have a Nice Day :)
          </SubTitle>
        </div>
      </Wrapper>
    </Background>
  )
}

export default Introduction
