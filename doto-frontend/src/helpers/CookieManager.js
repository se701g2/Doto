import Cookies from "js-cookie";

// Simple getter-setter method to get the key values of the current session
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
