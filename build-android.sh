#!/bin/bash

# Codeword Puzzle Android Build Script
# This script builds the React app and packages it as an Android APK

set -e

echo "🔤 Building Codeword Puzzle Android App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the React app
echo "🏗️  Building React application..."
npm run build

# Check if Capacitor CLI is available
if ! npx cap --version &> /dev/null; then
    echo "❌ Capacitor CLI not found. Installing..."
    npm install @capacitor/cli --save-dev
fi

# Initialize Capacitor if not already done
if [ ! -f "capacitor.config.ts" ]; then
    echo "⚡ Initializing Capacitor..."
    npx cap init "Codeword Puzzle" "com.codewordpuzzle.app" --web-dir=build
fi

# Add Android platform if not already added
if [ ! -d "android" ]; then
    echo "🤖 Adding Android platform..."
    npx cap add android
fi

# Sync the web app with the native project
echo "🔄 Syncing web app with Android project..."
npx cap sync android

# Check if Android SDK is available
if ! command -v gradle &> /dev/null; then
    echo "⚠️  Gradle not found in PATH. Make sure Android SDK is installed."
    echo "   You can still open the project in Android Studio:"
    echo "   📱 npx cap open android"
    exit 0
fi

# Build the APK
echo "📱 Building Android APK..."
cd android
./gradlew assembleDebug

if [ $? -eq 0 ]; then
    echo "✅ Android APK built successfully!"
    echo "📍 APK location: android/app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "🚀 To install on device:"
    echo "   adb install android/app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "🔧 To open in Android Studio:"
    echo "   npx cap open android"
else
    echo "❌ APK build failed. Try opening in Android Studio:"
    echo "   npx cap open android"
    exit 1
fi