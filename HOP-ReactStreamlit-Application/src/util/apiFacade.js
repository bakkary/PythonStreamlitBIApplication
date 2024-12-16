const URL = 'http://localhost:8000'; // Update to your FastAPI server's base URL
const AUTHENTICATION_ROUTE = "/login";
const SIGNUP_ROUTE = "/signup";

function apiFacade() {
    const setToken = (token) => {
        localStorage.setItem('jwtToken', token);
    };

    const getToken = () => {
        return localStorage.getItem('jwtToken');
    };

    const logout = (callback) => {
        localStorage.removeItem('jwtToken');
        if (callback) callback(false);
    };

    const handleHttpErrors = async (res) => {
        if (!res.ok) {
            const errorDetails = await res.json().catch(() => ({ detail: "Unknown error" }));
            return Promise.reject({ status: res.status, fullError: errorDetails });
        }
        return res.json();
    };

    const login = async (username, password) => {
        const payload = new URLSearchParams({ username, password }); // FastAPI's login uses form-data
        const options = makeOptions("POST", payload, false, true); // Use form-data for payload
        
        try {
            const res = await fetch(URL + AUTHENTICATION_ROUTE, options);
            const json = await handleHttpErrors(res);
            const token = json.access_token;

            if (token) {
                setToken(token);
                return true; // Indicating successful login
            } else {
                throw new Error('Token not received');
            }
        } catch (error) {
            throw error;
        }
    };

    const signup = async (username, password, email) => {
        const payload = { username, password, email };
        const options = makeOptions("POST", payload);

        try {
            const res = await fetch(URL + SIGNUP_ROUTE, options);
            await handleHttpErrors(res); // No token expected from signup
            return true; // Indicating successful signup
        } catch (error) {
            throw error;
        }
    };

    const fetchData = (endpoint, method = "GET", payload = null) => {
        const options = makeOptions(method, payload, true); // True adds the token
        return fetch(URL + endpoint, options).then(handleHttpErrors);
    };

    const makeOptions = (method, payload, addToken = false, isFormData = false) => {
        const opts = {
            method: method,
            headers: {
                "Accept": "application/json"
            }
        };

        if (!isFormData) {
            opts.headers["Content-Type"] = "application/json";
        }

        if (addToken) {
            opts.headers["Authorization"] = `Bearer ${getToken()}`;
        }

        if (payload) {
            opts.body = isFormData ? payload : JSON.stringify(payload);
        }

        return opts;
    };

    const getUserRoles = () => {
        const token = getToken();
        if (token != null) {
            const payloadBase64 = token.split('.')[1];
            const decodedClaims = JSON.parse(window.atob(payloadBase64));
            return decodedClaims.roles || ""; // Ensure roles exist in token payload
        } else {
            return "";
        }
    };

    const hasUserAccess = (neededRole, loggedIn) => {
        const roles = getUserRoles().split(',');
        return loggedIn && roles.includes(neededRole);
    };

    return {
        makeOptions,
        setToken,
        getToken,
        logout,
        login,
        signup,
        getUserRoles,
        hasUserAccess,
        fetchData
    };
}

const facade = apiFacade();
export default facade;
