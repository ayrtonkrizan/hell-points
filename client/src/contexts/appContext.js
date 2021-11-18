import { useState, useEffect, useCallback, createContext } from "react";
import { auth, db } from "firebase-folder";

export const AppContext = createContext({
    signed: false,
    isAdmin: false,
    profile: { uuid: '', email: '', refreshToken: '', displayName: '', photoURL: '', addresses: {}, items: {} },
    cart: {},
    handleUpdateProfile: ({ displayName, photoURL }) => false,
    handleSignin: () => false,
    handleSignout: () => false,
    closedMenu: true,
    handleToggleMenu: () => false,
    handleAddItemCart: (itemId) => false,
    handleRemoveItemCart: (itemId) => false,
    reloadProfile: (itemId) => false,
    resetCart: () => false,
});

export const AppContextProvider = (props) => {
    const [fbUser, setFbUser] = useState();
    const [profile, setProfile] = useState({ items: {} });
    const [cart, setCart] = useState({});
    const [closedMenu, setClosedMenu] = useState(Boolean(window.innerWidth <= 480));
    const [doReloadProfile, setDoReloadProfile] = useState(false);

    const handleSignin = async (email, password) => {
        await auth.doSignInWithEmailAndPassword(email, password);
    }

    const handleSignout = useCallback(() => {
        auth.doSignOut();
        setProfile({ items: {} })
    }, [])

    const handleSigninSuccess = async (user) => {
        let token = await user.getIdToken();
        const { uid, email, refreshToken, displayName, photoURL } = user;
        let userDb = await db.getUsersByEmail(email) || {};
        let addresses = Object.values(userDb.addresses || {}).reduce((f, c) => {
            if (!c.deleted)
                f[c.id] = c;
            return f;
        }, {})

        setProfile({
            uid,
            email,
            refreshToken,
            displayName,
            photoURL,
            token,
            isAdmin: Boolean(userDb.isAdmin),
            addresses: addresses,
            items: userDb.items || {},
            phone: userDb.phone || '',
        })
    }

    const handleUpdateProfile = async ({ displayName = '', photoURL = '', phone = '' }) => {
        let currentUser = auth.currentUser();
        await db.updateUsers({ id: currentUser.email, displayName, photoURL, phone })
        let res = await currentUser.updateProfile({
            displayName: displayName || null,
            photoURL: photoURL || null,
        });
        setProfile(profile => ({ ...profile, displayName, photoURL, phone }));
        return res;
    }

    const handleToggleMenu = () => setClosedMenu(!closedMenu);

    const handleAddItemCart = ({ plu, price, factor = 1, description, imageUrl }) => {
        let newObj = {
            plu,
            description,
            imageUrl,
            price,
            quantity: 0,
            total: 0,
        }
        if (cart[plu]) {
            newObj.quantity = cart[plu].quantity || 0;
        }
        newObj.quantity += factor;
        newObj.total = newObj.quantity * price;
        setCart(cart => ({ ...cart, [plu]: newObj }))
    }

    const handleRemoveItemCart = ({ plu, factor = 1 }) => {
        if (cart[plu] !== undefined) {
            let newList = { ...cart };
            if (cart[plu].quantity <= 1)
                delete newList[plu];
            else {
                newList[plu].quantity -= factor;
                newList[plu].total = newList[plu].quantity * newList[plu].price

            }
            setCart(newList)
        }
    }

    const resetCart = () => setCart({});

    const store = {
        signed: Boolean(profile.uid),
        isAdmin: Boolean(profile.isAdmin),
        profile,
        handleUpdateProfile,
        handleSignin,
        handleSignout,
        handleToggleMenu,
        cart,
        handleAddItemCart,
        handleRemoveItemCart,
        resetCart,
        closedMenu,
        reloadProfile: () => setDoReloadProfile(true)
    }

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (!user && store.signed) {
                setProfile({ items: {} });
                setFbUser();
            }
            else if (user && !store.signed) {
                setFbUser(user);
                handleSigninSuccess(user);
            }
        })
    }, [store.signed])

    useEffect(() => {
        if (doReloadProfile && fbUser) {
            setDoReloadProfile(false);
            handleSigninSuccess(fbUser)
        }
    }, [doReloadProfile, fbUser])

    return (
        <AppContext.Provider value={store}>
            {props.children}
        </AppContext.Provider>
    )

}
