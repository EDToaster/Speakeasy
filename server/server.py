from flask import Flask, request, jsonify
from google.cloud import vision, speech, language
from google.cloud.speech import enums
from google.cloud.language import enums

from PIL import Image, ImageDraw
import base64

import wave

app = Flask(__name__)

vision_client = vision.ImageAnnotatorClient()
speech_client = speech.SpeechClient()
language_client = language.LanguageServiceClient()

ln = ('UNKNOWN', 'VERY_UNLIKELY', 'UNLIKELY', 'POSSIBLE',
      'LIKELY', 'VERY_LIKELY')


@app.route('/images', methods=['POST'])
def process_images():

    files = request.files.to_dict()

    to_return = []

    for file in files.values():
        print(file)

        image = vision.types.Image(content=file.read())

        response = vision_client.face_detection(image=image)

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

    files = request.files.to_dict() 

    to_return = []

    for file in files.values():

        filedata = {}

        audio = speech.types.RecognitionAudio(content=file.read())
        config = speech.types.RecognitionConfig(
            encoding=speech.enums.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=8000,
            language_code='en-US'
        )
        response = speech_client.recognize(config, audio)

        filedata["filename"] = file.filename
        filedata["filedata"] = []

        for result in response.results:
            text = result.alternatives[0].transcript
            document = language.types.Document(
                content=text,
                type=enums.Document.Type.PLAIN_TEXT
            )

            annotations = language_client.analyze_sentiment(document=document)

            filedata["filedata"].append(
                {
                    "sentence": text, 
                    "score": annotations.document_sentiment.score, 
                    "magnitude": annotations.document_sentiment.magnitude
                }
            )

        to_return.append(filedata) 



    return jsonify(to_return)
