import flask
from flask import render_template

from calculator import BlackScholesMertonCalculator

app = flask.Flask(__name__, template_folder='./templates')
app.config['Debug'] = True


@app.route('/', methods=['GET'])
def home():
    return render_template('home.html')


if __name__ == "__main__":
    bsmCalculator = BlackScholesMertonCalculator()
    app.run()
