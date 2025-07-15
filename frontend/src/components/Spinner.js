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
    <div className="flex justify-center items-center">
      {/* Le spinner lui-même */}
      <div
        className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
        style={{ borderTopColor: '#3498db' }} // Une couleur légèrement différente pour l'anneau en mouvement
      ></div>
    </div>
  );
}

export default Spinner;