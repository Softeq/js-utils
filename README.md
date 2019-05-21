## Javascript Utils

### Overview
Implementation of helper tools.\
[Development documentation](https://github.com/Softeq/js-utils/blob/master/docs/README.md)

### Install
```npm install @softeq/utils```

### Usage
Package helper tools are responsible on helpers to simplify interaction with server commands.
Node.js has [child_process](https://nodejs.org/api/child_process.html) module that provides the ability to spawn child processes in a manner that is similar, but not identical, to [popen(3)](http://man7.org/linux/man-pages/man3/popen.3.html)

Default [child_process.exec](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback) callback has a bit non standard arguments order to have more stable common handlers callback approach.
Default handler callback:
```js
/**
 * @param {Error} error - Instance of Error object. Can be thrown when runtime errors occur.
 * @param {string | Buffer} stdout - `stdout` unix output string
 * @param {string | Buffer} stderr - `stderr` unix output string
 */
function callback(error, stdout, stderr) {
  // ...
}

exec('ps', (error, stdout, stderr) => {
  // ...
})
```
Helper function `execAction` provides more standard arguments order and provides internal errors handlers according to conditional configuration `exitConditions`.
```js
/**
 * @param {string | Buffer} response - `stdout` unix output string
 * @param {string | Buffer} stderr - `stderr` unix output string
 * @param {Error} error - Instance of Error object. Can be thrown when runtime errors occur.
 */
function callback(response, stderr, error) {
  // ...
}

exec('ps', execAction((response, stderr, error) => {
  // ...
}, { stderr: true, error: false }));
```

Helper function `stop` stops any running process and displays message according to the `Logger.stack` method.
```js
exec('ps', execAction(() => {
  stop([`${ANSI_FG_RED}%s${ANSI_FG_NC}`, `The machine will not be reboot according to the \`stop\` command.`]);
  exec('sudo shutdown -r now', execAction(() => {
    Logger.stack([
      [`${ANSI_FG_RED}%s${ANSI_FG_NC}`, `The machine has been reboot.`],
    ]);
  }))
}));
```
Pay attention to the argument of `stop` function:
- Array of [console.log](https://nodejs.org/api/console.html#console_console_log_data_args) arguments
- Package contains default unix terminal colors according to [ANSI escape code](https://en.wikipedia.org/wiki/ANSI_escape_code).

Colors:
- red
- yellow
- green
- no color

Note: try to consider why do we need no color ANSI escape code. 

#### Logger
Node.js interaction with server requires terminal notifications often. `Logger` class provides the common way to compose notifications with next static methods.
##### `static Logger.stack`
Displays the stack of messages.
Message is an array of [console.log](https://nodejs.org/api/console.html#console_console_log_data_args) arguments.
```js
Logger.stack([
  [`%s`, `${ANSI_FG_GREEN}Response:${ANSI_FG_NC}`],
  [response],
]);
```

##### `static Logger.error`
Displays an error according to unix output standard with Node.js improvement according to conditional configuration `exitConditions`.
```js
Logger.error(error, stderr, { stderr: true, error: false });
```

##### Common
- Some terminal messages can contain `EMPTY_LINE` as a new line or `EMPTY_STRING`.
- Examples are focused on _Unix_ environment.
 

