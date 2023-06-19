export default {
  root: './public',
  output: './',
  discover: {
    fileExtensions: ['.js', '.jsx'],
  },
  scanner: {
    skipJavascript: false,
    robotsTxt: false
  },
  puppeteerClusterOptions: {
    // only run 1 worker at a time 
    maxConcurrency: 1
  }
}
