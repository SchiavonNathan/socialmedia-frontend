import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, Card, Container, Row, Col, Modal, Form, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PublicacaoComponent from '../components/PublicacaoComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import UserSidebar from '../components/UserSidebar';

import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap'; 
import { FaBars } from 'react-icons/fa';

const Home = () => {
  const [user, setUser] = useState(null);
  const [postagens, setPostagens] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false); 
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [tags, setTags] = useState("");
  const [foto, setFoto] = useState("");
  const [postagemEditando, setPostagemEditando] = useState(null);
  const [onSearch, setonSearch] = useState(null);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3001/users/${userId}`)
        .then(response => setUser(response.data))
        .catch(error => console.error('Erro ao buscar dados do usuário', error));
    }
  }, [userId]);

  useEffect(() => {
    axios.get('http://localhost:3001/postagens')
      .then(response => {
        // Ordena as postagens pela data de criação (da mais recente para a mais antiga)
        const sortedPostagens = response.data.sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao));
        setPostagens(sortedPostagens);
      })
      .catch(error => console.error('Erro ao buscar postagens', error));
  }, []);

  const abrirModalParaCriacao = () => {
    setTitulo("");
    setConteudo("");
    setTags("");
    setFoto("");
    setPostagemEditando(null);
    setIsModalOpen(true);
  };

  const abrirModalParaEdicao = (postagem) => {
    setTitulo(postagem.titulo);
    setConteudo(postagem.conteudo);
    setTags(postagem.tags);
    setFoto(postagem.foto);
    setPostagemEditando(postagem.id);
    setIsModalOpen(true);
  };

  const handleCreateOrUpdatePost = () => {
    const newPost = { titulo, conteudo, tags, usuarioId: userId, foto };
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
    alert(`Postagem ${postagemId} denunciada!`);
  };

  const navigate = useNavigate();

  const handlePostClick = (postagemId) => {
    navigate(`/postagem/${postagemId}`);
  };

  return (
    <div className="cinza">
      <Container className="ps-4 pe-2">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h2 className="Pacifico m-4">Feed</h2>
          </Col>
        </Row>
        
        {/* Sidebar à esquerda, oculto em telas menores */}
        <Col md={3} className="d-none d-md-block">
          <UserSidebar 
            user={user} 
            onSearch={onSearch}
            setonSearch={setonSearch} 
            postagens={postagens}
            setPostagens={setPostagens}
          />
        </Col>

        <PublicacaoComponent 
          user={user} 
          titulo = {""}
          setTitulo = {setTitulo}
          conteudo = {""}
          setConteudo= {setConteudo}
          tags = {""}
          setTags= {setTags}
          foto = {""}
          setFoto= {setFoto}
          postagemEditando = {null}
          setPostagemEditando = {setPostagemEditando}
          isModalOpen={isModalOpen} 
          setIsModalOpen={setIsModalOpen} 
        />
        

        <div className="pt-3" style={{ maxHeight: '1300px', overflowY: 'auto', paddingRight: '10px' }}>
        <Row>
          {postagens.length > 0 ? (
            postagens.map((postagem) => (
              <Col md={12} className="mb-4 d-flex justify-content-center text-white" key={postagem.id}>
                <div
                  className="w-100 p-4 postagemHome"
                  style={{
                    maxWidth: '570px',
                    borderRadius: '2%',
                    backgroundColor: 'black',
                    border: '1px solid #1bbba9',
                    boxShadow: '1px 1px 10px black',
                    position: 'relative',  /* Importante para o dropdown ser posicionado dentro deste contêiner */
                    cursor: 'pointer',
                  }}
                  onClick={() => handlePostClick(postagem.id)}
                >
                  <Card.Body>
                    <Card.Title className="fs-1">{postagem.titulo}</Card.Title>
                    <Card.Text>
                      <small>
                        {postagem.usuario.name} - 
                        {new Date(postagem.data_criacao).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })} 
                        {` ${new Date(postagem.data_criacao).getHours().toString().padStart(2, '0')}:${new Date(postagem.data_criacao).getMinutes().toString().padStart(2, '0')}`}
                      </small>
                    </Card.Text>
                    <Card.Text>{postagem.conteudo}</Card.Text>
                    <Card.Text><strong>Tags:</strong> {postagem.tags}</Card.Text>
                    <img src={postagem.foto} alt="img" style={{ width: '100%', height: 'auto', paddingBottom: '15px' }} />
                    <Dropdown className='drop' onClick={(e) => e.stopPropagation()}>
                        <Dropdown.Toggle variant="btn btn-primary" id="dropdown-custom-components" >
                          <FaBars />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="telinha">
                          {postagem.usuario.id === parseInt(userId) ? (
                            <>
                              <Dropdown.Item as="button" onClick={() => abrirModalParaEdicao(postagem)}>Editar</Dropdown.Item>
                              <Dropdown.Item as="button" onClick={() => handleDeletePost(postagem.id)}>Excluir</Dropdown.Item>
                            </>
                          ) : (
                            <Dropdown.Item as="button" onClick={() => handleReportPost(postagem.id)}>Denunciar</Dropdown.Item>
                          )}
                          <Dropdown.Item as="button" onClick={() => handleCopyLink(postagem.id)}>Copiar Link</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                  </Card.Body>
                </div>
              </Col>
            ))
          ) : (
            <p className="text-center">Carregando postagens...</p>
          )}
        </Row>
      </div>



        {/* Botão de Criar Postagem (Flutuante) */}
        <Button
          className="d-flex justify-content-center align-items-center position-fixed bottom-0 end-0 m-4 bg-danger"
          onClick={abrirModalParaCriacao}
          variant="success"
          style={{
            borderRadius: '100%',
            width: '60px',
            height: '60px',
            fontSize: '50px', 
          }}
        >
          <FontAwesomeIcon icon={faPlus} style={{ fontSize: '30px' }} />
        </Button>

        {/* Botão de Menu Hambúrguer para Telas Menores */}
        <Button
          className="d-flex d-md-none justify-content-center align-items-center position-fixed bottom-0 start-0 m-4 bg-primary"
          onClick={() => setShowOffcanvas(true)}
          style={{
            borderRadius: '100%',
            width: '60px',
            height: '60px',
            fontSize: '30px',
          }}
          >
          <FontAwesomeIcon icon={faBars} style={{ fontSize: '24px' }} />
        </Button>

        {/* Offcanvas para Menu Lateral com Conteúdo do UserSidebar */}
      <Offcanvas
          style={{ backgroundColor: '#000000a5' }}
          show={showOffcanvas}
          onHide={() => setShowOffcanvas(false)}
          placement="start"
          className="offcanvas-responsive"
        >
        <Offcanvas.Header className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center w-100 justify-content-between">
            <Offcanvas.Title className="text-white fs-5 mb-0">Menu</Offcanvas.Title>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowOffcanvas(false)}
              aria-label="Close"
            />
          </div>
        </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column align-items-center px-6 py-3">
            <UserSidebar
              user={user}
              onSearch={() => {}}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0.5rem',
                fontSize: '0.9rem',
                overflowY: 'auto',
                width: '80%', 
                maxWidth: '200px', 
              }}
              className="d-flex pe-5"
            />
          </Offcanvas.Body>
      </Offcanvas>
        <div className='borderPurple'>
          {/* Modal para Criação/Edição de Postagem */}
          <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered >
            <Modal.Header className='text-white blackRgb ' closeButton>
              <Modal.Title >{postagemEditando ? "Editar Postagem" : "Criar Nova Postagem"}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-black'>
              <Form className='text-white'>
                <Form.Group>
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                  </Form.Group>
                  <Form.Group >
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
                <Form.Group className="mt-3">
                  <Form.Label>Imagem (URL)</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Imagem"
                    value={foto}
                    onChange={(e) => setFoto(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer className='blackRgb'>
              <Button variant="danger" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleCreateOrUpdatePost}>
                {postagemEditando ? "Salvar Alterações" : "Criar Postagem"}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Container>
    </div>
  );
};

export default Home;
