import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Cadastro.css';

const Home = () => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('user_id'); // Pega o user_id armazenado no localStorage

  useEffect(() => {
    if (userId) {
      // Fazer a requisição para obter os dados do usuário com o user_id
      axios.get(`http://localhost:3001/users/${userId}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar dados do usuário', error);
        });
    }
  }, [userId]);

  return (
    <div className="container">
      <div className="card">
      <h2>Bem-vindo à Home</h2>
      {user ? (
        <div>
          <h1>Dados do Usuário</h1>
          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Outros dados do usuário */}
        </div>
      ) : (
        <p>Carregando dados...</p>
      )}
      </div>
    </div>
  );
};

export default Home;
