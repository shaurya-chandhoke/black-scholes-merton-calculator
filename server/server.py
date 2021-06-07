import json
from time import time

import flask
from flask import g, jsonify
from flask_expects_json import expects_json
from flask_cors import CORS

from calculator import BlackScholesMertonCalculator

# Global Variables
app = flask.Flask(__name__, template_folder='./templates')
app.config['Debug'] = True
CORS(app)

start_time = time()
bsmCalculator = BlackScholesMertonCalculator()

# Importing the API schema file
with open("schema.json") as file:
    schema = json.load(file)


@app.route('/', methods=['GET'])
@app.route('/health', methods=['GET'])
def get_health():
    response = {
        'status': 'up',
        'uptime': time() - start_time
    }
    return jsonify(response)


@app.route('/api/calculator', methods=['POST'])
@expects_json(schema)
def process_calculator():
    query_data = g.data

    optionType = query_data['optionType']
    stockPrice = query_data['stockPrice']
    strikePrice = query_data['strikePrice']
    timeToMaturity = query_data['timeToMaturity']
    riskFreeRate = query_data['riskFreeRate']
    volatility = query_data['volatility']

    if optionType == 'call':
        optionPrice = bsmCalculator.callPrice(S_0=stockPrice, K=strikePrice, T=timeToMaturity, r=riskFreeRate,
                                              sigma=volatility)
    else:
        optionPrice = bsmCalculator.putPrice(S_0=stockPrice, K=strikePrice, T=timeToMaturity, r=riskFreeRate,
                                             sigma=volatility)

    response = {
        "contract_type": optionType,
        "contract_price": optionPrice
    }
    return jsonify(response)


@app.errorhandler(400)
def response_400(e):
    response = {
        "status": 400,
        "description": "bad request"
    }
    return jsonify(response), 400


@app.errorhandler(404)
def response_404(e):
    response = {
        "status": 404,
        "description": "path not found"
    }
    return jsonify(response), 404


@app.errorhandler(500)
def response_500(e):
    response = {
        "status": 500,
        "description": "server is experiencing issue processing request"
    }
    return jsonify(response), 500


if __name__ == "__main__":
    app.run()
