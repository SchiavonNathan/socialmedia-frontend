import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Cadastro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/users', {
        name,
        email,
        password,
      });
      alert(`Cadastro bem-sucedido!`);
      // Aqui você pode armazenar o token em localStorage ou contexto
    } catch (error) {
      setError('Erro.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Página de Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Cadastrar</button>
      </form>
      <Link to="/">
          <button>Login</button>
      </Link>
    </div>
  );
};

export default Cadastro;
