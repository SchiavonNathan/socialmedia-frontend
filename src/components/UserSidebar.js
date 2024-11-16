import React from 'react';
import { Container, Col, Row, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';


function UserSidebar({ user, onSearch, setonSearch, postagens, setPostagens}) {
    
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
          outline: 'none !important',
          cursor: 'pointer',
          border: '1px solid white',
          borderRadius: '20px',
          marginLeft: '5px'
        },
        profileButton: {
          width: '100%',
          borderRadius: '20px',
          marginTop: '10px',
        },
        dflex: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center', 
        },
        smallImage: {
          width: '150px', 
          height: '150px', 
        },
        clickIcon: {
          border: 'none', 
          cursor: 'pointer',  
          backgroundColor: '#00000000',
          outline: 'none !important'
        }
      };


      const buscarPostagem = async () => {
        console.log("Valor de busca:", onSearch);
        setPostagens([]);
      
        try {
          const response = await axios.get(`http://localhost:3001/postagens/search/${onSearch}`);
          console.log("Postagens recebidas:", response.data);
      
          setPostagens(response.data);
        } catch (error) {
          console.error("Erro ao buscar postagens:", error);
        }
      };

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
          required
        />
        <InputGroup.Text style={styles.searchIcon}>
          <Button style={styles.clickIcon} type='submit' onClick={buscarPostagem}>🔍</Button>
        </InputGroup.Text>
      </InputGroup>
    </Container>
  );
}

export default UserSidebar;
