import React from 'react';
import { Container } from 'react-bootstrap';

function CreditsSidebar() {
  const styles = {
    sidebar: {
      maxWidth: '300px',
      backgroundColor: '#000000e2',
      border: '1px solid #ddd',
      borderRadius: '40px',
      padding: '30px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      position: 'fixed',
      right: '50px',
      top: '50px',
      transformOrigin: 'top',
      transition: 'transform 0.3s ease',
      zIndex: 1001,
      color: 'white',
      textAlign: 'center',
    },
    header: {
      fontSize: '3rem',
      marginBottom: '10px',
    },
    creditItem: {
      fontSize: '1rem',
      marginBottom: '10px',
    },
    notParticipated: {
      marginTop: '20px',
      fontStyle: 'italic',
      opacity: 0.8,
    },
  };

  return (
    <Container style={styles.sidebar}>
      <h1 className='Rafinha'style={styles.header}>Créditos:</h1>
      <div style={styles.creditItem}>
        <strong>Matheus Nunes</strong> 
      </div>
      <div style={styles.creditItem}>
        <strong>Nathan Schiavon</strong> 
      </div>
      <div style={styles.creditItem}>
        <strong>Isaac Arantes</strong> 
      </div>
      <div style={styles.notParticipated}>
        Demais integrantes não fizeram nada no trabalho.
      </div>
    </Container>
  );
}

export default CreditsSidebar;
