declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '@env' {
  export const GENERATE_SOURCEMAP: boolean;
  export const REACT_APP_BASE_URL_DEV: string;
  export const REACT_APP_BASE_URL: string;
  export const NODE_ENV: string;
}
