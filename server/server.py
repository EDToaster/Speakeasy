from flask import Flask, request
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

            print(f"{ln[joy]}, {ln[sorrow]}, {ln[anger]}, {ln[surprise]}")

    return f"{len(files)} images received"


@app.route('/audio', methods=['POST'])
def process_audio():

    return f"{len(files)} audio files received"
