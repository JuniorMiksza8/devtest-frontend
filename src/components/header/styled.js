import styled from 'styled-components';

export const Head = styled.header`
  height:10vh;
  width:100vw;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:40px;
  background-color:#fff;
  box-shadow:2px 0px 10px 1px rgba(0,0,0,0.2);

  @media(max-width:500px){
    flex-direction:column;
    height:15vh;
    padding:10px;
    .userOps{
      margin-top:20px;
    }
  }

  .links{
    display:flex;
    justify-content:space-around;
    width:100%;
    max-width:350px;

    .link{
      text-decoration:none;
      color:#333;
      font-size:16px;
    }

    .selected{
      color:#41b3a3 !important;
    }

  }

  .userOps{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    
    color:#333;
    font-size:18px; 

   .buttons{
      margin-top:10px;

      button{
        background:transparent;
        border:none;
        font-size:20px;
        margin-right:10px;
      }
   }

  }
`