import styled from 'styled-components';

export const Wrapper = styled.div`
  width:100vw;
  height:100vh;
  background-color:rgba(0,0,0,0.2);
  position:fixed;
  display:flex;
  justify-content:center;
  align-items:center;
  transition:display 500ms ease-in;

  form{
    width:100vw;
    max-width:450px;
    box-shadow:0px 1px 1px rgba(0,0,0,0.1);
    padding:20px;
    background:#ffff;
    border-radius:8px;
    position:absolute;

    .title{
      display:flex;
      justify-content:space-between;
      align-items:center;
      width:100%;

      h1{
        color: #333;
      }

      button{
        background:transparent;
        width:40px;
        height:40px;
        margin-bottom:30px;
        h2{
          color:red;

        }
      }

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

      textarea{
        width:100%;
        height:100px;
        resize:none;
        border-radius:8px;
        margin-top:2px;
        border:1px solid rgba(0,0,0,0.1);
        padding:10px;
        font-size:16px;
        color:#333;
      }

      select{
        width:100%;
        height:50px;
        border-radius:8px;
        margin-top:2px;
        padding-left:20px;
        border:1px solid ${props => props.error === true ? 'red' : 'rgba(0,0,0,0.1)'};
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
`