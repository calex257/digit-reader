from flask import Flask
from flask import request
from flask import send_file

app = Flask(__name__)

@app.route('/', methods=['GET'])
def func():
    print(request.data)
    return send_file("index.html")


@app.route('/<page>', methods=['POST'])
def index(page):
    if page == 'about':
        return send_file("index.html")
    else:
        print(page)
        return "lmao"

if __name__ == '__main__':

    app.run()
