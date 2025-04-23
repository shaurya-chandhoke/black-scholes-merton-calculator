import { NextResponse } from 'next/server';

function normalCDF(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp(-x * x / 2);
  const p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return x > 0 ? 1 - p : p;
}

function calculateOptionPrice(
  S: number, // Stock price
  K: number, // Strike price
  T: number, // Time to expiry
  r: number, // Risk-free rate
  sigma: number, // Volatility
  q: number, // Dividend yield
  isCall: boolean
): number {
  const d1 = (Math.log(S / K) + (r - q + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  
  if (isCall) {
    return S * Math.exp(-q * T) * normalCDF(d1) - K * Math.exp(-r * T) * normalCDF(d2);
  } else {
    return K * Math.exp(-r * T) * normalCDF(-d2) - S * Math.exp(-q * T) * normalCDF(-d1);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Convert string inputs to numbers and handle percentage values
    const S = parseFloat(body.stockPrice);
    const K = parseFloat(body.strikePrice);
    const T = parseFloat(body.timeToExpiry);
    const r = parseFloat(body.riskFreeRate) / 100; // Convert percentage to decimal
    const sigma = parseFloat(body.volatility) / 100; // Convert percentage to decimal
    const q = parseFloat(body.dividendYield) / 100; // Convert percentage to decimal

    // Calculate call and put prices
    const callPrice = calculateOptionPrice(S, K, T, r, sigma, q, true);
    const putPrice = calculateOptionPrice(S, K, T, r, sigma, q, false);

    return NextResponse.json({
      callPrice,
      putPrice,
    });
  } catch (error) {
    console.error('Error calculating options prices:', error);
    return NextResponse.json(
      { error: 'Failed to calculate options prices' },
      { status: 500 }
    );
  }
} 