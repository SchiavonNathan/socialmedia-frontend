import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from 'jwt-decode';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email,
        password,
      });

      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user_id', response.data.user_id);

      alert(`Login bem-sucedido! token: ${response.data.access_token}`);
      navigate('/home');

    } catch (error) {
      setError('Email ou senha incorretos.');
    }
  };

  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:3001/auth/facebook';
  };

  //------------------------google--------------------------------------
  function handleCallbackResponse(response){
    console.log("TOKEN JWT ENCODED: " + response.credential)
    var userObject = jwtDecode(response.credential)
    console.log(userObject);

    axios.post('http://localhost:3001/users/googlelogin', {
      email: userObject.email,
      given_name: userObject.given_name,
      family_name: userObject.family_name,
      picture: userObject.picture,
    })
    .then(res => {
        localStorage.setItem('user_id', res.data[0].id);
        console.log("Resposta do backend: ", res.data);
        alert(`Login bem-sucedido! token`);
        navigate('/home');
    })
    .catch(err => {
        console.error("Erro ao enviar dados para o backend: ", err);
    });
  }

  useEffect(() => {
    /* global google*/
    google.accounts.id.initialize({
      client_id: "469880395067-2ui4fsi0lk3kvrvlo2fkemk4tv75jifb.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "filled_blue", size: "medium"}
    )
  }, [])

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 cadastro-login">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center text-primary mb-3">Login</h2>
        <div className="d-flex justify-content-center mb-3">
          <button type="button" className="btn btn-primary me-2" onClick={handleFacebookLogin}>
            <i className="fab fa-facebook-f me-2"></i>Continue com Facebook
          </button>
          <div id="signInDiv"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-danger text-center">{error}</p>}

          <button type="submit" className="btn btn-success w-100">Entrar</button>
        </form>

        <div className="text-center mt-3">
          <Link to="/Cadastro" className="btn-link">
            <i className="fas fa-user-plus"></i> Não tem conta? Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
