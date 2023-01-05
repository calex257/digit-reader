from flask import Flask
from flask import request
from flask import send_file
from mix_im_test import *
import json

app = Flask(__name__)

@app.route('/')
def root():
    return send_file("index.html")

@app.route('/<path>')
def func(path):
    print(request.data)
    if path != 'favicon.ico':
        return send_file(path)


@app.route('/<page>', methods=['POST'])
def index(page):
    if page == 'about':
        return send_file("index.html")
    else:
        file_name = request.files.get('image').name + ".png"
        request.files.get('image').save(file_name)
        num = get_digit(file_name)
        dc ={}
        dc["name"] = str(num)
        return json.dumps(dc)

if __name__ == '__main__':

    app.run()
