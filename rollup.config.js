export default {
  input: 'src/index.js',
  output: {
    file: 'mona.js',
    format: 'es',
  },
  external: ['path', 'url', 'fs/promises', 'marked'],
}
