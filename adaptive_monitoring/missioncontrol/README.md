# missioncontrol

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.0.0-rc8.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and NPM](nodejs.org) >= v4.1.1
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)

## Installing pre-reqs
* Install MySQL and create a database (schema) named `missioncontrol-dev`.
* Install Git, and set it up. Instructions are [here](https://help.github.com/articles/set-up-git/).
* Install Node.js version 4.1.1 or later.
* Clone this repository, run `git clone git@github.com:illinicubesat/missioncontrol.git`.
* Change into the directory you have cloned. It should be missioncontrol.
* Run `npm install -g yo grunt-cli bower generator-angular-fullstack@3.0.0-rc8`.
* Run `npm install & bower install`.

## Run
* Run `grunt serve` to serve the page.

## How to run MySQL server:
    export PATH=$PATH:/usr/local/mysql/bin
    mysql -u root -p
    SET PASSWORD = PASSWORD('your_password');

## Notes
- Install latest version from (nodejs.org)

- Run:
    sudo npm cache clean -f
    sudo npm install -g n
    sudo n 4.4.1

- Run:
    node -v (make sure 4.4.1 is active)

- Run:
    sudo npm install --global bower 

- Run:
    sudo npm install --global grunt-cli

- Run:
    sudo npm link ../tracker/

- Run:
    cd server/config/environment/ 
    open development.js 
    
- In text editor replace:
    uri: 'mysql://root@localhost:3306/missioncontrol-dev'
    with 
uri: 'mysql://root:YOUR_MYSQL_PASSWORD@localhost:3306/missioncontrol-dev',
