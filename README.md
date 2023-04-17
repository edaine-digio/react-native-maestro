# React Native Boilerplate Project

This project is to be used for the basis of Digio Internal Training.

## Prerequisites

- A suitable code editor set up in advance
- Basic React knowledge
- Basic TypeScript knowledge

## Setup Instructions

1. Ensure the following software is installed:

- [Homebrew](https://brew.sh/)
- Node (version 14 or later)
  - [NVM](https://github.com/nvm-sh/nvm) is preferred as to not disrupt other workspaces relying on a particular Node version as there are some cases where React Native is incompatible with certain Node versions, `19.9.0` is the latest I've found to work.
- [Rbenv](https://github.com/rbenv/rbenv) (with version 3.1.2 installed)
- [Xcode v14.3](https://developer.apple.com/download/all/?q=Xcode)
- [Xcode Command Line Tools](https://developer.apple.com/download/all/?q=Xcode)
  - Ensure the version of Command Line Tools matches the version of Xcode
- [Android Studio](https://developer.android.com/studio) (Flamingo version)
  - Make sure to check `Android SDK`, `Android SDK Platform` and `Android Virtual Device` when installing.

2. Fork this repo using your preferred method
3. Clone the repo from your personal Gitlab account
4. Run `yarn install` to download the necessary dependencies for this project
5. Run `cd ios` then `bundle install` then `bundle exec pod install` to install the iOS dependencies as the Pods folder is under `.gitignore`

## iOS Setup

This is (hopefully) the more straightforward of the two operating systems. To run the project in a local iOS simulator:

1. In the root directory of the project, open a terminal and run `brew install watchman`
2. Run `yarn ios` in the terminal

If everything has been installed correctly, the Metro bundler and an iOS Simulator should run and launch the app locally.

- The targeted iOS simulator can be altered by adding a `--simulator="<Name of iOS device>"` to `yarn ios` in either the `package.json` script or in the command line.
  e.g. `yarn ios --simulator="iPhone 14 Pro Max"` or
  in `package.json` as a default simulator:
  ```
  "scripts": {
    "ios": "react-native run-ios --simulator='iPhone 14 Pro Max'"
  }
  ```

## Android Setup

The Android setup requires a few additional steps to get up and running:

1. Run `brew tap homebrew/cask-versions` then `brew install --cask zulu11`

- Zulu11 is an OpenJDK for M1 Macs

2. Open Android Studio and from the landing screen navigate to `More Actions` and select `SDK Manager`
3. Check `Show Package Details` in the bottom right corner
4. Look for the `Android 13 (Tiramisu)` entry and select:

- `Android SDK Platform 33`
- `Google APIs ARM 64 v8a System Image` (M1 Macs only)

5. Select `Apply` to download the selected software
6. Configure the `ANDROID_HOME` environment variables by running `open ~/.zshrc` (or bash equivalent) and pasting the following lines:

- `export ANDROID_HOME=$HOME/Library/Android/sdk`
- `export PATH=$PATH:$ANDROID_HOME/emulator`
- `export PATH=$PATH:$ANDROID_HOME/platform-tools`

7. Save and run `source ~/.zshrc` to apply changes
8. Verify the appropriate directories have been added to your path with `echo $ANDROID_HOME` then `echo $PATH`
9. Create an Android Virtual Device:

- From the Android Studio landing screen, navigate to `More Actions` and then `Virtual Device Manager`
- From the main Virtual Device Manager screen, select `Create device`
- As a starting point, select a Pixel 6 (supports Android 13 Tiramisu) and click `Next`
- For the Android Version, select `ARM Images` and download the latest image (should be version `S` targeting Android 12.0)
- The default settings should be fine as a starting point, but for consistency's sake, you may want to select `Show Advanced Settings` and uncheck `Enable Device Frame` to avoid any strange device-specific camera islands or frame notches
- Ensure this device runs by running `yarn android` - if it does, you can safely delete the device from Virtual Device Manager

10. Create another device, now targetting Android 13 (select `Tiramisu` from the `Recommended` tab instead of `ARM Images` tab) - this is just a sanity check to ensure there are no issues as there have been problems experienced when using Android versions in the Recommended tab straight off the bat.
11. In a terminal pointing at the project's root directory, run `yarn android` and ensure the Android 13 device runs correctly

If everything has been installed correctly, the Metro bundler and an Android Emulator should run and launch the app locally.
