import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Cadastro.css';

const Cadastro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:3001/users', { name, email, password });
      alert('Cadastro bem-sucedido!');
    } catch (error) {
      setError('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Cadastro</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              <i className="fas fa-user-circle" style={{ color: '#FF6F61' }}></i> Nome
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <i className="fas fa-envelope" style={{ color: '#4B89DC' }}></i> Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <i className="fas fa-lock" style={{ color: '#01B392' }}></i> Senha
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          
          <button type="submit">Cadastrar</button>
        </form>
        
        <div className="text-center mt-3">
          <Link to="/" className="btn-link">
            <i className="fas fa-sign-in-alt"></i> Já tenho conta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
