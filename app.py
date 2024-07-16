from flask import Flask, request, jsonify
from transformers import MaskFormerImageProcessor, MaskFormerForInstanceSegmentation
from PIL import Image
import requests
import io
import base64
import matplotlib.pyplot as plt
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def cargar_imagen_desde_url(url):
    """Carga una imagen desde una URL."""
    try:
        print(f"Intentando cargar la imagen desde la URL: {url}")
        respuesta = requests.get(url, stream=True)
        respuesta.raise_for_status()
        print(f"Imagen cargada exitosamente desde la URL: {url}")
        return Image.open(respuesta.raw)
    except requests.exceptions.RequestException as e:
        print(f"Error al cargar la imagen: {e}")
        return None

def procesar_imagen(url_imagen):
    """Procesa una imagen usando MaskFormer para la segmentación de instancias."""
    try:
        print("Cargando el procesador y el modelo preentrenado...")
        procesador = MaskFormerImageProcessor.from_pretrained("facebook/maskformer-swin-large-coco")
        modelo = MaskFormerForInstanceSegmentation.from_pretrained("facebook/maskformer-swin-large-coco")
    except Exception as e:
        print(f"Error al cargar el modelo: {e}")
        return None, None

    print(f"Cargando la imagen desde la URL: {url_imagen}")
    imagen = cargar_imagen_desde_url(url_imagen)
    if imagen is None:
        print("No se pudo cargar la imagen.")
        return None, None

    try:
        print("Preprocesando la imagen y realizando predicciones...")
        entradas = procesador(images=imagen, return_tensors="pt")
        salidas = modelo(**entradas)
    except Exception as e:
        print(f"Error al preprocesar la imagen o realizar predicciones: {e}")
        return None, None

    try:
        print("Postprocesando las predicciones para obtener el mapa de segmentación panóptica...")
        resultado = procesador.post_process_panoptic_segmentation(salidas, target_sizes=[imagen.size[::-1]])[0]
        mapa_panoptico_predicho = resultado["segmentation"]
    except Exception as e:
        print(f"Error al postprocesar las predicciones: {e}")
        return None, None

    return imagen, mapa_panoptico_predicho

@app.route('/segmentar', methods=['POST'])
def segmentar():
    try:
        data = request.json
        url_imagen = data.get('url')
        if not url_imagen:
            print("No se proporcionó URL de imagen")
            return jsonify({"error": "No image URL provided"}), 400

        print(f"Procesando imagen desde la URL: {url_imagen}")
        imagen, mapa_panoptico = procesar_imagen(url_imagen)
        if mapa_panoptico is None:
            print("No se pudo procesar la imagen desde la URL")
            return jsonify({"error": "Could not process image from URL"}), 400

        # Convertir la imagen original a base64
        try:
            buffered = io.BytesIO()
            imagen.save(buffered, format="JPEG")
            img_str_original = base64.b64encode(buffered.getvalue()).decode('utf-8')
        except Exception as e:
            print(f"Error al convertir la imagen original a base64: {e}")
            return jsonify({"error": "Error al convertir la imagen original"}), 500

        # Convertir el mapa de segmentación a imagen
        try:
            buf = io.BytesIO()
            plt.imsave(buf, mapa_panoptico, format='png')
            buf.seek(0)
            img_str_segmentada = base64.b64encode(buf.read()).decode('utf-8')
        except Exception as e:
            print(f"Error al convertir el mapa de segmentación a imagen: {e}")
            return jsonify({"error": "Error al convertir el mapa de segmentación"}), 500

        print("Segmentación completada exitosamente")
        return jsonify({"imagen_original": img_str_original, "imagen_segmentada": img_str_segmentada})
    except Exception as e:
        print(f"Error inesperado en el endpoint /segmentar: {e}")
        return jsonify({"error": "Error inesperado en el servidor"}), 500

@app.route('/presentacion')
def presentacion():
    return jsonify({"message": "Bienvenidos a la API de segmentación de imágenes con MaskFormer."})

@app.route('/modelo')
def modelo():
    return jsonify({"message": "MaskFormer es un modelo avanzado para la segmentación de instancias, semántica y panóptica."})

@app.route('/conocenos')
def conocenos():
    return jsonify({"message": "Somos un equipo dedicado a implementar tecnologías avanzadas de visión por computadora."})

if __name__ == '__main__':
    app.run(debug=True)



