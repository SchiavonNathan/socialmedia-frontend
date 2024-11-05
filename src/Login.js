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

  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:3001/auth/facebook';
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
       <button onClick={handleFacebookLogin}>Login com Facebook</button>;
     </div>
  );
};

export default Login;
