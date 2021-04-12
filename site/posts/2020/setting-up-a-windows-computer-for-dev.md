---
title: Setting up a Windows Computer for Dev
publish: 2019-11-05
date: 2020-08-20
description: In the past, Windows has developed a reputation for being a difficult OS to use as a developer. Things were difficult to install and run, involved complex workarounds and you could forget doing anything involving Ruby. Thankfully in recent years that's improved, even more so with the Windows Subsystem for Linux (WSL) so it's now possible to do pretty much everything you can on a Unix system.
categories: [Windows, Dev]
featured:
  src: feature/patrick-amoy-0vc8ujenzm0-unsplash.jpg
tableContents: true
---

In the past, Windows has developed a reputation for being a difficult OS to use as a developer. Things were difficult to install and run, involved complex workarounds and you could forget doing anything involving Ruby. Thankfully in recent years that's improved, even more so with the Windows Subsystem for Linux (WSL) so it's now possible to do pretty much everything you can on a unix system.

This is easiest when setting up a computer from scratch, but if it's an existing computer most of this should work (I've had issues with installing Ruby on an existing install though).

You may not need to use all these programs, I use the following tools on a daily basis for various types of development:

## WSL

The Windows Subsystem for Linux (WSL) gives the ability to run Linux bash on a Windows computer, and gives the ability to do pretty much everything you would normally do.

* Run the following command in Powershell as an Administrator
  ```bash
    Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
  ```
* Make sure you restart your computer once that's done
* Install Ubuntu from the [Microsoft Store](https://www.microsoft.com/en-au/p/ubuntu-1804-lts/9n9tngvndl3q?activetab=pivot:overviewtab). There are a few different versions so install what you like, but the unversioned one (`Ubuntu`) will install the latest version
* Open up the Ubuntu app and follow the instructions to set up your new user

<blockquote class="callout" data-tag="Pro tip">

Make note of the password you set, you will need to use that in future (this is a mistake that I've only made once)

</blockquote>

### WSL2 

In June 2020, Microsoft released WSL2, which you can use instead of or alongside WSL, for information on upgrading to WSL2, [check out the Microsoft docs](https://docs.microsoft.com/en-us/windows/wsl/install-win10#update-to-wsl-2?WT.mc_id=DOP-MVP-5003595).

## HomeBrew

* Download and install HomeBrew by running the below command in WSL
  ```bash
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"
  ```
* It will print out steps for you to take, make sure you follow all of them for it to work.

![](/img/dev/windows-terminal-setup/homebrew-install.png)

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

## fnm

Similar to NVM (Node Version Manager), [fnm](https://github.com/Schniz/fnm) is a node version manager that I had recommended to me as a better alternative

* Install fnm from the github repo
  ```bash
    curl https://raw.githubusercontent.com/Schniz/fnm/master/.ci/install.sh | bash
  ```
* Add the following to your `.bashrc` (or similar) file to allow using fnm
  ```bash
    ## fnm
    export PATH=/home/{your_username}/.fnm:$PATH
    eval "`fnm env --multi`"
  ```
* Install the version of node that you want and tell nvm to use that, eg:
  ```bash
    ## Install the latest node version
    fnm install latest
    fnm use latest

    ## Or install a specific version
    fnm install 12
    fnm use 12
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

<blockquote class="callout" data-tag="Pro Tip">

If you receive an error when running `yarn install` about no install directory, it's using `cmdtest`, uninstall that and run the yarn install scripts again

</blockquote>

## Windows Terminal

No matter whether you use WSL, Git Bash, Command Prompt or Powershell, [Windows Terminal](https://www.microsoft.com/en-au/p/windows-terminal/9n0dx20hk701?activetab=pivot:overviewtab) is the one for you.

Install through the Windows [App Store](https://www.microsoft.com/en-au/p/windows-terminal/9n0dx20hk701?activetab=pivot:overviewtab).

![](/img/dev/windows-terminal-setup/windows_terminal.png)

You can edit the settings to customise the terminals available, the default terminal, or to change the theme and background colours. For example, I have a background image set (with a fair bit of opacity so it's not too bright), so at a glance I can see which terminal I'm in.

```json
{
    "$schema": "https://aka.ms/terminal-profiles-schema",
    "defaultProfile": "{07b52e3e-de2c-5db4-bd2d-ba144ed6c273}",
    "requestedTheme": "dark",
    "profiles": {
        "defaults": {
            "fontFace": "Cascadia Code PL",
            "fontSize": 14,
        },
        "list": [
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
                "startingDirectory": "//wsl$/Ubuntu/home/amy",
                "backgroundImage": "C:\\Users\\amyka\\AppData\\Local\\Packages\\Microsoft.WindowsTerminal_8wekyb3d8bbwe\\LocalState\\ubuntu.png",
                "backgroundImageStretchMode": "uniform",
                "backgroundImageOpacity": 0.1
            }
        ]
    }

}
```

## Tunnelto

[Tunnelto](https://tunnelto.dev/) is a tool similar to [ngrok](https://ngrok.com/) that allows you to expose local servers to the internet. I had this pop on Twitter a while back and liked that the had the same functionality, but much more affordable to have custom subdomains and multiple servers running.

* Run the following commands to download and install Tunnelto (you may want to get the [most recent version](https://github.com/agrinman/tunnelto/releases/) from their repository though) and make it accessible from the command line
  ```bash
    sudo wget https://github.com/agrinman/tunnelto/releases/download/0.1.9/tunnelto-linux.tar.gz
    tar xvzf tunnelto-linux-tar.gz
    mv tunnelto /usr/local/bin/tunnelto
  ```
* Run the below command to set your auth token
  ```bash
    tunnelto set-auth --key {insertyourkey}
  ```
* You can now start a tunnel specifying the localhost port and a subdomain (if you don't have one, it'll auto generate one for you)
  ```bash
    tunnelto --subdomain amyskapers --port 8080
  ```