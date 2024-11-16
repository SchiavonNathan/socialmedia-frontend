import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faHashtag, faPen } from '@fortawesome/free-solid-svg-icons'; 


function PublicacaoComponent({ user, isModalOpen, setIsModalOpen, titulo, setTitulo, conteudo, setConteudo, tags, setTags, foto, setFoto, postagemEditando, setPostagemEditando}) {
  const styles = {
    container: {
      maxWidth: '595px',
      background: 'black',
      border: '1px solid gray',
      borderRadius: '8px',
      padding: '10px',
      margin: '0 auto',
      boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.3)',
    },
    profileImg: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        objectFit: 'cover',
        margin: '10px'
    },
    defaultProfileImg: {
        width: '40px',  
        height: '40px', 
        borderRadius: '50%', 
        backgroundColor: '#ddd', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    textarea: {
      border: '1px solid #6634',
      outline: 'none',
      resize: 'none',
      fontSize: '1rem',
      padding: '10px',
      userSelect: 'none',
      caretColor: 'transparent',
      borderRadius: '30px',
      backgroundColor: '#212121c6',
      width: '100%',
      color: 'white'
    },
    optionText: {
      fontSize: '0.9rem',
      color: 'white',
      marginLeft: '5px',
    },
    optionContainer: {
      textAlign: 'center',
      marginTop: '8px',
    },
  };

  const openModal = () => {
    setTitulo("");
    setConteudo("");
    setTags("");
    setFoto("");
    setPostagemEditando(null);
    setIsModalOpen(true);
  };

  return (
    <div style={styles.container} className="mb-3">
      <Row className="align-items-center">
        <Col xs={1} className="p-0">
            {user ? (
                <img
                src={user.fotoPerfil}
                alt="Perfil"
                style={styles.profileImg}
                />
            ) : (
                <div style={styles.defaultProfileImg}>
                <FontAwesomeIcon icon={faImage} size="1x" /> 
                </div>
            )}
        </Col>

        
        <Col  xs={11}>
          <textarea 
            style={styles.textarea}
            placeholder="Comece uma publicação"
            rows="1"
            onClick={openModal}
            readOnly
          ></textarea>
        </Col>
      </Row>

      <Row style={styles.optionContainer}>
        <Col xs={4}>
          <FontAwesomeIcon style={styles.optionText}   icon={faImage} />
          <span style={styles.optionText}>Imagem</span>
        </Col>
        <Col xs={4}>
          <FontAwesomeIcon style={styles.optionText} icon={faHashtag} />
          <span style={styles.optionText}>Tags</span>
        </Col>
        <Col xs={4}>
          <FontAwesomeIcon style={styles.optionText} icon={faPen} />
          <span style={styles.optionText}>Conteúdo</span>
        </Col>
      </Row>
    </div>
  );
}

export default PublicacaoComponent;
