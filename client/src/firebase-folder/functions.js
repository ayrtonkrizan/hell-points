import { functions } from './firebase';

const searchItem = functions.httpsCallable('searchItem');
const favoriteItems = functions.httpsCallable('favoriteItems');
const getMenus = functions.httpsCallable('getMenus');

export {
    searchItem,
    favoriteItems,
    getMenus
}