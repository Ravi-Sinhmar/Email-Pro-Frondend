import { atom } from 'recoil';

export const authState = atom({
  key: 'authState', // unique ID
  default: false, // default value (not authenticated)
});