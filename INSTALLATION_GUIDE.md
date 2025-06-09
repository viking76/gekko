# Gekko Installation Guide for Beginners (Ubuntu)

This guide will help you install and run Gekko trading bot on Ubuntu from scratch. No prior experience required!

## What is Gekko?

Gekko is a Bitcoin trading bot that can:
- Analyze market data using technical indicators
- Execute automated trading strategies
- Backtest strategies on historical data
- Provide a web-based user interface for monitoring

## Prerequisites

Before installing Gekko, you need to have the following installed on your Ubuntu system:

### 1. Update Your System

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install Node.js and npm

Gekko requires Node.js (version 10 or higher). Here's how to install it:

```bash
# Install Node.js 18 (LTS version)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

You should see version numbers like:
- Node.js: v18.x.x
- npm: 9.x.x

### 3. Install Git

```bash
sudo apt install git -y
```

### 4. Install Build Tools (Required for some dependencies)

```bash
sudo apt install build-essential python3 -y
```

## Installation Steps

### Step 1: Download Gekko

```bash
# Navigate to your home directory
cd ~

# Clone the Gekko repository
git clone https://github.com/viking76/gekko.git

# Enter the Gekko directory
cd gekko
```

### Step 2: Install Dependencies

```bash
# Install all required Node.js packages
npm install
```

This may take a few minutes. You might see some warnings - this is normal.

### Step 3: Create Configuration File

```bash
# Copy the sample configuration
cp sample-config.js config.js
```

### Step 4: Test Installation

```bash
# Run the test suite to verify everything works
npm test
```

You should see output like:
```
✓ 49 passing (33ms)
✓ 1 pending
```

## Running Gekko

### Option 1: Web Interface (Recommended for Beginners)

The web interface is the easiest way to use Gekko:

```bash
# Start the web server
node gekko.js --ui
```

Then open your web browser and go to:
```
http://localhost:3000
```

### Option 2: Command Line (Advanced Users)

For backtesting or automated trading:

```bash
# Run a backtest with your configuration
node gekko.js -c config.js
```

## Configuration

### Basic Configuration

Edit the `config.js` file to customize Gekko:

```bash
# Open configuration file in text editor
nano config.js
```

Key settings to modify:

1. **Trading Pair**: Change the currency pair you want to trade
2. **Exchange**: Select your preferred exchange (Binance, Bitfinex, etc.)
3. **Strategy**: Choose a trading strategy (MACD, RSI, etc.)
4. **API Keys**: Add your exchange API credentials (for live trading)

### Web Interface Configuration

If you need to access Gekko from another computer, edit the UI configuration:

```bash
nano web/vue/dist/UIconfig.js
```

Change:
```javascript
_gekkoHost: 'http://localhost:3000'
```

To:
```javascript
_gekkoHost: 'http://0.0.0.0:3000'
```

## Common Issues and Solutions

### Issue 1: Permission Errors

If you get permission errors during installation:

```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### Issue 2: Port Already in Use

If port 3000 is already in use:

```bash
# Check what's using the port
sudo lsof -i :3000

# Kill the process (replace PID with actual process ID)
sudo kill -9 PID
```

### Issue 3: Node.js Version Issues

If you have an old Node.js version:

```bash
# Remove old Node.js
sudo apt remove nodejs npm

# Install Node.js using NodeSource (as shown in prerequisites)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Issue 4: Build Errors

If you encounter build errors during `npm install`:

```bash
# Install additional build dependencies
sudo apt install libc6-dev libc6-dev-i386 build-essential

# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Security Considerations

⚠️ **Important Security Notes:**

1. **Never share your API keys** - Keep them private and secure
2. **Start with paper trading** - Test strategies before using real money
3. **Use small amounts** - Start with small investments to minimize risk
4. **Regular backups** - Backup your configuration and data regularly

## Getting Started with Trading

### 1. Paper Trading (Recommended First Step)

Before using real money, practice with paper trading:

1. Set `config.tradingAdvisor.enabled = false` in your config
2. Set `config.paperTrader.enabled = true`
3. Configure your strategy and run backtests

### 2. Backtesting

Test your strategies on historical data:

1. Download historical data using the importer
2. Configure your strategy in `config.js`
3. Run: `node gekko.js -c config.js`

### 3. Live Trading

Only after successful paper trading and backtesting:

1. Add your exchange API keys to `config.js`
2. Set `config.trader.enabled = true`
3. Start with small amounts
4. Monitor closely

## Useful Commands

```bash
# Start web interface
node gekko.js --ui

# Run backtest
node gekko.js -c config.js

# Import historical data
node gekko.js --import

# Run tests
npm test

# Update Gekko
git pull origin master
npm install

# View logs
tail -f logs/gekko.log
```

## Directory Structure

```
gekko/
├── config.js              # Main configuration file
├── gekko.js               # Main application file
├── web/                   # Web interface files
├── strategies/            # Trading strategies
├── plugins/               # Gekko plugins
├── core/                  # Core application logic
├── exchange/              # Exchange connectors
├── docs/                  # Documentation
└── logs/                  # Log files
```

## Next Steps

1. **Read the Documentation**: Check the `docs/` folder for detailed guides
2. **Join the Community**: Visit the [Gekko Forum](https://forum.gekko.wizb.it/)
3. **Explore Strategies**: Look at different trading strategies in the `strategies/` folder
4. **Practice**: Start with paper trading and backtesting
5. **Stay Updated**: Follow the project on GitHub for updates

## Getting Help

If you need help:

1. **Check the logs**: Look in the `logs/` directory for error messages
2. **Search the forum**: Many common issues are discussed on the Gekko forum
3. **GitHub Issues**: Check existing issues or create a new one
4. **Discord**: Join the Gekko Support Discord for real-time help

## Disclaimer

⚠️ **USE AT YOUR OWN RISK!**

- Cryptocurrency trading involves significant risk
- Past performance does not guarantee future results
- Never invest more than you can afford to lose
- Always test thoroughly before live trading
- The developers are not responsible for any financial losses

---

**Happy Trading!** 🚀

Remember: The best traders are patient, disciplined, and always learning. Start small, learn continuously, and never risk more than you can afford to lose.