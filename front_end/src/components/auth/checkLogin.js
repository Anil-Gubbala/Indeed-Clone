import { STORAGE } from './consts';

export const isSignedIn = () => JSON.parse(localStorage.getItem(STORAGE.isSignedIn));
export const getAccountType = () => JSON.parse(localStorage.getItem(STORAGE.accountType));
export const isAdmin = () => JSON.parse(localStorage.getItem(STORAGE.accountType)) === 'employer';
export const isEmployer = () =>
  JSON.parse(localStorage.getItem(STORAGE.accountType)) === 'customer';
export const isCustomer = () => JSON.parse(localStorage.getItem(STORAGE.accountType)) === 'admin';
export const getEmailId = () => JSON.parse(localStorage.getItem(STORAGE.emailId));
