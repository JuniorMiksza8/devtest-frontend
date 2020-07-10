import styled from 'styled-components';

export const Filtros = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-top:20px;

  @media(max-width:800px){
    flex-direction:column;
    padding:20px;
    margin-top:5px;
  }

  h2{
    color:#333;
  }

  select{
    margin-left:10px;
    margin-right:10px;
    height:50px;
    border:1px solid rgba(0,0,0,0.2);
    border-radius:8px;
    color:#333;
    font-size:18px;
    width:200px;
    padding-left:10px;
  }

  input{
    width:100%;
    max-width:500px;
    height:50px;
    border:1px solid rgba(0,0,0,0.2);
    border-radius:8px;
    color:#333;
    padding:20px;
    font-size:18px;

    @media(max-width:600px){
      margin-top:10px;
    }
  }

  p{
    color:#333;
    font-size:16px;
    padding-left:50px;

    @media(max-width:600px){
      padding-left:0px;
      margin-top:10px;
    }
  }
`

export const Container = styled.div`
  height:80vh;
  width:100vw;
  margin-top:20px;
  padding:20px;
  display:flex;
  flex-wrap:wrap; 
  justify-content:center;

  .loading{
    margin-top:100px;
    transform:scale(2);
  }

  @media(max-width:767px){
    align-items:center;
    padding:0px;
  }
  

  .add-produto{
    width:350px;
    height:350px;
    background-color:#ffffff;
    border-radius:8px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-bottom:25px;
    color:#333;
    border:none;
    .icon{
      font-size:50px;
      margin-bottom:20px;
    }
    &:hover{
      filter:none;
    }
  }

  .produto{
    width:350px;
    height:350px;
    background-color:#ffffff;
    border-radius:8px;
    color:#333;
    margin-left:25px;
    padding:20px;
    margin-bottom:25px;
    

    @media(max-width:600px){
      margin-left:0px;
    }

    .title-container{
      width:100%;
      display:flex;
      justify-content:space-between;
      align-items:center;

      .icons{
        button{
          background:transparent;
          border:none;
          margin-left:10px;
        }
      }

    }

    .description{
      width:100%;
      height:150px;
      overflow-y:scroll;
      margin-top:5px;
      line-height:20px;
      text-align:justify;
      padding:10px;

      ::-webkit-scrollbar-track {
        background-color: #F4F4F4;
      }
      ::-webkit-scrollbar {
        width: 6px;
        background: #F4F4F4;
      }
      ::-webkit-scrollbar-thumb {
        background: #41b3a3;
      }
    }

    .numbers{
      width:100%;
      padding:20px;
      display:flex; 
      justify-content:space-between;
      align-items:center;
      
      div{
        text-align:center;
      }

    }

    .categoria{
      font-size:16px;
      text-align:center;
    }
  }
`