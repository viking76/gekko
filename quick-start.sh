#!/bin/bash

# Gekko Quick Start Script for Ubuntu
# This script automates the installation process for beginners

set -e  # Exit on any error

echo "🚀 Gekko Quick Start Installation Script"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running on Ubuntu
if ! grep -q "Ubuntu" /etc/os-release 2>/dev/null; then
    print_warning "This script is designed for Ubuntu. It may work on other Debian-based systems."
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root for security reasons."
   print_status "Please run as a regular user. The script will ask for sudo when needed."
   exit 1
fi

print_status "Starting Gekko installation..."

# Update system
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js
print_status "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    print_status "Installing Node.js 18 LTS..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 10 ]; then
        print_warning "Node.js version is too old. Installing Node.js 18..."
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt-get install -y nodejs
    else
        print_success "Node.js $(node --version) is already installed"
    fi
fi

# Install Git
print_status "Checking Git installation..."
if ! command -v git &> /dev/null; then
    print_status "Installing Git..."
    sudo apt install git -y
else
    print_success "Git is already installed"
fi

# Install build tools
print_status "Installing build tools..."
sudo apt install build-essential python3 libc6-dev -y

# Install Gekko dependencies
print_status "Installing Gekko dependencies..."
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Make sure you're in the Gekko directory."
    exit 1
fi

npm install

# Create config file if it doesn't exist
if [ ! -f "config.js" ]; then
    print_status "Creating configuration file..."
    cp sample-config.js config.js
    print_success "Configuration file created: config.js"
else
    print_warning "Configuration file already exists: config.js"
fi

# Run tests
print_status "Running tests to verify installation..."
if npm test; then
    print_success "All tests passed! ✅"
else
    print_error "Some tests failed. Check the output above."
    exit 1
fi

# Create a simple start script
print_status "Creating start script..."
cat > start-gekko.sh << 'EOF'
#!/bin/bash
echo "Starting Gekko Web Interface..."
echo "Open your browser and go to: http://localhost:3000"
echo "Press Ctrl+C to stop Gekko"
echo ""
node gekko.js --ui
EOF

chmod +x start-gekko.sh

print_success "Installation completed successfully! 🎉"
echo ""
echo "📋 What's next?"
echo "==============="
echo ""
echo "1. 📖 Read the full guide: cat INSTALLATION_GUIDE.md"
echo "2. ⚙️  Edit configuration: nano config.js"
echo "3. 🌐 Start web interface: ./start-gekko.sh"
echo "4. 📊 Or run a backtest: node gekko.js -c config.js"
echo ""
echo "🔗 Useful links:"
echo "   • Documentation: https://gekko.wizb.it/docs/"
echo "   • Forum: https://forum.gekko.wizb.it/"
echo "   • Discord: https://discord.gg/26wMygt"
echo ""
print_warning "⚠️  IMPORTANT: Start with paper trading and backtesting before using real money!"
echo ""
print_success "Happy trading! 🚀"