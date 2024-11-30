import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';


import { Button, Card, Container, Row, Col, Modal, Form, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PublicacaoComponent from '../components/PublicacaoComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import UserSidebar from '../components/UserSidebar';
import CreditsSidebar from '../components/CreditsSidebar'; 


import { useNavigate, useParams } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap'; 
import { FaBars } from 'react-icons/fa';

function Perfil() {

  const { id } = useParams();
  const userId = localStorage.getItem('user_id');
  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [biografia, setBiografia] = useState("");
  const [fotoPerfil, setfotoPerfil] = useState('');
  const [userVisit, setUserVisitado] = useState('');
  const [postagens, setPostagens] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPerfil, setIsModalOpenPerfil] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false); 
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [tags, setTags] = useState("");
  const [foto, setFoto] = useState("");
  const [postagemEditando, setPostagemEditando] = useState(null);
  const [onSearch, setonSearch] = useState(null);

  useEffect(() => {
    // Buscar dados do usuário logado
    if (userId) {
      axios.get(`http://localhost:3001/users/${userId}`)
        .then(response => setUser(response.data))
        .catch(error => console.error('Erro ao buscar dados do usuário logado:', error));
    }
  }, [userId]);

  useEffect(() => {
    // Buscar dados do perfil visitado
    if (id) {
      axios.get(`http://localhost:3001/users/${id}`)
        .then(response => setUserVisitado(response.data))
        .catch(error => console.error('Erro ao buscar dados do perfil visitado:', error));
    }
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:3001/postagens/usuario/${id}`)
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

  const abrirModalParaEdicaoPerfil = (user) => {
    setName(user.name);
    setBiografia(user.biografia)
    setfotoPerfil(user.fotoPerfil)
    setIsModalOpenPerfil(true);
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

  const handleUpdatePerfil = () => {
    const newPerfil = {name, biografia, fotoPerfil};
      axios.put(`http://localhost:3001/users/${userId}`, newPerfil )
        .then(response => {
          setUser(response.data);
          setIsModalOpenPerfil(false);
        })
        .catch(error => console.error('Erro ao editar perfil', error));
        window.location.reload(); 
  }

  return (
    <div className=" py-5" style={{ background: "linear-gradient(135deg, #361b52, #005e53)" }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 text-center">

            <div className="mb-4">
              <img
                src={userVisit.fotoPerfil}
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
                {userVisit.name}
              </h3>
            </div>
            <div className="mb-4">
              <p className="text-white">{userVisit.biografia}</p>
            </div>
            <div className="mb-4">
              {user?.id === userVisit?.id ? (
                <button className="btn btn-primary w-100" style={{ borderRadius: "30px" }} onClick={() => abrirModalParaEdicaoPerfil(user)}>
                  Editar Perfil
                </button>
              ) : (
                <button className="btn btn-primary w-100" style={{ borderRadius: "30px" }}>
                  Copiar link perfil
                </button>
              )}
            </div>
            
            <div className="cinza">
            <div className="mb-5">
              <Container className="ps-4 pe-2">
                <Row className="justify-content-center">
                  <Col md={8} className="text-center">
                    <h2 className="Pacifico m-4">Postagens</h2>
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

                {/* Créditos */}
                <Col md={3} className="d-none d-md-block">
                    <CreditsSidebar />
                </Col>
            
                

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
                            {postagem.foto && (
                              <img 
                                src={postagem.foto} 
                                alt="Imagem da postagem" 
                                style={{ width: '100%', height: 'auto', paddingBottom: '15px' }} 
                              />
                            )}
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

                  {/* Offcanvas Body com empilhamento vertical */}
                  <Offcanvas.Body className="d-flex flex-column align-items-center px-6 py-3">
                    <div className="d-flex flex-column w-100 align-items-center gap-4">


              
                      {/* User Sidebar */}
                      <div className="user-sidebar w-100">
                        <UserSidebar
                          user={user}
                          onSearch={() => {}}
                          className="d-flex flex-column px-2 py-1 overflow-auto"
                        />
                      </div>
                    </div>
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


                <div className='borderPurple'>
                  {/* Modal edicao de perfil */}
                  <Modal show={isModalOpenPerfil} onHide={() => setIsModalOpenPerfil(false)} centered >
                    <Modal.Header className='text-white blackRgb ' closeButton>
                      <Modal.Title >EditarPerfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='bg-black'>
                      <Form className='text-white'>
                        <Form.Group>
                          <Form.Label>Nome</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          </Form.Group>
                          <Form.Group >
                          <Form.Label>Biografia</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Biografia"
                            value={biografia}
                            onChange={(e) => setBiografia(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group className="mt-3">
                          <Form.Label>Foto de perfil (URL)</Form.Label>
                          <Form.Control 
                            type="text"
                            placeholder="URL"
                            value={fotoPerfil}
                            onChange={(e) => setfotoPerfil(e.target.value)}
                          />
                        </Form.Group>
                        
                      </Form>
                    </Modal.Body>
                    <Modal.Footer className='blackRgb'>
                      <Button variant="danger" onClick={() => setIsModalOpenPerfil(false)}>
                        Cancelar
                      </Button>
                      <Button variant="primary" onClick={handleUpdatePerfil}>
                        Salvar Alterações
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </Container>
            </div>
          </div>  
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Perfil;
