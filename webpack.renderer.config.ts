import type { Configuration } from 'webpack';
import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

export const rendererConfig: Configuration = {
  module: {
    rules
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    fallback: {
      "assert": require.resolve("assert/"),
      "util": require.resolve("util/"),
      "stream": require.resolve("stream-browserify"),
      "process": require.resolve("process/browser"),
      "zlib": require.resolve("browserify-zlib"),
      "http": require.resolve('stream-http'),
      "https": require.resolve('https-browserify'),
      "url": require.resolve('url/'),
      "fs": false
    },
    alias: {
      'iconv-lite$': 'iconv-lite/lib/index.js',
    },  
  },
};
