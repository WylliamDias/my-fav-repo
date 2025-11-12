import { Link } from "react-router";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  background: #FFF;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 150px;
    border-radius: 20%;
    margin: 20px 0;
  }
  
  h1 {
    font-size: 30px;
    color: #0D2636;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #000;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
  }
`;

export const Loading = styled.div`
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const BackButton = styled(Link)`
  border: 0;
  outline: 0;
  background: transparent;
`;

export const IssuesSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-top: 1px solid #eee;
  margin-top: 30px;
  padding-top: 30px;

  & > div {
    display: flex;
    width: 50%;
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
    gap: 0.7rem;
    border-bottom: 1px solid #222;

    button {
      border: 2px solid transparent;
      outline: 0;
      color: #FFF;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      padding: 5px 7px;
      flex: 1;
      opacity: 0.5;
      transition: 0.7s;

      &:disabled {
        cursor: not-allowed;
        border-color: #312806;
        opacity: 1;
      }

      &:hover {
        opacity: 1;
      }
    }
  }
`;

export const IssuesList = styled.ul`
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;

    & + li {
      margin-top: 12px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50px;
      border: 2px solid #0D2636;
    }

    div {
      flex: 1;
      margin-left: 12px;
      
      strong {
        font-size: 15px;

        a {
          text-decoration: none;
          color: #222;
          transition: 0.6s;

          &:hover {
            color: #0071db
          }
        }

        span {
          background: #222;
          color: #FFF;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          padding: 5px 7px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 10px;
        font-size: 12px;
        color: #000;
      }
    }
  }
`;

export const PageActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    outline: 0;
    border: 0;
    background: #222;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }
    
  }
`;