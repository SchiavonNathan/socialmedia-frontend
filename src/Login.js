import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login'; 

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        name,
        password,
      });
      alert(`Login bem-sucedido! Token: ${response.data.access_token}`);
      // Aqui você pode armazenar o token em localStorage ou contexto
    } catch (error) {
      setError('Username ou senha incorretos.');
    }
  };

  const responseFacebook = async (response) => {
    if (response.accessToken) {
      try {
        // Envia o token do Facebook para seu servidor para autenticação
        const authResponse = await axios.post('http://localhost:3001/auth/facebook', {
          accessToken: response.accessToken,
        });
        alert(`Login com Facebook bem-sucedido! Token: ${authResponse.data.access_token}`);
        // Armazene o token em localStorage ou contexto, conforme necessário
      } catch (error) {
        setError('Erro ao autenticar com o Facebook.');
      }
    }
  };


  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Página de Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {/* Botão Post */}
        <button type="submit">Entrar</button>
      </form>
      <Link to="./Cadastro.js">
          <button>Cadastrar</button>
      </Link>
       {/* Botão de Login do Facebook */}
       <FacebookLogin
        appId="1963945814110125"  // Substitua pelo seu App ID do Facebook
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook} // Função que será chamada após o login
        textButton="Login com Facebook"
        size="small"
        icon="fa-facebook"
      />
     </div>
  );
};

export default Login;
