.PHONY build : requirements

requirements: requirements.txt
	python3 -m pip install -r requirements.txt 

.PHONY run : server

server: server.py
	python3 server.py > /dev/null &
	sleep 10
	python3 -m webbrowser http://127.0.0.1:5000

.PHONY clean :
	rm -rf __pycache__ *.pyc
	
