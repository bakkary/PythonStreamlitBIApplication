const URL = 'http://localhost:8000'; // Update to your FastAPI server's base URL
const AUTHENTICATION_ROUTE = "/login";
const SIGNUP_ROUTE = "/signup";
const ITEMS_ROUTE = "/items"; // Example CRUD route for items

function apiFacade() {
    const handleHttpErrors = async (res) => {
        if (!res.ok) {
            const errorDetails = await res.json().catch(() => ({ detail: "Unknown error" }));
            return Promise.reject({ status: res.status, fullError: errorDetails });
        }
        return res.json();
    };

    const login = async (username, password) => {
        const payload = new URLSearchParams({ username, password }); // FastAPI login uses form-data
        const options = makeOptions("POST", payload, false, true); // Use form-data for payload
        
        try {
            const res = await fetch(URL + AUTHENTICATION_ROUTE, options);
            const json = await handleHttpErrors(res);
            return json; // Returning the response (e.g., access_token or message)
        } catch (error) {
            throw error;
        }
    };

    const signup = async (username, password, email) => {
        const payload = { username, password, email };
        const options = makeOptions("POST", payload);

        try {
            const res = await fetch(URL + SIGNUP_ROUTE, options);
            return await handleHttpErrors(res); // Returning the response
        } catch (error) {
            throw error;
        }
    };

    const fetchData = (endpoint, method = "GET", payload = null) => {
        const options = makeOptions(method, payload); // No token needed
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
        if (payload) {
            opts.body = isFormData ? payload : JSON.stringify(payload);
        }
        return opts;
    };

    return {
        makeOptions,
        login,
        signup,
        fetchData
    };
}

const facade = apiFacade();
export default facade;
