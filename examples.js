#!/usr/bin/env node

/*
 * Raman Marozau <engineer.morozov@gmail.com>, 2019-present
 */

const { exec } = require('child_process');

const { execAction, stop, Logger, ANSI_FG_RED, ANSI_FG_GREEN, ANSI_FG_NC, EMPTY_LINE } = require('./utils');

/**
 * `execAction` Example
 */
class Examples {

  /**
   * Executes `ps` command and displays `execAction` callback arguments
   * @example
   * exec('ps', execAction((response, stderr, error) => {
   *   Logger.stack([
   *     [`${ANSI_FG_GREEN}%s${ANSI_FG_NC}`, `Response:`],
   *     [response],
   *   ]);
   *
   *   Logger.stack([
   *     [`${ANSI_FG_RED}%s${ANSI_FG_NC}`, `Standard error:`],
   *     [stderr || 'No Standard Error', EMPTY_LINE],
   *   ]);
   *
   *   Logger.stack([
   *     [`${ANSI_FG_RED}%s${ANSI_FG_NC}`, `Error:`],
   *     [error || 'No Error', EMPTY_LINE],
   *   ]);
   * }));
   */
  static ps() {
    exec('ps', execAction((response, stderr, error) => {
      Logger.stack([
        [`${ANSI_FG_GREEN}%s${ANSI_FG_NC}`, `Response:`],
        [response],
      ]);

      Logger.stack([
        [`${ANSI_FG_RED}%s${ANSI_FG_NC}`, `Standard error:`],
        [stderr || 'No Standard Error', EMPTY_LINE],
      ]);

      Logger.stack([
        [`${ANSI_FG_RED}%s${ANSI_FG_NC}`, `Error:`],
        [error || 'No Error', EMPTY_LINE],
      ]);
    }));
  }

  /**
   * Executes `ps` command and displays `execAction` callback arguments
   * Pay attention: stderr is a text, error is an Error object.
   * @example
   * exec('ps --invalid-parameter', execAction((response, stderr, error) => {
   *   Logger.stack([
   *     [`${ANSI_FG_GREEN}%s${ANSI_FG_NC}`, `Response:`],
   *     [response],
   *   ]);
   *
   *   Logger.stack([
   *     [`${ANSI_FG_RED}%s${ANSI_FG_NC}`, `Standard error:`],
   *     [stderr || 'No Standard Error', EMPTY_LINE],
   *   ]);
   *
   *   Logger.stack([
   *     [`${ANSI_FG_RED}%s${ANSI_FG_NC}`, `Error:`],
   *     [error || 'No Error', EMPTY_LINE],
   *   ]);
   * }, { stderr: false, error: false }));
   */
  static psInvalid() {
    exec('ps --invalid-parameter', execAction((response, stderr, error) => {
      Logger.stack([
        [`${ANSI_FG_GREEN}%s${ANSI_FG_NC}`, `Response:`],
        [response],
      ]);

      Logger.stack([
        [`${ANSI_FG_RED}%s${ANSI_FG_NC}`, `Standard error:`],
        [stderr || 'No Standard Error', EMPTY_LINE],
      ]);

      Logger.stack([
        [`${ANSI_FG_RED}%s${ANSI_FG_NC}`, `Error:`],
        [error || 'No Error', EMPTY_LINE],
      ]);
    }, { stderr: false, error: false }));
  }

  /**
   * Executes `ps` command then stops script running.<br>
   * This test DO NOT executes the machine reboot in case of `stop` action existing.<br>
   * Just try to remove `stop` command ;)
   * @example
   * exec('ps', execAction(() => {
   *   stop([`${ANSI_FG_RED}%s${ANSI_FG_NC}`, `The machine will not be reboot according to the \`stop\` command.`]);
   *   exec('sudo shutdown -r now', execAction(() => {
   *     Logger.stack([
   *       [`${ANSI_FG_RED}%s${ANSI_FG_NC}`, `The machine has been reboot.`],
   *     ]);
   *   }))
   * }));
   */
  static stop() {
    exec('ps', execAction(() => {
      stop([`${ANSI_FG_RED}%s${ANSI_FG_NC}`, `The machine will not be reboot according to the \`stop\` command.`]);
      exec('sudo shutdown -r now', execAction(() => {
        Logger.stack([
          [`${ANSI_FG_RED}%s${ANSI_FG_NC}`, `The machine has been reboot.`],
        ]);
      }))
    }));
  }
}

Examples.stop();


