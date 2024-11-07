import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email,
        password,
      });
      alert(`Login bem-sucedido! Token: ${response.data.access_token}`);
      // Aqui você pode armazenar o token em localStorage ou contexto
    } catch (error) {
      setError('Email ou senha incorretos.');
    }
  };

  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:3001/auth/facebook';
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/google';
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="social-buttons">
            <button type="button" className="social-button" onClick={handleFacebookLogin}>
              <i className="fab fa-facebook-f"></i> Continue com Facebook
            </button>
            <button type="button" className="social-button google" onClick={handleGoogleLogin}>
              <i className="fab fa-google"></i> Continue com Google
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="name">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Entrar</button>
        </form>
        <Link to="/Cadastro.js" className="btn-link">
          <i className="fas fa-user-plus"></i> Não tem Conta? Cadastre-se
        </Link>
      </div>
    </div>
  );
};

export default Login;
