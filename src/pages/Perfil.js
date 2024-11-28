import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Perfil() {
  // Definindo os dados estáticos do usuário
  const biografia = "Olá, sou um desenvolvedor web apaixonado por tecnologia e inovação!";
  const seguidores = 300;
  const seguindo = 180;
  const userId = localStorage.getItem('user_id');
  const [user, setUser] = useState('');

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3001/users/${userId}`)
        .then(response => setUser(response.data))
        .catch(error => console.error('Erro ao buscar dados do usuário', error));
    }
  }, [userId]);

  return (
    <div className=" py-5" style={{ background: "linear-gradient(135deg, #361b52, #005e53)" }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 text-center">
            {/* Foto de perfil */}
            <div className="mb-4">
              <img
                src={user.fotoPerfil}
                alt="Foto do perfil"
                className="rounded-circle border-black shadow"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  border: "5px solid"
                }}
              />
            </div>

            {/* Nome do usuário */}
            <div className="mb-2">
              <h3
                className="Rafinha"
                style={{
                  fontFamily: "'Pacifico', cursive",
                  fontSize: "50px",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  textShadow: "1px 1px 2px rgba(255, 255, 255, 0.167)",
                }}
              >
                {user.name}
              </h3>
            </div>

            {/* Biografia */}
            <div className="mb-4">
              <p className="text-white">{biografia}</p>
            </div>

            {/* Botão Editar Perfil */}
            <div className="mb-4">
              <button className="btn btn-primary w-100" style={{ borderRadius: "30px" }}>
                Editar Perfil
              </button>
            </div>

            {/* Seção de Postagens */}
            <div className="mb-5">
              <h4 className="text-light mb-4">Minhas Postagens</h4>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
