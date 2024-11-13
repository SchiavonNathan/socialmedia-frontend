import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, Card, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const handleReportPost = (postagemId) => {
    // Aqui você pode adicionar a lógica para a ação de denunciar, como abrir um modal ou enviar uma requisição
    alert(`Postagem ${postagemId} denunciada!`);
  };

  // HTML ==================================================================================================  
  return (
  <div className="cadastro-login">
    <Container className="my-5 cinza">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h2 className="text-primary">Bem-vindo à Home</h2>
          {user ? (
            <div>
              <p>Nome: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          ) : (
            <p>Carregando dados...</p>
          )}
        </Col>
      </Row>

      <Row>
        <h3 className="text-center my-4 text-success">Postagens Recentes</h3>
        {postagens.length > 0 ? (
          postagens.map((postagem) => (
            <Col md={4} className="mb-4" key={postagem.id}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title className="text-truncate" title={postagem.titulo}>{postagem.titulo}</Card.Title>
                  <Card.Text className="text-muted">
                    <small>{postagem.usuario.name} - {new Date(postagem.data_criacao).toLocaleDateString()}</small>
                  </Card.Text>
                  <Card.Text>{postagem.conteudo}</Card.Text>
                  <Card.Text><strong>Tags:</strong> {postagem.tags}</Card.Text>
                  
                  {/* Verificação de usuário: exibe botões de edição/exclusão para o autor */}
                  {postagem.usuario.id === parseInt(userId) ? (
                    <>
                      <Button variant="outline-secondary" onClick={() => abrirModalParaEdicao(postagem)} className="me-2">Editar</Button>
                      <Button variant="outline-danger" onClick={() => handleDeletePost(postagem.id)} className="me-2" >Excluir</Button>
                    </>
                  ) : (
                    // Exibe o botão "Denunciar" para usuários que não são o autor da postagem
                    <Button variant="outline-warning" onClick={() => handleReportPost(postagem.id)} className="me-2">Denunciar</Button>
                  )}
                  
                  <Button variant="outline-info" onClick={() => handleCopyLink(postagem.id)} className="me-2">Copiar Link</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">Carregando postagens...</p>
        )}
      </Row>

      <Button
        className="position-fixed bottom-0 end-0 m-3"
        onClick={abrirModalParaCriacao}
        variant="success"
        style={{ borderRadius: '50%', width: '70px', height: '70px', fontSize: '40px', lineHeight: '1.2' }}
      >
        +
      </Button>

      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{postagemEditando ? "Editar Postagem" : "Criar Nova Postagem"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Conteúdo</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Conteúdo"
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Tags (separadas por vírgula)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreateOrUpdatePost}>
            {postagemEditando ? "Atualizar" : "Publicar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  </div>  
  );
};

export default Home;
