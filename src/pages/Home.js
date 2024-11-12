import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/Posts.css';

const Home = () => {
  const [user, setUser] = useState(null);
  const [postagens, setPostagens] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [tags, setTags] = useState("");
  const [postagemEditando, setPostagemEditando] = useState(null);
  const [menuAtivo, setMenuAtivo] = useState(null);
  const userId = localStorage.getItem('user_id');

  // Referência para o menu
  const menuRef = useRef(null);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3001/users/${userId}`)
        .then(response => setUser(response.data))
        .catch(error => console.error('Erro ao buscar dados do usuário', error));
    }
  }, [userId]);

  useEffect(() => {
    axios.get('http://localhost:3001/postagens')
      .then(response => setPostagens(response.data))
      .catch(error => console.error('Erro ao buscar postagens', error));
  }, []);

  const abrirModalParaCriacao = () => {
    setTitulo("");
    setConteudo("");
    setTags("");
    setPostagemEditando(null);
    setIsModalOpen(true);
  };

  const abrirModalParaEdicao = (postagem) => {
    setTitulo(postagem.titulo);
    setConteudo(postagem.conteudo);
    setTags(postagem.tags);
    setPostagemEditando(postagem.id);
    setIsModalOpen(true);
  };

  const handleCreateOrUpdatePost = () => {
    const newPost = { titulo, conteudo, tags, usuarioId: userId };
    if (postagemEditando) {
      axios.put(`http://localhost:3001/postagens/${postagemEditando}`, newPost)
        .then(response => {
          setPostagens(postagens.map(post => (post.id === postagemEditando ? response.data : post)));
          setIsModalOpen(false);
        })
        .catch(error => console.error('Erro ao editar postagem', error));
    } else {
      axios.post('http://localhost:3001/postagens', newPost)
        .then(response => {
          setPostagens([response.data, ...postagens]);
          setIsModalOpen(false);
        })
        .catch(error => console.error('Erro ao criar postagem', error));
    }
  };

  const handleDeletePost = (postagemId) => {
    axios.delete(`http://localhost:3001/postagens/${postagemId}`)
      .then(() => {
        setPostagens(postagens.filter(post => post.id !== postagemId));
        setMenuAtivo(null);
      })
      .catch(error => console.error('Erro ao deletar postagem', error));
  };

  const handleCopyLink = (postagemId) => {
    const link = `http://localhost:3001/postagens/${postagemId}`;
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copiado para a área de transferência!");
    }).catch(error => console.error('Erro ao copiar link', error));
  };

  // Fecha o menu de opções ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAtivo(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="container">
      <div className="cardHome">
        <h2>Bem-vindo à Home</h2>
        {user ? (
          <div>
            <p>Nome: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>Carregando dados...</p>
        )}

        <h2>Postagens Recentes</h2>
        {postagens.length > 0 ? (
          postagens.map(postagem => (
            <div className='campoPostagem'>
              <div key={postagem.id} className="postagem">
                <hr className="divider" />
                <div className="postagem-header">
                  <div className='titulo-opcoes'>
                    <p className="postagem-titulo"><strong>{postagem.titulo}</strong></p>
                    <button className="menu-button" onClick={() => setMenuAtivo(menuAtivo === postagem.id ? null : postagem.id)}>⋮</button>
                  </div>
                  {menuAtivo === postagem.id && (
                    <div className="menu-opcoes" ref={menuRef}>
                      {postagem.usuario.id === parseInt(userId) && (
                        <>
                          <button onClick={() => abrirModalParaEdicao(postagem)}>Editar</button>
                          <button onClick={() => handleDeletePost(postagem.id)}>Excluir</button>
                        </>
                      )}
                      {postagem.usuario.id !== parseInt(userId) && (
                        <button>Denunciar</button>
                      )}
                      <button onClick={() => handleCopyLink(postagem.id)}>Copiar Link</button>
                    </div>
                  )}
                </div>
                <p><strong>{postagem.usuario.name}</strong> - {new Date(postagem.data_criacao).toLocaleDateString()} {new Date(postagem.data_criacao).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p>{postagem.conteudo}</p>
                <p><strong>Tags:</strong> {postagem.tags}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Carregando postagens...</p>
        )}
      </div>

      <button className="create-post-button" onClick={abrirModalParaCriacao}>+</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{postagemEditando ? "Editar Postagem" : "Criar Nova Postagem"}</h3>
            <input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <textarea
              placeholder="Conteúdo"
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
            />
            <input
              type="text"
              placeholder="Tags (separadas por vírgula)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <button onClick={handleCreateOrUpdatePost}>{postagemEditando ? "Atualizar" : "Publicar"}</button>
            <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
