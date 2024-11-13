import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 cadastro-login">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center text-primary mb-3">Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">
              <i className="fas fa-user-circle me-2" style={{ color: '#FF6F61' }}></i> Nome
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
          <div className="form-group mb-3">
            <label htmlFor="email">
              <i className="fas fa-envelope me-2" style={{ color: '#4B89DC' }}></i> Email
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
          <div className="form-group mb-3">
            <label htmlFor="password">
              <i className="fas fa-lock me-2" style={{ color: '#01B392' }}></i> Senha
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

          {error && <p className="text-danger text-center">{error}</p>}

          <button type="submit" className="btn btn-success w-100">Cadastrar</button>
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
