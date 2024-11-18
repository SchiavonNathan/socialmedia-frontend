import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Container, Row, Col, Modal, Form, Offcanvas } from 'react-bootstrap';
import UserSidebar from '../components/UserSidebar';
import { Dropdown } from 'react-bootstrap'; 
import { FaBars, FaRegThumbsDown } from 'react-icons/fa';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const Postagem = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [postagem, setPostagem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [tags, setTags] = useState("");
  const [foto, setFoto] = useState("");
  const [postagemEditando, setPostagemEditando] = useState(null);
  const [liked, setLiked] = useState(false);
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();
  
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3001/users/${userId}`)
        .then(response => setUser(response.data))
        .catch(error => console.error('Erro ao buscar dados do usuário', error));
    }
  }, [userId]);

  useEffect(() => {
    axios.get(`http://localhost:3001/postagens/${id}`)
      .then(response => {
        setPostagem(response.data);
        const isLiked = response.data.likes.some(like => like.usuario.id === parseInt(userId));
        setLiked(isLiked);
      })
      .catch(error => console.error('Erro ao carregar postagem:', error));
  }, [id]);

  if (!postagem) {
    return <p>Carregando postagem...</p>;
  }

  const handleLike = () => {
    const url = liked
    ? `http://localhost:3001/postagens/descurtir/${id}`
    : `http://localhost:3001/postagens/curtir/${id}`;

    axios.post(url, { usuarioId: userId })
      .then(response => {
        console.log("Resposta da API: ". response.data);
        setPostagem(response.data); //atualiza o post
        setLiked(!liked); //altera status de curtida
      })
      .catch(error => console.error('Erro ao curtir/descurtir postagem:', error));
  };

  const handleCreateOrUpdatePost = () => {
    const newPost = { titulo, conteudo, tags, usuarioId: userId, foto };
    
    if (postagemEditando) {
      // Atualizar a postagem
      axios.put(`http://localhost:3001/postagens/${postagemEditando}`, newPost)
        .then(response => {
          // Atualiza a postagem editada diretamente
          setPostagem(response.data); // Substitui a postagem atual pela nova
          setIsModalOpen(false);
        })
        .catch(error => console.error('Erro ao editar postagem', error));
    } else {
      // Criar uma nova postagem
      axios.post('http://localhost:3001/postagens', newPost)
        .then(response => {
          setPostagem(response.data); 
          setIsModalOpen(false);
        })
        .catch(error => console.error('Erro ao criar postagem', error));
    }
  };
  

  const handleCopyLink = (postagemId) => {
    const link = `${window.location.origin}/postagem/${postagemId}`;
    navigator.clipboard.writeText(link)
      .then(() => alert("Link copiado para a área de transferência!"))
      .catch(error => console.error('Erro ao copiar link', error));
  };

  const handleReportPost = (postagemId) => {
    alert(`Postagem ${postagemId} denunciada!`);
  };

  const handleDeletePost = (postagemId) => {
    axios.delete(`http://localhost:3001/postagens/${postagemId}`)
      .then(() => {
        alert("Postagem excluída com sucesso!");
        navigate('/Home');
      })
      .catch(error => console.error('Erro ao deletar postagem', error));
  };

  const handlePostClick = (postagemId) => {
    navigate(`/postagem/${postagemId}`);
  };

  const abrirModalParaEdicao = (postagem) => {
    setTitulo(postagem.titulo);
    setConteudo(postagem.conteudo);
    setTags(postagem.tags);
    setFoto(postagem.foto);
    setPostagemEditando(postagem.id);
    setIsModalOpen(true);
  };

  return (
    <div className='cinza'>
      <Container className="ps-4 pe-2">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            {/* Removido o título Feed aqui */}
          </Col>
        </Row>

        {/* Sidebar à esquerda, oculto em telas menores */}
        <Col md={3} className="d-none d-md-block">
          <UserSidebar 
            user={user} 
            postagens={[]} // Não é necessário passar onSearch e setonSearch, pois não há pesquisa aqui
            setPostagens={() => {}} 
          />
        </Col>

        <div className="pt-3" style={{ maxHeight: '1300px', overflowY: 'auto', paddingRight: '10px' }}>
          <Row>
            {postagem ? (
              <Col md={12} className="mb-4 d-flex justify-content-center text-white">
                <div
                  className="w-100 p-4 postagemHome"
                  style={{
                    maxWidth: '570px',
                    borderRadius: '2%',
                    backgroundColor: 'black',
                    border: '1px solid #1bbba9',
                    boxShadow: '1px 1px 10px black',
                  }}
                >
                  <Card.Body>
                    <Card.Title className="fs-1">{postagem.titulo}</Card.Title>
                    <Card.Text>
                      <small>{postagem.usuario.name} - {new Date(postagem.data_criacao).toLocaleDateString()}</small>
                    </Card.Text>
                    <Card.Text>{postagem.conteudo}</Card.Text>
                    <Card.Text><strong>Tags:</strong> {postagem.tags}</Card.Text>
                    <img src={postagem.foto} alt="img" style={{ width: '100%', height: 'auto', paddingBottom: '15px' }} />

                    {/* Botão like/deslike */}
                    <button onClick={handleLike} aria-label="Curtir">
                      {liked ? "Descurtir" : "Curtir"}
                    </button>

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
            ) : (
              <p className="text-center">Carregando postagem...</p>
            )}

            <Col md={12} className="mb-4 d-flex justify-content-center text-white">
                <div
                  className="w-100 p-4 postagemHome"
                  style={{
                    maxWidth: '570px',
                    borderRadius: '2%',
                    backgroundColor: 'black',
                    border: '1px solid #1bbba9',
                    boxShadow: '1px 1px 10px black',
                  }}
                >
                  <Card.Body>
                    <Card.Title className="fs-1">Comentários</Card.Title>
                    
                  </Card.Body>
                </div>
            </Col>
          </Row>
        </div>

        {/* Modal para Edição de Postagem */}
        <div className='borderPurple'>
          {/* Modal para Edição de Postagem */}
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

export default Postagem;
