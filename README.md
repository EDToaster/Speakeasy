![SpeakEasy](./images/logo_p2.png)
--------------
[![forthebadge made-with-python](http://ForTheBadge.com/images/badges/made-with-python.svg)](https://www.python.org/)

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)
[![made-with-Markdown](https://img.shields.io/badge/Made%20with-Markdown-1f425f.svg)](http://commonmark.org)

**SpeakEasy** (Speech-processing easily-accessibly kit, SPEAK) is an open-source website designed to encourage users to be confident about their public speaking skills.
It supports integration with Quizlet, letting users upload their cue cards to read at their own pace. 

# Running
Git clone into a local repository, and follow the following guides

## Server (requires ```python3``` and ```unix/linux```)
1. Install all python dependencies from ```requirements.txt``` into your current python environment
2. Install flask through ```pip3```
3. Install ```google-cloud-vision```, ```google-cloud-language```, and ```google-cloud-speech``` through ```pip3```
4. Setup google api credentials:
   * Register for a google developers account
   * Enable ```Google Cloud Vision```, ```Google Natural Language```, and ```Google Speech-to-text``` apis
   * Create Service account credentials, download and put the ```json``` file in the ```server``` folder (named ```credentials.json```)
5. Run the server using ```make run```

## Client (requires ```python3```)
1. Just run ```python3 -m http.server``` in the ```client``` directory.
2. Navigate to ```localhost:8000```
3. ???
4. Profit.
