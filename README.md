
# Gekko All-in-One Docker

Gekko is a Bitcoin TA trading and backtesting platform that connects to popular Bitcoin exchanges. It is written in JavaScript and runs on [Node.js 10](http://nodejs.org).

This Docker container includes additional Gekko strategies from xFFFFF and a backtest tool with autobuild functionality.

## Built On

- LTS Node.js 10
- Redis 2.8.0
- mathjs
- convnet
- tulind and talib

## Added Features

- [Gekko strategies](strategies/)
- [gekkoga](gekkoga/) - Genetic algorithm optimization
- [backtestTool](Gekko-BacktestTool/) - Automated backtesting tool

Some dependencies were added to the initial script from b16b00b5.

## Installation with Docker

### Environment Variables

```bash
HOST=192.168.x.x
PORT=3000
MEMORYNODE=2048
USE_SSL=0
```

**Important Notes:**
- Prefer to use the real IP of the machine for testing
- Adjust `MEMORYNODE` for maximum memory size under the limit of container memory (-10% is recommended)

### Configuration

Before starting the container, set the correct IP address and local port.

If you change the IP from localhost to another address and the container starts with the wrong IP, you can manually change the IP in [`/usr/src/app/web/vue/dist/UIconfig.js`](web/vue/dist/UIconfig.js) or delete the container and rebuild.

## TODO

- Clean dependencies and some strategies that don't work

## Contributing

Visit the [GitHub repository](https://github.com/viking76/gekko.git) to add new functions and contribute to the project.

## Community & Support

Gekko has [a forum](https://forum.gekko.wizb.it/) that is the place for discussions on using Gekko, automated trading and exchanges. If you prefer to chat in real-time about Gekko, feel free to join the [Gekko Support Discord](https://discord.gg/26wMygt).

## Acknowledgments

Goodbye askmike, thanks for your effort!

If Gekko helped you in any way, you can always leave a tip at:
**BTC:** `13r1jyivitShUiv9FJvjLH7Nh1ZZptumwW`