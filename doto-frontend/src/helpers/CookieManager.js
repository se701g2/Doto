import Cookies from "js-cookie";

const CookieManager = {
    set: (key, value) => {
        Cookies.set(key, value);
    },
    get: key => {
        return Cookies.get(key);
    },
    clearAll: () => {
        Cookies.remove("jwt");
        Cookies.remove("email");
    },
};

export default CookieManager;
