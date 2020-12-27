const isDev = process.env.NODE_ENV !== 'production';

export const host = isDev ? 'http://localhost:3005' : 'https://test.com';
