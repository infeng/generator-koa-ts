'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const glob = require('glob');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the prime ' + chalk.red('generator-koa-ts') + ' generator!'
    ));

    const prompts = [{
      type: 'confirm',
      name: 'createDirectory',
      message: 'Would you like to create a new directory for your project?',
      default: true
    }, {
      type: 'input',
      name: 'dirname',
      message: 'Enter directory name',
      when: props => {
        return props.createDirectory;
      }
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    if (this.props.createDirectory) {
      this.destinationRoot(this.props.dirname);
    }

    this.sourceRoot(path.join(__dirname, 'templates', 'shared'));
    glob.sync('**', {cwd: this.sourceRoot()}).map(file => {
      return this.fs.copy(
        this.templatePath(`${file}`),
        this.destinationPath(file.replace(/^_/, ''))
      );
    }, this);
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false
    });
  }
};
