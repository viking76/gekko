
# Gekko All-in-One Docker

Gekko is a Bitcoin technical analysis trading and backtesting platform that connects to popular Bitcoin exchanges. It is written in JavaScript and runs on [Node.js 10](http://nodejs.org).

This Docker container includes additional Gekko strategies from xFFFFF and a Backtest Tool with autobuild functionality.

## Built On

- **LTS Node.js 10** - JavaScript runtime environment
- **Redis 2.8.0** - In-memory data structure store
- **mathjs** - Math library for JavaScript
- **convnet** - Neural network library
- **tulind and talib** - Technical analysis libraries

## Added Features

- [Gekko strategies](strategies/)
- [gekkoga](gekkoga/) - Genetic algorithm optimization
- [Backtest Tool](Gekko-BacktestTool/) - Automated backtesting tool

Some dependencies were added to the initial script from b16b00b5.

## Installation with Docker

### Environment Variables

```bash
HOST=192.168.x.x      # IP address of the host machine
PORT=3000             # Port for the web interface
MEMORYNODE=2048       # Memory allocation in MB
USE_SSL=0             # Set to 1 to enable SSL
```

**Important Notes:**
- Use the actual IP address of your machine rather than localhost for testing
- Adjust `MEMORYNODE` for maximum memory size under the limit of container memory (10% less than container limit is recommended)

### Configuration

Before starting the container, set the correct IP address and local port.

If you change the IP from localhost to another address and the container starts with the wrong IP, you can manually change the IP in [`UIconfig.js`](web/vue/dist/UIconfig.js) or delete the container and rebuild.

## TODO

- Clean dependencies and some strategies that don't work

## Contributing

Visit the [GitHub repository](https://github.com/viking76/gekko.git) to add new features and contribute to the project. We welcome contributions of all kinds!

## Community & Support

Gekko has [a forum](https://forum.gekko.wizb.it/) that is the place for discussions on using Gekko, automated trading, and exchanges. If you prefer to chat in real-time about Gekko, feel free to join the [Gekko Support Discord](https://discord.gg/26wMygt).

## Acknowledgments

Goodbye askmike, thanks for your effort!

If Gekko helped you in any way, you can always leave a tip at:
**BTC:** `13r1jyivitShUiv9FJvjLH7Nh1ZZptumwW`