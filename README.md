# React Native Boilerplate Project

This project is to be used for the basis of Digio Internal Training.

## Prerequisites

- A Mac machine, preferably M1 (sorry Windows enthusiasts - you can't download Xcode on non-Apple machines)
- A suitable code editor set up in advance
- Basic React knowledge
- Basic TypeScript knowledge

## Setup Instructions

1. Clone the repo.
2. Ensure the following software is installed:
- [Homebrew](https://brew.sh/)
- [asdf](https://asdf-vm.com/) to manage multiple tooling dependancies
  - And the following asdf plugins:
    - **nodejs** with `asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git`
    - **java** with `asdf plugin-add java https://github.com/halcyon/asdf-java.git`
      - Run `. ~/.asdf/plugins/java/set-java-home.zsh` after installing to set `$JAVA_HOME`
    - **ruby** with `asdf plugin add ruby https://github.com/asdf-vm/asdf-ruby.git`
    - **cocoapods** with `asdf plugin add cocoapods https://github.com/ronnnnn/asdf-cocoapods.git`
- Run `which ruby` `which java` `which ruby` `which pod` from within the project repo and ensure they are all coming from the asdf shim
- [Xcodes](https://github.com/XcodesOrg/XcodesApp) to download & manage Xcode versions.
  - Install and run Xcodes, install Xcode 15.0 and make it the Active Xcode.
  - Be sure to open Xcode 15.0 for the first time for it to instal the iOS images.
- Install Xcode Command Line Tools by running `xcode-select --install` in the terminal

- [Android Studio](https://developer.android.com/studio) (Flamingo version)
  - Make sure to check `Android SDK`, `Android SDK Platform` and `Android Virtual Device` when installing.


3. After installing everything, be sure to `source ~/.zshrc`.
4. Run `npm install` from the project root directory to download the necessary dependencies for this project
5. Run `cd ios` then `pod install` to install the iOS dependencies as the Pods folder is under `.gitignore`

## iOS Setup

This is (hopefully) the more straightforward of the two operating systems. To run the project in a local iOS simulator:

1. In the root directory of the project, open a terminal and run `brew install watchman`
2. Run `npm run ios` in the terminal

If everything has been installed correctly, the Metro bundler and an iOS Simulator should run and launch the app locally.

## Android Setup

The Android setup requires a few additional steps to get up and running:


1. Open Android Studio and from the landing screen navigate to `More Actions` and select `SDK Manager`
2. Check `Show Package Details` in the bottom right corner
3. Look for the `Android 13 (Tiramisu)` entry and select:

- `Android SDK Platform 33`
- `Google APIs ARM 64 v8a System Image` (M1 Macs only)

4. Select `Apply` to download the selected software
5. Configure the `ANDROID_HOME` environment variables by running `open ~/.zshrc` (or bash equivalent) and pasting the following lines:

- `export ANDROID_HOME=$HOME/Library/Android/sdk`
- `export PATH=$PATH:$ANDROID_HOME/emulator`
- `export PATH=$PATH:$ANDROID_HOME/platform-tools`
- `export JAVA_HOME=/Applications/Android\ Studio.app/Contents/jbr/Contents/Home`

6. Save and run `source ~/.zshrc` to apply changes
7. Verify the appropriate directories have been added to your path with `echo $ANDROID_HOME` then `echo $PATH`
8. Before continuing, restart your device to ensure the changes and new downloads take effect
9. Create an Android Virtual Device:

- From the Android Studio landing screen, navigate to `More Actions` and then `Virtual Device Manager`
- From the main Virtual Device Manager screen, select `Create device`
- As a starting point, select a Pixel 6 (supports Android 13 Tiramisu) and click `Next`
- For the Android Version, select `ARM Images` and download the latest image (should be version `S` targeting Android 12.0)
- The default settings should be fine as a starting point, but for consistency's sake, you may want to select `Show Advanced Settings` and uncheck `Enable Device Frame` to avoid any strange device-specific camera islands or frame notches
- Ensure this device runs by running `yarn android` - if it does, you can safely delete the device from Virtual Device Manager

10. Create another device, now targetting Android 13 (select `Tiramisu` from the `Recommended` tab instead of `ARM Images` tab) - this is just a sanity check to ensure there are no issues as there have been problems experienced when using Android versions in the Recommended tab straight off the bat.
11. In a terminal pointing at the project's root directory, run `npm run android` and ensure the Android 13 device runs correctly

If everything has been installed correctly, the Metro bundler and an Android Emulator should run and launch the app locally.

## Setup Troubleshooting
- Don't keep the project folder in `~/Documents`
- Add more issues/fixes here as they present themselves
