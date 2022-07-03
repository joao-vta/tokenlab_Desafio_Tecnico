import React, {useState} from 'react';
import axios from "axios";
import { useCookies } from "react-cookie";
import '../css/Login.css'

function MainPage() {
  const [currState, setState] = useState({ "warning": ""});
  const [cookies, setCookie] = useCookies();

  async function login() {
    let form = document.getElementById('loginForm');
    let password = form.loginPassword.value;
    let username = form.loginUsername.value;

    let response = await axios.post('http://localhost:5300/user/login', {
      "username" : username,
      "password" : password
    }).catch((error) => {
      console.log(error.response.data);
      setState({"warning" : error.response.data})
    })
    
    if (response != undefined && response.status == 200) {
      console.log("Session set");
      setCookie("userID", response.data._id);
      setCookie("username", username);
      setState({"warning" : ""});
      window.location.reload();
    }
  }

  async function cadastro() {

    let form = document.getElementById('loginForm');
    let password = form.loginPassword.value;
    let username = form.loginUsername.value;

    let response = await axios.post('http://localhost:5300/user/register', {
      "username" : username,
      "password" : password
    }).catch((error) => {
      console.log(error.response.data);
      setState({"warning" : error.response.data})
    })

    console.log(response);
    
    if (response != undefined && response.status == 200) {
      setState({"success" : "Cadastro efetuado com sucesso"})
    }
  }

  return (

    <div class="loginRoot">
  <div class='loginDiv'>
  <h2> Login</h2>

    {currState.warning &&
    <div class="alert alert-warning" role="alert">
        {currState.warning}
    </div>
    }

    {currState.success &&
    <div class="alert alert-success" role="alert">
        {currState.success}
    </div>
    }

    <form class='loginForm' id='loginForm'>

      <div class="form-outline mb-4">
        <input type="username" class="form-control" id="loginUsername"/>
        <label class="form-label">Nome de usuário</label>
      </div>
      
      <div class="form-outline mb-4">
        <input type="password" class="form-control" id="loginPassword"/>
        <label class="form-label">Senha</label>
      </div>
      
      <div class="row mb-4">
        <div class="col d-flex justify-content-center">
          <button type="button" class="btn btn-success btn-block mb-4" 
            onClick={()=>{login()}}>Login</button>
        </div>
        <div class="col d-flex justify-content-center">
          <button type="button" class="btn btn-primary btn-block mb-4"
            onClick={()=>{cadastro()}}>Cadastro</button>
        </div>
      </div>
    
      <div class="row mb-4">
        <div class="col d-flex justify-content-center">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" />
            <label class="form-check-label"> Lembre de mim </label>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
  );
}

export default MainPage;
