# The Backend

The server has been created using [Flask](https://flask.palletsprojects.com/en/2.0.x/). Its purpose is to process the
given data from the web application, perform the calculations using the Black Scholes Merton differential equation
calculator class written in Python 3, and return the appropriate price.

## Set Up

The easiest way to set this up would be through a smart IDE such as PyCharm. However, in the event you do not have
that, kindly use your machine's terminal (Linux/MacOS) or cmd (Windows) to perform the set up steps.

### Prerequisites

- Ensure the [PIP python package manager](https://pip.pypa.io/en/stable/quickstart/) is set up as it provides the
  simplest way to install the relevant Python packages
- It is **highly** recommended a python virtual environment is set up. To do so:
    1. Install `virtualenv` using PIP
        - `pip install virtualenv`
    2. Set up the virtual environment using `virtualenv`
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

Although this server is intended to be used with the web application, it's also capable of being used exclusively. This may be useful if you would like to leverage your own website using this server. The following is the API and schema used to validate the API
calls:

<br/>

<span style="color: green">GET</span> Health

Returns the server status
```
/health
```
*Sample Response Body*
```json
{
    "status": "up",
    "uptime": 5062.817890882492
}
```
<br/>

<span style="color: orange">POST</span> Sample Black Scholes Merton Calculator API Call (European Call)

Given the differential equation components, this will return the price of the call option
```
/api/calculator
```
*Sample Request Body*
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
*Sample Response Body*
```json
{
  "contract_price": 1.923203598494748,
  "contract_type": "call"
}
```

<br/>

<span style="color: orange">POST</span> Sample Black Scholes Merton Calculator API Call (European Put)

Given the differential equation components, this will return the price of the put option
```
/api/calculator
```
*Sample Request Body*
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
*Sample Response Body*
```json
{
  "contract_price": 1.724200273478111,
  "contract_type": "put"
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