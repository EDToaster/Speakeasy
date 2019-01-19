from flask import Flask, request, jsonify
from google.cloud import vision
from google.cloud.vision import types
from PIL import Image, ImageDraw
import base64

app = Flask(__name__)

client = vision.ImageAnnotatorClient()

ln = ('UNKNOWN', 'VERY_UNLIKELY', 'UNLIKELY', 'POSSIBLE',
      'LIKELY', 'VERY_LIKELY')


@app.route('/images', methods=['POST'])
def process_images():

    files = request.files.to_dict()

    to_return = []

    for file in files.values():
        print(file)

        image = vision.types.Image(content=file.read())

        response = client.face_detection(image=image)

        faces = response.face_annotations

        for face in faces:
            joy = face.joy_likelihood
            sorrow = face.sorrow_likelihood
            anger = face.anger_likelihood
            surprise = face.surprise_likelihood

            print(f"{joy}, {sorrow}, {anger}, {surprise}")

            to_return.append({'filename': file.filename,
                          'emotions': [joy, sorrow, anger, surprise]})
            

    return jsonify(to_return)


@app.route('/audio', methods=['POST'])
def process_audio():

    return f"{len(files)} audio files received"
