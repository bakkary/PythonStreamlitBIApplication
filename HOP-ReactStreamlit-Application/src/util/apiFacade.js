
const URL = 'http://localhost:7070/api/v1/'
const DIART_ROUTE = "diary"
const AUTHENTICATION_ROUTE = 'auth/login'
const SINGUP_ROUTE = 'auth/register'

function apiFacade()
{

    
    
    const setToken = (token) =>
    {
        localStorage.setItem('jwtToken', token)
    }

    const getToken = () =>
    {
        return localStorage.getItem('jwtToken')
    }

    const logout = (callback) =>
    {
        localStorage.removeItem('jwtToken')
        callback(false)
    }

    const handleHttpErrors = (res) =>
    {

        if (!res.ok)
        {
            return Promise.reject({ status: res.status, fullError: res.json() })
        }
        return res.json()
    }

    const login = async (username, password) => {
        const payload = { username, password };
        const options = makeOptions("POST", payload);
      
        try {
          const res = await fetch(URL + AUTHENTICATION_ROUTE, options);
          if (!res.ok) {
            throw new Error('Invalid username or password');
          }
          const json = await handleHttpErrors(res);
          const token = json.token;
      
          if (token) {
            setToken(token);
            return token;
          } else {
            throw new Error('Token not received');
          }
        } catch (error) {
          throw error;
        }
      };
      

    /*
      const login = async (username, password, callback) => {
        const payload = { username, password };
        const options = makeOptions("POST", payload);
      
        try {
          const res = await fetch(URL + AUTHENTICATION_ROUTE, options);
      
          if (!res.ok) {
            throw new Error('Invalid username or password');
          }
      
          const json = await handleHttpErrors(res);
          const token = json.token;
      
          if (token) {
            setToken(token);
            callback(null, token); // Invoke the callback with the token
          } else {
            throw new Error('Token not received');
          }
        } catch (error) {
          callback(error, null); // Invoke the callback with the error
        }
      };
*/
      const signup = async (username, password) => {
        const payload = { username, password };
        const options = makeOptions('POST', payload);
      
        try {
          const res = await fetch(URL + SINGUP_ROUTE, options);
          if (!res.ok) {
            throw new Error('Failed to sign up');
          }
          const json = await handleHttpErrors(res);
          const token = json.token;
      
          if (token) {
            setToken(token);
            return true; // Indicating successful signup
          } else {
            throw new Error('Token not received');
          }
        } catch (error) {
          throw error;
        }
      };
      
     const fetchData = (endpoint, method, payload) =>
    {
        const options = makeOptions(method, payload, true); //True add's the token
        return fetch(URL + endpoint, options).then(handleHttpErrors);
    }

    const makeOptions = (method, payload, addToken) =>
    {

        const opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        }

        if (addToken)
        {
            opts.headers["Authorization"] = `Bearer ${getToken()}`
        }

        if (payload)
        {
            opts.body = JSON.stringify(payload)
        }

        return opts;
    }

    const getUserRoles = () =>
    {
        const token = getToken()
        if (token != null)
        {
            const payloadBase64 = getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const roles = decodedClaims.roles
            return roles
        } else return ""
    }

    const hasUserAccess = (neededRole, loggedIn) =>
    {
        const roles = getUserRoles().split(',')
        return loggedIn && roles.includes(neededRole)
    }

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
    }

}

const facade = apiFacade();
export default facade;
