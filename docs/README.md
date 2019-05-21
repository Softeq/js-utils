## Classes

<dl>
<dt><a href="#Logger">Logger</a></dt>
<dd><p>Terminal logger</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#EMPTY_LINE">EMPTY_LINE</a> : <code>string</code></dt>
<dd><p>Constant defines new line <a href="https://en.wikipedia.org/wiki/Escape_sequences_in_C">Escape Sequence</a>.</p>
</dd>
<dt><a href="#EMPTY_STRING">EMPTY_STRING</a> : <code>string</code></dt>
<dd><p>Defines empty string.</p>
</dd>
<dt><a href="#ANSI_FG_RED">ANSI_FG_RED</a> : <code>string</code></dt>
<dd><p><a href="https://en.wikipedia.org/wiki/ANSI_escape_code">ANSI escape code</a> to define terminal font color: red.</p>
</dd>
<dt><a href="#ANSI_FG_YELLOW">ANSI_FG_YELLOW</a> : <code>string</code></dt>
<dd><p><a href="https://en.wikipedia.org/wiki/ANSI_escape_code">ANSI escape code</a> to define terminal font color: yellow.</p>
</dd>
<dt><a href="#ANSI_FG_GREEN">ANSI_FG_GREEN</a> : <code>string</code></dt>
<dd><p><a href="https://en.wikipedia.org/wiki/ANSI_escape_code">ANSI escape code</a> to define terminal font color: green.</p>
</dd>
<dt><a href="#ANSI_FG_NC">ANSI_FG_NC</a> : <code>string</code></dt>
<dd><p><a href="https://en.wikipedia.org/wiki/ANSI_escape_code">ANSI escape code</a> to define terminal font color: default.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#execAction">execAction(callback, exitConditions)</a> ⇒ <code>function</code></dt>
<dd><p>Node.js <a href="https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback"><code>child_process.exec</code></a> callback handler.<br>
Note: callback changes the order of the default <a href="https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback"><code>child_process.exec</code></a> process callback: (error, response, stderr) to (response, stderr, error)</p>
</dd>
<dt><a href="#stop">stop(args)</a></dt>
<dd><p>Stops process and displays message.</p>
</dd>
</dl>

<a name="Logger"></a>

## Logger
Terminal logger

**Kind**: global class  

* [Logger](#Logger)
    * [.stack(logStack)](#Logger.stack)
    * [.error(error, stderr, exitConditions)](#Logger.error)

<a name="Logger.stack"></a>

### Logger.stack(logStack)
Displays the stack of messages.<br>
Message is an array of [console.log](https://nodejs.org/api/console.html#console_console_log_data_args) arguments.

**Kind**: static method of [<code>Logger</code>](#Logger)  

| Param | Type | Description |
| --- | --- | --- |
| logStack | <code>Array.&lt;Array.&lt;string&gt;&gt;</code> | Stack of [console.log](https://nodejs.org/api/console.html#console_console_log_data_args) arguments arrays |

**Example**  
```js
Logger.stack([
   [`%s`, `${ANSI_FG_GREEN}Response:${ANSI_FG_NC}`],
   [response],
 ]);
```
<a name="Logger.error"></a>

### Logger.error(error, stderr, exitConditions)
Displays an error according to unix output standard with Node.js improvement.

**Kind**: static method of [<code>Logger</code>](#Logger)  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | `error` unix output string |
| stderr | <code>string</code> \| <code>Buffer</code> | `stderr` unix output string |
| exitConditions | <code>Object</code> | Controls an invalid running process |

**Example**  
```js
Logger.error(error, stderr, { error: true, stderr: false });
```
<a name="EMPTY_LINE"></a>

## EMPTY\_LINE : <code>string</code>
Constant defines new line [Escape Sequence](https://en.wikipedia.org/wiki/Escape_sequences_in_C).

**Kind**: global constant  
<a name="EMPTY_STRING"></a>

## EMPTY\_STRING : <code>string</code>
Defines empty string.

**Kind**: global constant  
<a name="ANSI_FG_RED"></a>

## ANSI\_FG\_RED : <code>string</code>
[ANSI escape code](https://en.wikipedia.org/wiki/ANSI_escape_code) to define terminal font color: red.

**Kind**: global constant  
<a name="ANSI_FG_YELLOW"></a>

## ANSI\_FG\_YELLOW : <code>string</code>
[ANSI escape code](https://en.wikipedia.org/wiki/ANSI_escape_code) to define terminal font color: yellow.

**Kind**: global constant  
<a name="ANSI_FG_GREEN"></a>

## ANSI\_FG\_GREEN : <code>string</code>
[ANSI escape code](https://en.wikipedia.org/wiki/ANSI_escape_code) to define terminal font color: green.

**Kind**: global constant  
<a name="ANSI_FG_NC"></a>

## ANSI\_FG\_NC : <code>string</code>
[ANSI escape code](https://en.wikipedia.org/wiki/ANSI_escape_code) to define terminal font color: default.

**Kind**: global constant  
<a name="execAction"></a>

## execAction(callback, exitConditions) ⇒ <code>function</code>
Node.js [`child_process.exec`](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback) callback handler.<br>
Note: callback changes the order of the default [`child_process.exec`](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback) process callback: (error, response, stderr) to (response, stderr, error)

**Kind**: global function  
**Returns**: <code>function</code> - Default `child_process` `exec` process callback  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [`child_process.exec`](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback) process callback according to the next arguments order: `response`, `stderr`, `error` |
| exitConditions | <code>Object</code> | Controls the process running process. Arguments interact with [Logger](#Logger) |

**Example**  
```js
exec('ps', execAction((response, stderr, error) => {
 Logger.stack([
   [`%s`, `${ANSI_FG_GREEN}Response:${ANSI_FG_NC}`],
   [response],
 ]);

 Logger.stack([
   [`%s`, `${ANSI_FG_RED}Standard error:${ANSI_FG_NC}`],
   [stderr || 'No Standard Error', EMPTY_LINE],
 ]);

 Logger.stack([
   [`%s`, `${ANSI_FG_RED}Error:${ANSI_FG_NC}`],
   [error || 'No Error', EMPTY_LINE],
 ]);
}));
```
<a name="stop"></a>

## stop(args)
Stops process and displays message.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Array.&lt;string&gt;</code> | Array of [console.log](https://nodejs.org/api/console.html#console_console_log_data_args) arguments |

