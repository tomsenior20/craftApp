import { JSDOM } from 'jsdom';

const { window } = new JSDOM();

// Type casting to avoid TypeScript errors
(global as any).window = window;
(global as any).document = window.document;
(global as any).navigator = window.navigator;
(global as any).localStorage = window.localStorage;
