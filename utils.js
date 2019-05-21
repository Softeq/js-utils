/*
 * Raman Marozau <engineer.morozov@gmail.com>, 2019-present
 */

/**
 * Constant defines new line [Escape Sequence]{@link https://en.wikipedia.org/wiki/Escape_sequences_in_C}.
 * @type {string}
 */
const EMPTY_LINE = '\n';

/**
 * Defines empty string.
 * @type {string}
 */
const EMPTY_STRING = '';

/**
 * [ANSI escape code]{@link https://en.wikipedia.org/wiki/ANSI_escape_code} to define terminal font color: red.
 * @type {string}
 */
const ANSI_FG_RED = '\x1b[31m';

/**
 * [ANSI escape code]{@link https://en.wikipedia.org/wiki/ANSI_escape_code} to define terminal font color: yellow.
 * @type {string}
 */
const ANSI_FG_YELLOW = '\x1b[33m';

/**
 * [ANSI escape code]{@link https://en.wikipedia.org/wiki/ANSI_escape_code} to define terminal font color: green.
 * @type {string}
 */
const ANSI_FG_GREEN = '\x1b[32m';

/**
 * [ANSI escape code]{@link https://en.wikipedia.org/wiki/ANSI_escape_code} to define terminal font color: default.
 * @type {string}
 */
const ANSI_FG_NC = '\x1b[0m'; // no color

/**
 * Node.js [`child_process.exec`]{@link https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback} callback handler.<br>
 * Note: callback changes the order of the default [`child_process.exec`]{@link https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback} process callback: (error, response, stderr) to (response, stderr, error)
 * @param {Function} callback - [`child_process.exec`]{@link https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback} process callback according to the next arguments order: `response`, `stderr`, `error`
 * @param {Object} exitConditions - Controls the process running process. Arguments interact with [Logger]{@link Logger}
 * @example
 * exec('ps', execAction((response, stderr, error) => {
 *  Logger.stack([
 *    [`${ANSI_FG_GREEN}%s${ANSI_FG_NC}`, `Response:`],
 *    [response],
 *  ]);
 *
 *  Logger.stack([
 *    [`${ANSI_FG_RED}%s${ANSI_FG_NC}`, `Standard error:`],
 *    [stderr || 'No Standard Error', EMPTY_LINE],
 *  ]);
 *
 *  Logger.stack([
 *    [`${ANSI_FG_RED}%s${ANSI_FG_NC}`, `Error:`],
 *    [error || 'No Error', EMPTY_LINE],
 *  ]);
 * }));
 * @return {Function} Default [`child_process.exec`]{@link https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback} process callback
 */
function execAction(callback, exitConditions = { error: true, stderr: true }) {
  return (error, response, stderr) => {
    Logger.error(error, stderr, exitConditions);
    callback(response, stderr, error);
  }
}

/**
 * Stops process and displays message.
 * @param {string[]} args - Array of [console.log]{@link https://nodejs.org/api/console.html#console_console_log_data_args} arguments
 */
function stop(args) {
  if (args && args.length !== 0) {
    Logger.stack([args]);
  }
  process.exit(0);
}

/**
 * Terminal logger
 */
class Logger {

  /**
   * Displays the stack of messages.<br>
   * Message is an array of [console.log]{@link https://nodejs.org/api/console.html#console_console_log_data_args} arguments.
   * @param {string[][]} logStack - Stack of [console.log]{@link https://nodejs.org/api/console.html#console_console_log_data_args} arguments arrays
   * @example
   * Logger.stack([
   *    [`${ANSI_FG_GREEN}%s${ANSI_FG_NC}`, `Response:`],
   *    [response],
   *  ]);
   */
  static stack(logStack) {
    logStack.forEach((log) => {
      console.log(...log);
    });
  }

  /**
   * Displays an error according to unix output standard with Node.js improvement.
   * @param {Error} error - Instance of Error object. Can be thrown when runtime errors occur.
   * @param {string | Buffer} stderr - `stderr` unix output string
   * @param {Object} exitConditions - Controls an invalid running process
   * @example
   * Logger.error(error, stderr, { error: true, stderr: false });
   */
  static error(error, stderr, exitConditions = { error: true, stderr: true }) {
    if (error !== null) {
      Logger.stack([[`${ANSI_FG_RED}%s${ANSI_FG_NC}`, `Error: ${error}`]]);
      if (exitConditions.error) {
        process.exit(0)
      }
    }
    if (stderr) {
      Logger.stack([[`%s`, stderr]]);
      if (exitConditions.stderr) {
        process.exit(0);
      }
    }
  }
}

module.exports = {
  EMPTY_LINE,
  EMPTY_STRING,
  ANSI_FG_RED,
  ANSI_FG_YELLOW,
  ANSI_FG_GREEN,
  ANSI_FG_NC,
  execAction,
  stop,
  Logger,
};
