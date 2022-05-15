#!/venv/bin python
import random

import flask
from flask import Flask, request, render_template

# Flask constructor
app = Flask(__name__)

# A decorator used to tell the application
# which URL is associated function
@app.route('/getWordleWord', methods =["GET", "POST"])
def get_word():
    if request.method == "GET":

        f = open("../txt/guessingWords.txt")
        end = random.randint(0, 100)
        word = ""
        for i in range(end):
            word = (f.readline())[:5]
        print(word)
        f.close()
        response = flask.jsonify({'word': word})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

@app.route('/checkWordleWord', methods = ["GET", "POST"])
def check_word():
    if request.method == "GET":
        word = request.args.get("word")
        resp = "false"
        with open('../txt/words5letters.txt') as f:
            if word in f.read():
                resp = "true"
        f.close()
        response = flask.jsonify({'isCorrect': resp})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

if __name__=='__main__':
    app.run()