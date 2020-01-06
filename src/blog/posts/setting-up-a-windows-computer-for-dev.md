---
templateKey: blog-post
draft: false
title: Setting up a Windows Computer for Dev
publishDate: '2019-11-05'
updateDate: '2019-11-14'
description: >-
  In the past, Windows has developed a reputation for being a difficult OS to 
  use as a developer. Things were difficult to install and run, involved complex
  workarounds and you could forget doing anything involving Ruby. Thankfully in
  recent years that's improved, even more so with the Windows Subsystem for
  Linux (WSL) so it's now possible to do pretty much everything you can on a
  Unix system.
mainBlog: The Freelance Guide
tags:
  - Windows
  - Dev
  - Freelance
featuredImage: /img/blog/woman_at_computer.jpg
featuredGif: /img/blog/windows_start.gif
---
In the past, Windows has developed a reputation for being a difficult OS to use as a developer. Things were difficult to install and run, involved complex workarounds and you could forget doing anything involving Ruby. Thankfully in recent years that's improved, even more so with the Windows Subsystem for Linux (WSL) so it's now possible to do pretty much everything you can on a unix system.

This is easiest when setting up a computer from scratch, but if it's an existing computer most of this should work (I've had issues with installing Ruby on an existing install though).

You may not need to use all these programs, I use the following tools on a daily basis for various types of development:

* WSL
* Homebrew
* NVM (Node Version Manager)
* Yarn
* Local by Flywheel (WordPress dev only)
* Firefox
* Firefox Nightly
* Edge Beta
* VS Code
* Chrome

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

![](/img/blog/homebrew_bash.png)

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
