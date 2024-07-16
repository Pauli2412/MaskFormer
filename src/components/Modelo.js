import React from 'react';
import './Modelo.css';

function Modelo() {
  return (
    <div className="modelo-container">
      <div className="modelo">
        <h1>Modelo MaskFormer</h1>
        <section className="descripcion">
          <h2>Descripción del Modelo</h2>
          <p>
            MaskFormer es un modelo avanzado de segmentación de imágenes desarrollado para abordar tareas de segmentación de instancias, segmentación semántica y segmentación panóptica. Fue introducido en el artículo "Per-Pixel Classification is Not All You Need for Semantic Segmentation" y utiliza una arquitectura basada en transformers para generar máscaras y etiquetas correspondientes para cada segmento de la imagen.
          </p>
        </section>

        <section className="arquitectura">
          <h2>Arquitectura del Modelo</h2>
          <p>
            MaskFormer combina un módulo de pixel-level con un módulo de transformer. El módulo de pixel-level genera embeddings por píxel a partir de las características de la imagen, mientras que el módulo de transformer predice un conjunto de máscaras y etiquetas correspondientes a cada segmento.
          </p>
          <img src="/Arquitectura.png" alt="Arquitectura de MaskFormer" className="imagen-arquitectura" />
        </section>


        <section className="como-funciona">
          <h2>¿Cómo Funciona MaskFormer?</h2>
          <ol>
            <li><strong>Entrada:</strong> La imagen de entrada es procesada para generar embeddings por píxel.</li>
            <li><strong>Transformers:</strong> Los embeddings son pasados a través de un transformer que genera un conjunto de consultas (queries).</li>
            <li><strong>Predicciones:</strong> Las consultas se utilizan para predecir máscaras y etiquetas para cada segmento en la imagen.</li>
            <li><strong>Postprocesamiento:</strong> Las máscaras y etiquetas son postprocesadas para obtener la segmentación final.</li>
          </ol>
        </section>

        <section className="uso">
          <h2>Uso del Modelo en la Aplicación</h2>
          <p>
            En nuestra aplicación, MaskFormer se utiliza para segmentar imágenes proporcionadas por el usuario. El flujo del proceso es el siguiente:
          </p>
          <ul>
            <li>El usuario ingresa la URL de una imagen.</li>
            <li>La imagen es enviada al servidor, donde MaskFormer realiza la segmentación.</li>
            <li>El servidor devuelve la imagen original y la imagen segmentada al cliente.</li>
            <li>La aplicación muestra ambas imágenes para que el usuario pueda ver el resultado de la segmentación.</li>
          </ul>
        </section>

        <section className="referencias">
          <h2>Referencias</h2>
          <ul>
            <li><a href="https://arxiv.org/abs/2107.06278" target="_blank" rel="noopener noreferrer">Per-Pixel Classification is Not All You Need for Semantic Segmentation</a></li>
            <li><a href="https://pytorch.org/" target="_blank" rel="noopener noreferrer">PyTorch</a></li>
            <li><a href="https://github.com/facebookresearch/MaskFormer" target="_blank" rel="noopener noreferrer">Repositorio de MaskFormer en GitHub</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Modelo;


