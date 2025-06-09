// Simple test configuration for backtesting
var config = {};

config.debug = false;
config.silent = false;

config.watch = {
  exchange: 'binance',
  currency: 'USDT',
  asset: 'BTC'
}

config.tradingAdvisor = {
  enabled: true,
  method: 'MACD',
  candleSize: 60,
  historySize: 10,
}

config.MACD = {
  short: 10,
  long: 21,
  signal: 9,
  thresholds: {
    down: -0.025,
    up: 0.025,
    persistence: 1
  }
};

config.backtest = {
  daterange: {
    from: "2018-01-01",
    to: "2018-01-02"
  }
}

config.performanceAnalyzer = {
  enabled: true,
  riskFreeReturn: 5
}

config.trader = {
  enabled: false,
}

config.adviceLogger = {
  enabled: false,
  muteSoft: true
}

config.backtestResultExporter = {
  enabled: true,
  writeToDisk: false,
  data: {
    stratUpdates: false,
    portfolioValues: true,
    stratCandles: false,
    roundtrips: true,
    trades: true
  }
}

module.exports = config;