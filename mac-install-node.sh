#!/bin/bash

# Check if Homebrew is installed; if not, install it
if ! command -v brew &> /dev/null; then
    echo "Homebrew not found. Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Install Node.js and npm using Homebrew
echo "Installing Node.js and npm..."
brew install node

# Verify the installation
node -v
npm -v

echo "Node.js and npm installation complete."
