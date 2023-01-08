from flask import Flask
from flask import request
from flask import send_file
from mix_im_test import *
import json
import base64

app = Flask(__name__)

@app.route('/')
def root():
    return send_file("index.html")

@app.route('/<path>')
def func(path):
    print(request.data)
    return send_file(path)


@app.route('/submitted_photo', methods=['POST'])
def index():
    file_name = request.files.get('image').name + ".png"
    request.files.get('image').save(file_name)
    num = get_digit(file_name)
    dc ={}
    dc["name"] = str(num)
    return json.dumps(dc)

@app.route('/taken_photo', methods=['POST'])
def camera():
    print(request.form)
    print(request.files)
    decoded_data = str(request.data)
    print(type(decoded_data))
    file_begin = decoded_data.split(',')[1]
    decoded_data = base64.decodebytes(bytes(file_begin, 'utf-8'))
    with open("image1.png", "wb") as f:
        f.write(decoded_data)
    #print(request.data)
    #file_name = request.files.get('image').name + ".png"
    #request.files.get('image').save(file_name)
    num = get_digit("image1.png")
    dc ={}
    dc["name"] = str(num)
    return json.dumps(dc)

if __name__ == '__main__':

    app.run(host="0.0.0.0")
