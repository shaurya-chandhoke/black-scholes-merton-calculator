# The Backend

The server has been created using [Flask](https://flask.palletsprojects.com/en/2.0.x/). Its purpose is to process the
given data from the web application, perform the calculations using the Black Scholes Merton differential equation
calculator class written in Python 3, and return the appropriate price.

## Set Up

The easiest way to set this up would be through a smart IDE such as PyCharm. However, in the event a user does not have
that, kindly use your machine's terminal (linux/MacOS) or cmd (Windows) to perform the set up steps.

### Prerequisites

- Ensure the [PIP python package manager](https://pip.pypa.io/en/stable/quickstart/) is set up as it provides the
  simplest way to install the relevant Python packages
- It is **highly** recommended a python virtual environment is set up.
    - To set up the virtual environment:
        1. Install `virtualenv` using pip
            - `pip install virtualenv`
        2. Set up a virtual environment using `virtualenv`
            - `virtualenv venv`

### Installation

Assuming the above prerequisites are met, installation is as easy as:

```shell
pip install -r requirements.txt
```

The above command will pass the package contents listed in the *requirements.txt* to PIP and install each one.

### Start Up

Please run the **server.py** file to start the server:

```shell
python server.py
```

## Other Usages

Although this server is intended to be used with the web application, there's no reason why a user can't make use of the
api available to make calls to the calculator exclusively. The following is the api and schema used to validate the api
calls:

<br/>

<span style="color: green">GET</span> Health
```
http://127.0.0.1:5000/health
```

<br/>

<span style="color: orange">POST</span> Sample Black Scholes Merton Calculator API Call (European Call)
```
http://127.0.0.1:5000/api/calculator
```
*Request Body*
```json
{
    "optionType": "call",
    "stockPrice": 20,
    "strikePrice": 20,
    "timeToMaturity": 1,
    "riskFreeRate": 0.01,
    "volatility": 0.23
}
```

<br/>

<span style="color: orange">POST</span> Sample Black Scholes Merton Calculator API Call (European Put)
```
http://127.0.0.1:5000/api/calculator
```
*Request Body*
```json
{
    "optionType": "put",
    "stockPrice": 20,
    "strikePrice": 20,
    "timeToMaturity": 1,
    "riskFreeRate": 0.01,
    "volatility": 0.23
}
```

<br/>

### Schema
```json
{
  "$schema": "http://json-schema.org/draft/2019-09/schema#",
  "title": "BSM",
  "description": "Black Scholes Merton API Data",
  "type": "object",
  "additionalProperties": false,
  "minProperties": 6,
  "properties": {
    "optionType": {
      "type": "string",
      "description": "Whether the option to price is a European call or put"
    },
    "stockPrice": {
      "type": "number",
      "description": "The price of the stock"
    },
    "strikePrice": {
      "type": "number",
      "description": "The price of the stock when exercising the option"
    },
    "timeToMaturity": {
      "type": "number",
      "description": "The amount of time left before the option expires"
    },
    "riskFreeRate": {
      "type": "number",
      "description": "The risk-free interest rate"
    },
    "volatility": {
      "type": "number",
      "description": "The implied volatility of the option"
    }
  }
}
```