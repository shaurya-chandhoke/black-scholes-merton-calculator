from math import pow, sqrt, e

import numpy as np
from scipy.stats import norm


class BlackScholesMertonCalculator:

    def __init__(self):
        # Modify this for implied volatility accuracy and convergence time
        self.CONVERGENCE_THRESHOLD = 0.0001

    @staticmethod
    def d1(S_0, K, T, r, sigma):
        """
        Function that calculates d1

        :param S_0   Initial stock price
        :param K     Strike price
        :param T     Time
        :param r     Risk-free interest rate
        :param sigma Volatility
        """

        numerator = (np.log(S_0 / K)) + ((r + (pow(sigma, 2) / 2)) * T)
        denominator = sigma * sqrt(T)

        return numerator / denominator

    @staticmethod
    def d2(S_0, K, T, r, sigma):
        """
        Function that calculates d1

        :param S_0   Initial stock price
        :param K     Strike price
        :param T     Time
        :param r     Risk-free interest rate
        :param sigma Volatility
        """

        numerator = (np.log(S_0 / K)) + ((r - (pow(sigma, 2) / 2)) * T)
        denominator = sigma * sqrt(T)

        return numerator / denominator

    @staticmethod
    def delta(d_1):
        """
        Function that calculates Delta

        :param d_1 The expected value of the stock if and only if the stock price is above the strike price at
        expiration
        """
        return norm.cdf(d_1)

    def theta(self, S_0, K, T, r, sigma):
        """
        Function that calculates Theta

        :param S_0   Initial stock price
        :param K     Strike price
        :param T     Time
        :param r     Risk-free interest rate
        :param sigma Volatility
        """
        d_1 = self.d1(S_0=S_0, K=K, T=T, r=r, sigma=sigma)
        d_2 = self.d2(S_0=S_0, K=K, T=T, r=r, sigma=sigma)

        omega_1_numerator = S_0 * norm.pdf(d_1) * sigma
        omega_1_denominator = 2 * sqrt(T)

        omega_1 = -(omega_1_numerator / omega_1_denominator)

        omega_2 = r * K * pow(e, -r * T) * norm.cdf(d_2)

        return omega_1 - omega_2

    def gamma(self, S_0, K, T, r, sigma):
        """
        Function that calculates Gamma

        :param S_0   Initial stock price
        :param K     Strike price
        :param T     Time
        :param r     Risk-free interest rate
        :param sigma Volatility
        """
        d_1 = self.d1(S_0=S_0, K=K, T=T, r=r, sigma=sigma)

        gamma_numerator = norm.pdf(d_1) * pow(e, -r * T)
        gamma_denominator = S_0 * sigma * sqrt(T)

        return gamma_numerator / gamma_denominator

    def vega(self, S_0, K, T, r, sigma):
        """
        Function that calculates Vega

        :param S_0   Initial stock price
        :param K     Strike price
        :param T     Time
        :param r     Risk-free interest rate
        :param sigma Volatility
        """
        d_1 = self.d1(S_0=S_0, K=K, T=T, r=r, sigma=sigma)
        return S_0 * norm.pdf(d_1) * pow(e, -r * T) * sqrt(T)

    def rho(self, S_0, K, T, r, sigma):
        """
        Function that calculates Rho

        :param S_0   Initial stock price
        :param K     Strike price
        :param T     Time
        :param r     Risk-free interest rate
        :param sigma Volatility
        """
        d_2 = self.d2(S_0=S_0, K=K, T=T, r=r, sigma=sigma)
        return K * T * pow(e, -r * T) * norm.cdf(d_2)

    def impliedVolatility(self, S_0, K, T, r, originalPrice, optionType):
        """
        Function that calculates the implied volatility

        :param S_0            Initial stock price
        :param K              Strike price
        :param T              Time
        :param r              Risk-free interest rate
        :param originalPrice  The true option price
        :param optionType     The option type ('C' for call and 'P' for put)
        """
        sigma = 0.5
        sigmaHistory = [sigma]
        numIterations = 1

        if optionType == 'C':
            modelPrice = self.callPrice(S_0, K, T, r, sigma)
        else:
            modelPrice = self.putPrice(S_0, K, T, r, sigma)

        pricing_difference = modelPrice - originalPrice

        while pricing_difference > self.CONVERGENCE_THRESHOLD:
            sigma = sigma - (pricing_difference / self.vega(S_0, K, T, r, sigma))

            if optionType == 'C':
                modelPrice = self.callPrice(S_0, K, T, r, sigma)
            else:
                modelPrice = self.putPrice(S_0, K, T, r, sigma)

            pricing_difference = modelPrice - originalPrice

            numIterations += 1
            sigmaHistory.append(sigma)

        return sigma

    def callPrice(self, S_0, K, T, r, sigma):
        """
        Function that calculates the call option price

        :param S_0   Initial stock price
        :param K     Strike price
        :param T     Time
        :param r     Risk-free interest rate
        :param sigma Volatility
        """
        return (S_0 * norm.cdf(self.d1(S_0=S_0, K=K, T=T, r=r, sigma=sigma))) - (
                K * pow(e, -r * T) * norm.cdf(self.d2(S_0=S_0, K=K, T=T, r=r, sigma=sigma)))

    def putPrice(self, S_0, K, T, r, sigma):
        """
        Function that calculates the put option price

        :param S_0   Initial stock price
        :param K     Strike price
        :param T     Time
        :param r     Risk-free interest rate
        :param sigma Volatility
        """
        return (K * pow(e, -r * T) * norm.cdf(-self.d2(S_0=S_0, K=K, T=T, r=r, sigma=sigma))) - (
                S_0 * norm.cdf(-self.d1(S_0=S_0, K=K, T=T, r=r, sigma=sigma)))
