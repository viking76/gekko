# Node.js v22 Compatibility Guide

This guide covers the compatibility improvements made to Gekko for Node.js v22+ (LTS and Current versions).

## Overview

Gekko has been updated to fully support Node.js v22.16.0 and later versions. Several key changes were made to ensure compatibility with the latest Node.js runtime.

## Key Changes Made

### 1. Koa Framework Downgrade

**Issue**: Koa v3.0.0+ dropped support for generator functions, which are used throughout Gekko's middleware.

**Solution**: 
- Downgraded Koa from v3.0.0 to v2.16.1
- Downgraded koa-router from v13+ to v12.0.1
- Added koa-convert v2.0.0 to handle generator function middleware

### 2. Server Startup Command

**Issue**: Running `node server` failed with "Cannot find module" error.

**Solution**: Updated documentation to use `node server.js` instead of `node server`.

### 3. Lodash Compatibility

**Issue**: Lodash method compatibility issues in strategies route.

**Solution**: Updated `web/routes/strategies.js` to use compatible lodash methods.

### 4. WebSocket Configuration

**Issue**: WebSocket connections were not properly handled in the server.

**Solution**: Enabled WebSocket connection handling in `web/server.js`.

### 5. Dynamic Configuration

**Issue**: Hard-coded host/port configuration caused issues in different environments.

**Solution**: Updated `web/vue/dist/UIconfig.js` to use dynamic host/port detection.

## Installation Steps

### Prerequisites

- Node.js v22.16.0 or later
- npm (comes with Node.js)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/viking76/gekko.git
cd gekko

# Install dependencies
npm install

# Start the web server
cd web
node server.js
```

### Manual Server Startup

If you need to start the server manually:

```bash
cd gekko/web
node server.js
```

The server will start on the configured host/port (default: localhost:3000).

## Troubleshooting

### Common Issues

1. **"Cannot find module" error**
   - Ensure you're using `node server.js` instead of `node server`
   - Verify you're in the `gekko/web` directory

2. **Koa middleware errors**
   - The updated Koa v2.16.1 should resolve generator function issues
   - If you see middleware errors, ensure koa-convert is installed

3. **WebSocket connection issues**
   - The web UI may show "Disconnected" initially - this is normal
   - WebSocket connections are handled automatically by the server

4. **API endpoint errors**
   - Verify the server is running on the correct port
   - Check that all dependencies are installed with `npm install`

### Verification Steps

Test that your installation is working:

1. **Start the server**:
   ```bash
   cd gekko/web
   node server.js
   ```

2. **Test API endpoints**:
   ```bash
   # Test server info
   curl http://localhost:3000/api/info
   
   # Test strategies endpoint
   curl http://localhost:3000/api/strategies
   ```

3. **Access web interface**:
   Open http://localhost:3000 in your browser

## Dependencies Updated

The following dependencies were modified for Node.js v22 compatibility:

- **koa**: 3.0.0 → 2.16.1
- **koa-router**: 13.0.1 → 12.0.1
- **koa-convert**: Added v2.0.0

## Configuration Files Modified

- `package.json` - Updated dependency versions
- `web/server.js` - Added koa-convert wrappers, enabled WebSocket
- `web/routes/strategies.js` - Fixed lodash compatibility
- `web/vue/dist/UIconfig.js` - Dynamic host/port configuration

## Additional Resources

- [Node.js v22 Release Notes](https://nodejs.org/en/blog/release/v22.0.0)
- [Koa v2 Documentation](https://koajs.com/)
- [Gekko Server API Documentation](../internals/server_api.md)

## Support

If you encounter issues with Node.js v22 compatibility:

1. Check this guide for common solutions
2. Verify your Node.js version: `node --version`
3. Ensure all dependencies are installed: `npm install`
4. Visit the [Gekko Forum](https://forum.gekko.wizb.it/) for community support