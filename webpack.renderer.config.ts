import type { Configuration } from 'webpack';
import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

export const rendererConfig: Configuration = {
  module: {
    rules: [
      {
        test: /node_modules[\/\\](iconv-lite)[\/\\].+/,
        resolve: {
          aliasFields: ['main']
        }
      },
      {
        test: /\.(ts|tsx|js|jsx)$/, // Match TypeScript and JavaScript files
        exclude: /node_modules/, // Exclude the node_modules directory
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-typescript'], // Use React and TypeScript presets
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Process CSS files
      },
    ],
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    fallback: {
      "assert": require.resolve("assert/"),
      "util": require.resolve("util/"),
      "stream": require.resolve("stream-browserify")
    },
    alias: {
      'iconv-lite$': 'iconv-lite/lib/index.js',
    },  
  },
};
