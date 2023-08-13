/**
 * print a message with a specified style.
 * @param {string} message The message to be logged.
 * @param {('success'|'warn'|'error')} state The state of the message.
 */
export default function print(message, state = 'success') {
  const msg = `mona > %c${message}`

  const styles = {
    success: 'color: #8cc265; font-weight: bold;',
    error: 'color: red; font-weight: bold;',
    warn: 'color: orange; font-weight: bold;',
  }

  switch (state) {
    case 'success':
      console.log(`${msg}`, styles[state])
      break
    case 'warn':
      console.warn(`${msg}`, styles[state])
      break
    case 'error':
      console.error(`${msg}`, styles[state])
      throw message
  }
}
