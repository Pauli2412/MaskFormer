import React, { useState } from 'react';
import axios from 'axios';
import './SegmentarImagen.css';

function SegmentarImagen() {
  const [imageUrl, setImageUrl] = useState('');
  const [originalImage, setOriginalImage] = useState(null);
  const [segmentedImage, setSegmentedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
    setOriginalImage(null);
    setSegmentedImage(null);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imageUrl) {
      setError('Por favor, ingresa una URL de imagen.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/segmentar', { url: imageUrl });
      
      console.log("Respuesta del servidor:", response.data);

      setOriginalImage(response.data.imagen_original);
      setSegmentedImage(response.data.imagen_segmentada);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(`Error al segmentar la imagen: ${error.response.data.error}`);
      } else {
        setError('Error al segmentar la imagen.');
      }
      console.error('Error al segmentar la imagen:', error);
    }
  };

  return (
    <div className="modelo-container">
    <div className="modelo">
    <div className="segmentar-imagen">
      <h1>Segmentar Imagen</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Ingresa la URL de la imagen" value={imageUrl} onChange={handleUrlChange} />
        <button type="submit">Segmentar</button>
      </form>
      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {originalImage && segmentedImage && (
        <div className="resultados">
          <h2>Imagen Original</h2>
          <img src={`data:image/jpeg;base64,${originalImage}`} alt="Imagen Original" />
          <h2>Imagen Segmentada</h2>
          <img src={`data:image/png;base64,${segmentedImage}`} alt="Segmentación Panóptica" />
        </div>
      )}
    </div>
    </div>
      </div>
  );
}

export default SegmentarImagen;




