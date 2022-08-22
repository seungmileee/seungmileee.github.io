import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

type PostoutlineProps = {
  content: string
}

const Toc = styled.div`
  /* top: 0;
  flex-grow: 0;
  max-width: calc(100% / 3);
  flex-basis: calc(100% / 3);
  margin-left: 1rem;
  max-width: 18rem;
  max-height: calc(100vh - 200px);
  position: sticky;
  overflow: auto; */
  /* border: 1px solid red; */
  margin-top: 20px;
  font-size: 13px;
  color: silver;
  max-width: 18rem;
  flex-grow: 0;
  flex-basis: calc(100% / 3);
  max-height: calc(100vh - 200px);
  overflow: auto;

  ul,
  li {
    list-style: none;
  }

  /* position: absolute;
  right: 5px;
  top: 32rem; */
`
const Outline: FunctionComponent<PostoutlineProps> = function ({ content }) {
  return (
    // <div
    // 스타일링을 위해서 클래스이름 부여 한다.
    // className="table-of-content"

    // dangerouslySetInnerHTML는 보안 관점에서 위험하지만
    // innerHTML을 사용하겠다는 뜻이다.
    // dangerouslySetInnerHTML={{ __html: content }}
    // />
    <Toc dangerouslySetInnerHTML={{ __html: content }} />
  )
}

export default Outline
