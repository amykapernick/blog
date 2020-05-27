---
title: Setting up a Windows Computer for Dev
publish: 2019-11-05
date: 2020-05-22
description: In the past, Windows has developed a reputation for being a difficult OS to use as a developer. Things were difficult to install and run, involved complex workarounds and you could forget doing anything involving Ruby. Thankfully in recent years that's improved, even more so with the Windows Subsystem for Linux (WSL) so it's now possible to do pretty much everything you can on a Unix system.
categories: [Windows, Dev]
tags: 'posts'
layout: layouts/post.njk
featured: /img/patrick-amoy-0vc8ujenzm0-unsplash.jpg
---

In the past, Windows has developed a reputation for being a difficult OS to use as a developer. Things were difficult to install and run, involved complex workarounds and you could forget doing anything involving Ruby. Thankfully in recent years that's improved, even more so with the Windows Subsystem for Linux (WSL) so it's now possible to do pretty much everything you can on a unix system.

This is easiest when setting up a computer from scratch, but if it's an existing computer most of this should work (I've had issues with installing Ruby on an existing install though).

You may not need to use all these programs, I use the following tools on a daily basis for various types of development:

- [WSL](#wsl)
- [HomeBrew](#homebrew)
- [Ruby](#ruby)
- [NVM](#nvm)
- [Yarn](#yarn)
  - [Installing with Homebrew](#installing-with-homebrew)
  - [Installing with `apt-get`](#installing-with-apt-get)
- [Hotel](#hotel)
- [Windows Terminal](#windows-terminal)

## WSL

The Windows Subsystem for Linux (WSL) gives the ability to run Linux bash on a Windows computer, and gives the ability to do pretty much everything you would normally do.

* Run the following command in Powershell as an Administrator
  ```bash
    Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
  ```
* Make sure you restart your computer once that's done
* Install Ubuntu from the [Microsoft Store](https://www.microsoft.com/en-au/p/ubuntu-1804-lts/9n9tngvndl3q?activetab=pivot:overviewtab). There are a few different versions so install what you like, but the unversioned one (`Ubuntu`) will install the latest version
* Open up the Ubuntu app and follow the instructions to set up your new user

Pro tip: make note of the password you set, you will need to use that in future

## HomeBrew

* Download and install HomeBrew by running the below command in WSL
  ```bash
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"
  ```
* It will print out steps for you to take, make sure you follow all of them for it to work.

![](/img/homebrew-install.png)

```bash
sudo apt-get install build-essential
echo 'eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)' >>~/.profile
eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)
brew install gcc
```

## Ruby

Ruby can be a bit tricky (but nowhere near as tricky as it used to be), and may require re-installing, so recommend you do this first when you can

```bash
sudo apt-get update -y && sudo apt-get upgrade -y

sudo apt-add-repository ppa:brightbox/ruby-ng
sudo apt-get update
sudo apt-get install ruby2.5 ruby2.5-dev build-essential dh-autoreconf
```

## NVM

* Install NVM with Homebrew
  ```bash
    brew install nvm
  ```
* Run the following commands to setup your terminal to use NVM
  ```bash
    mkdir ~/.nvm
    cp $(brew --prefix nvm)/nvm-exec ~/.nvm/
    export NVM_DIR=~/.nvm
    source $(brew --prefix nvm)/nvm.sh
  ```
* Install the version of node that you want and tell nvm to use that, eg:
  ```bash
    nvm install 12.6.0
    nvm use 12.6.0
  ```

## Yarn

You can install yarn either with Homebrew or via `apt-get`, it's a little easier using Homebrew though as Ubuntu sometimes comes pre-installed with `cmdtest` which conflicts with yarn

### Installing with Homebrew

* Run to install yarn
  ```bash
    brew install yarn
  ```

### Installing with `apt-get`

* Run `sudo apt remove cmdtest`
* Run to install yarn
  ```bash
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt-get update && sudo apt-get install --no-install-recommends yarn
  ```
* Keep an eye on the install and make sure it's not installing `cmdtest`

If you receive an error when running `yarn install` about no install directory, it's using `cmdtest`, uninstall that and run the yarn install scripts again

## Hotel

[Hotel](https://github.com/typicode/hotel) is a tool I use when running local servers, to proxy localhost urls to mor user friendly (and static) domains.

For example, when I run a Gatsby site locally, it could be `localhost:8000` or `localhost:8001` depending on what else I have running, and while one site could be `:8000` on Monday, on Tuesday it might be `:8001` depending on which site I start first. 

With Hotel, it uses randomly generated numbers (to not conflict with other ports in use), and proxies them to a local domain set for that project, eg. `my-website.local` or `my-blog.local`.

It's a nice easy one to install:
```bash
npm install -g hotel
```

You can start the program by running `hotel start`, and end it by running `hotel stop`.

In each project, set your starting script, eg:
```bash
hotel add "npm start"
```

This start script may need tweaking, Hotel will set the port to `$PORT` by default, so this may need to be passed onto the local site, eg.
```bash
hotel add "npm start --port=$PORT"
```

## Windows Terminal

No matter whether you use WSL, Git Bash, Command Prompt or Powershell, [Windows Terminal](https://www.microsoft.com/en-au/p/windows-terminal/9n0dx20hk701?activetab=pivot:overviewtab) is the one for you.

Install through the Windows [App Store](https://www.microsoft.com/en-au/p/windows-terminal/9n0dx20hk701?activetab=pivot:overviewtab).

![](/img/windows_terminal.png)

You can edit the settings to customise the terminals available, the default terminal, or to change the theme and background colours. For example, I have a background image set (with a fair bit of opacity so it's not too bright), so at a glance I can see which terminal I'm in.

```json
{
    "$schema": "https://aka.ms/terminal-profiles-schema",
    "defaultProfile": "{07b52e3e-de2c-5db4-bd2d-ba144ed6c273}",
    "requestedTheme": "dark",
    "profiles": [
        {
            "guid": "{00000000-0000-0000-ba54-000000000002}",
            "commandline": "\"%PROGRAMFILES%\\git\\usr\\bin\\bash.exe\" -i -l",
            "icon": "C:\\Program Files\\Git\\mingw64\\share\\git\\git-for-windows.ico",
            "name": "Git Bash",
            "startingDirectory": "%USERPROFILE%",
            "backgroundImage": "C:\\Users\\amyka\\AppData\\Local\\Packages\\Microsoft.WindowsTerminal_8wekyb3d8bbwe\\LocalState\\git_bash.png",
            "backgroundImageStretchMode": "uniform",
            "backgroundImageOpacity": 0.1
        },
        {
            "guid": "{07b52e3e-de2c-5db4-bd2d-ba144ed6c273}",
            "hidden": false,
            "name": "Ubuntu 20.04 LTS",
            "source": "Windows.Terminal.Wsl",
            "colorScheme": "Themer Dark",
            "fontSize": 12,
            "backgroundImage": "C:\\Users\\amyka\\ubuntu.png",
            "backgroundImageStretchMode": "uniform",
            "backgroundImageOpacity": 0.1
        },
    ],
    "schemes": [
        {
            "name": "Theme Dark",
            "background": "#222323",
            "foreground": "#c2c2c2",
            "cursorColor": "#a550a7",
            "selectionBackground": "#007aff",
            "black": "#575858",
            "brightBlack": "#727373",
            "red": "#ff5257",
            "brightRed": "#F86E72",
            "green": "#62ba46",
            "brightGreen": "#7BC164",
            "yellow": "#fbb927",
            "brightYellow": "#F5C04B",
            "blue": "#007aff",
            "brightBlue": "#2C8EF8",
            "purple": "#a550a7",
            "brightPurple": "#B06CB2",
            "cyan": "#00c7a3",
            "brightCyan": "#2CCBAF",
            "white": "#c2c2c2",
            "brightWhite": "#dddddd"
        },
}
```