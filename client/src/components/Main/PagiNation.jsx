import React from 'react'
import styled from 'styled-components'

const PagiNation = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <nav>
        <PageUl className="pagination">
          {pageNumbers.map((number) => (
            <PageLi key={number} className="page-item">
              <PageSpan onClick={() => paginate(number)} className="page-link">
                {number}
              </PageSpan>
            </PageLi>
          ))}
        </PageUl>
      </nav>
    </div>
  );
}

export default PagiNation


const PageUl = styled.ul`
  float: left;
  margin-top: 30px;
  list-style: none;
  text-align: center;
  border-radius: 3px;
  color: ${(props)=>props.theme.textCloro};
  padding: 1px;
  border-top: 3px solid ${(props)=>props.theme.HeLogoColor};
  border-bottom: 3px solid ${(props)=>props.theme.HeLogoColor};
  background-color: ${(props)=>props.theme.HeaderColor};
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 15px;
  font-weight: 600;
  padding: 3px;
  border-radius: 5px;
  width: 25px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: ${(props)=>props.theme.HeLogoColor};
  }
  &:focus::after {
    color: white;
    background-color: ${(props)=>props.theme.HeLogoColor};
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }
`;