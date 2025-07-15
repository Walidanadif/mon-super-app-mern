import React from 'react';

// Simple Spinner CSS intégré pour cet exemple
const spinnerStyle = {
  border: '4px solid #f3f3f3', /* Light grey */
  borderTop: '4px solid #3498db', /* Blue */
  borderRadius: '50%',
  width: '30px',
  height: '30px',
  animation: 'spin 1s linear infinite',
  margin: '20px auto', // Centrer le spinner
};

// Animation CSS (ajouter cette règle globalement si vous avez un fichier CSS global, sinon c'est OK ici)
const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

function Spinner() {
  return (
    <>
      {/* Injecte les keyframes si elles ne sont pas déjà globales */}
      <style>{keyframes}</style>
      <div style={spinnerStyle}></div>
    </>
  );
}

export default Spinner;