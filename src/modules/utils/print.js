/**
 * print a message with a specified style.
 *
 * @param {string} message - The message to be logged.
 * @param {('success'|'error'|'warn')} state - The state of the message.
 */
export default function print(message, state = 'success') {
  const styles = {
    success: 'color: green; font-weight: bold;',
    error: 'color: red; font-weight: bold;',
    warn: 'color: orange; font-weight: bold;',
  }

  const log = `mona > %c${message}`

  if (state === 'success') {
    console.log(`${log}`, styles[state])
  } else if (state === 'warn') {
    console.warn(`${log}`, styles[state])
  } else {
    console.error(`${log}`, styles[state])
    throw message
  }
}
