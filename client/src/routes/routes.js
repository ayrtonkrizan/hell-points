import Login from "pages/auth/login";
import Home from "pages/home";
import AdmUsers from "pages/admin/users";
import Me from "pages/me";
import MatchDetail from "pages/matchDetail";

const routes = [
    { path: '/', componenet: Home, exact: true, isPrivate: false, isRestrict: false },
    { path: '/signin', componenet: Login, exact: true, isPrivate: false, isRestrict: false },
    
    { path: '/admin/users', componenet: AdmUsers, exact: true, isPrivate: true, isRestrict: true },
    
    { path: '/me', componenet: Me, exact: true, isPrivate: true, isRestrict: false },
    { path: '/match/:id', componenet: MatchDetail, exact: true, isPrivate: false, isRestrict: false },
]

export default routes;