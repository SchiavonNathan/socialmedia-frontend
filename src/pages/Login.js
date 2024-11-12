import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email,
        password,
      });
      
      // Armazenar o token e o user_id no localStorage
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user_id', response.data.user_id);

      alert(`Login bem-sucedido! token: ${response.data.access_token}`);

      // Redirecionar para a página Home após login bem-sucedido
      navigate('/home'); // Caminho da página Home (ajuste conforme sua rota)

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
            <label htmlFor="email">Email</label>
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
        <Link to="/Cadastro" className="btn-link">
          <i className="fas fa-user-plus"></i> Não tem Conta? Cadastre-se
        </Link>
      </div>
    </div>
  );
};

export default Login;
