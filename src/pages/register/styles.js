import styled from 'styled-components';

export const Container = styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  justify-content:center;
  align-items:center;

  form{
    width:100vw;
    max-width:400px;
    box-shadow:0px 1px 1px rgba(0,0,0,0.1);
    padding:20px;
    background:#ffff;
    border-radius:8px;

    h1{
      text-align:center;
      margin-bottom:20px;
      color: #333;
    }

    .input-group{
      width:100%;
      margin-bottom:20px;

      label{
        font-weight:bold;
        font-size:18px;
        color: #333;
      }

      input{
        width:100%;
        height:50px;
        border-radius:8px;
        margin-top:2px;
        border:1px solid rgba(0,0,0,0.1);
        padding:20px;
        font-size:16px;
        color:#333;
      }

    }

    button{
        width:100%;
        height:55px;
        border-radius:8px;
        border:none;
        background-color:#41B3A3;
        color:#fff;
        margin-top:18px;
        display:flex;
        align-items:center;
        justify-content:center; 
        p{
          font-size:20px;
        }

        .icon{
          color:#fff;
        }
    }

    .register{
      text-decoration:none;
      color:#41b3a3;
      display:flex;

      .icon{
        margin-right:8px;
      }
    }

  }
`