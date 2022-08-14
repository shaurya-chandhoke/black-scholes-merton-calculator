FROM ubuntu:latest
WORKDIR /code
RUN apt-get update
RUN apt-get install python3 python3-pip build-essential -y
COPY . .

RUN pip3 install virtualenv
RUN virtualenv venv
RUN pip3 install -r requirements.txt

EXPOSE 8080

CMD python3 server.py