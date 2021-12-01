import { STORAGE } from './consts';

export const isSignedIn = () => JSON.parse(localStorage.getItem(STORAGE.isSignedIn));
export const getAccountType = () => JSON.parse(localStorage.getItem(STORAGE.accountType));
export const isAdmin = () => JSON.parse(localStorage.getItem(STORAGE.accountType)) === 'employer';
export const isEmployer = () =>
  JSON.parse(localStorage.getItem(STORAGE.accountType)) === 'customer';
export const isCustomer = () => JSON.parse(localStorage.getItem(STORAGE.accountType)) === 'admin';
export const getEmailId = () => JSON.parse(localStorage.getItem(STORAGE.emailId));


export const setLogin = (info) => {
  localStorage.setItem(STORAGE.isSignedIn,true);
  localStorage.setItem(STORAGE.accountType,info.user.accountType);
  localStorage.setItem(STORAGE.emailId,info.user.emailId);
  localStorage.setItem(STORAGE.token,info.token);
  localStorage.setItem(STORAGE.companyId, info.user.companyId);
}