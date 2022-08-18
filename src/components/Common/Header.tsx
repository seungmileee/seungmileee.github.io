import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: row;
`

const LogoImageWrapper = styled.div`
  margin: 3px;
  width: 52px;
  height: 40px;
  background: url('./logoImage.png');
`

const BlogName = styled.span`
  font-size: 40px;
  font-weight: bolder;
  color: skyblue;
`
const FindGlass = styled(FontAwesomeIcon)`
  position: absolute;
  margin-left: 10px;
  top: 15px;
  right: 260px;
`
const FindInput = styled.input`
  border: none;
  border-bottom: 2px solid black;
  position: absolute;
  top: 15px;
  right: 25px;
`

const Header: FunctionComponent = function () {
  return (
    <HeaderWrapper>
      <LogoImageWrapper />
      <BlogName>SEUNGMI</BlogName>
      <FindGlass icon={faMagnifyingGlass} />
      <FindInput type="text" placeholder="SEARCH..." />
    </HeaderWrapper>
  )
}

export default Header
