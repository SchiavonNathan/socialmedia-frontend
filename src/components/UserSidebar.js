import React from 'react';
import { Container, Col, Row, Button, InputGroup, FormControl } from 'react-bootstrap';

function UserSidebar({ user, onSearch }) {
    const styles = {
        sidebar: {
          maxWidth: '340px',
          backgroundColor: '#ffffffd6',
          border: '1px solid #ddd',
          borderRadius: '40px',
          padding: '30px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          position: 'fixed',
          left: '40px',
          top: '50px',
        },
        userInfo: {
          textAlign: 'center',
        },
        searchBox: {
          borderRadius: '20px',
        },
        searchIcon: {
          cursor: 'pointer',
          borderRadius: '20px',
        },
        profileButton: {
          width: '100%',
          borderRadius: '20px',
          marginTop: '10px',
        },
        dflex: {
          display: 'flex',
          justifyContent: 'center', /* Centraliza a imagem */
          alignItems: 'center', /* Alinha a imagem verticalmente */
        },
        smallImage: {
          width: '150px', /* Ajuste para o tamanho desejado */
          height: '150px', /* Mantém a proporção da imagem */
        },
      };

  return (
    <Container style={styles.sidebar}>
        <div style={styles.userInfo}>
            {user ? (
                <>
                <div style={styles.dflex}>
                <img src="../RafaLogo.png" alt="Imagem do RafinhaBlog" style={styles.smallImage} />
                </div>
                <h2 className="Rafinha">RafinhaBlog</h2>
                <strong>Nome:</strong> {user.name}
                <br />
                <strong>Email:</strong> {user.email}
                </>
            ) : (
                <p>Carregando dados...</p>
            )}
        </div>

      
      <Button variant="btn btn-danger" style={styles.profileButton} disabled>
        Ver Meu Perfil
      </Button>
      
      <InputGroup className="mt-3">
        <FormControl
          placeholder="Pesquisar publicações..."
          aria-label="Pesquisar publicações"
          style={styles.searchBox}
          onChange={(e) => onSearch(e.target.value)}
        />
        <InputGroup.Text style={styles.searchIcon}>
          🔍
        </InputGroup.Text>
      </InputGroup>
    </Container>
  );
}

export default UserSidebar;
