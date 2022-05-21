#!/venv/bin python
import random

import flask
from flask import Flask, request, render_template
import smtplib
from email.mime.text import MIMEText

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


@app.route('/sendEmail', methods = ["GET", "POST"])
def send_email():
    if request.method == "GET":
        email = request.args.get("email")

        # generate message
        symbols = []
        text = []
        with open('../txt/symbols.txt') as f:
            for _ in range(50):
                symbols.append(f.readline()[:1])
                text.append(f.readline().split("\n")[0])
        f.close()
        picked = []
        message = ""
        indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                   10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
                   20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
                   30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
                   40, 41, 42, 43, 44, 45, 46, 47, 48, 49]
        random.shuffle(indexes)
        for i in range(10):
            picked.append(symbols[indexes[i]])
            message += (str(i + 1) + ". " + text[indexes[i]] + "\n")

        print(message);

        # send message
        str_message = "Мы получили запрос на ужасную регистрацию, в которой использовалась Ваша почта.\n\n " \
                      "Пожалуйста, введите данные символы на странице подтверждения в том же порядке\n\n"
        str_message += message


        msg = MIMEText(str_message, 'plain', 'utf-8')
        smtpObj = smtplib.SMTP('smtp.gmail.com', 587)
        smtpObj.starttls()
        smtpObj.login('artem.kinko.dev@gmail.com', 'nblnfjlkaokuovar')
        smtpObj.sendmail(email, email, msg.as_string())
        smtpObj.quit()

        # add to response
        response = flask.jsonify({'picked': picked})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

if __name__=='__main__':
    app.run()
