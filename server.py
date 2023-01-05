from flask import Flask
from flask import request
from flask import send_file

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
        print(request.files.get('image').save(request.files.get('image').name + ".png"))
        return '{\n"name": "Alex"\n}\n'

if __name__ == '__main__':

    app.run()
