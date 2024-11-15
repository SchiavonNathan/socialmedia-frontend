import React from 'react';
import { Container, Col, Row, Button, InputGroup, FormControl } from 'react-bootstrap';

function UserSidebar({ user, onSearch, setonSearch}) {
    const styles = {
        sidebar: {
          maxWidth: '340px',
          backgroundColor: '#000000e2',
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

      function teste(){
        console.log(onSearch)
      }

  return (
    <Container style={styles.sidebar}>
        <div style={styles.userInfo}>
            {user ? (
                <>
                <div style={styles.dflex}>
                <img src="../RafaLogo.png" alt="Imagem do RafinhaBlog" style={styles.smallImage} />
                </div>
                <div className='text-white'>
                  <h2 className="Rafinha">RafinhaBlog</h2>
                  Nome:  {user.name}
                  <br />
                  Email: {user.email}
                </div> 
                </>
            ) : (
                <p className='text-white'>Carregando dados...</p>
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
          value={onSearch}
          onChange={(e) => setonSearch(e.target.value)}
        />
        <InputGroup.Text style={styles.searchIcon}>
          🔍<Button type='submit' onClick={teste}></Button>
        </InputGroup.Text>
      </InputGroup>
    </Container>
  );
}

export default UserSidebar;
