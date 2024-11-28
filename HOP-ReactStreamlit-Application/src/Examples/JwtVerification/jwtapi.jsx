// apiFacade.js

const URL = 'http://localhost:7070/api/v1/';

function apiFacade() {
  const verifyToken = async () => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      // Token not found, user is not authenticated
      return false;
    }

    const options = makeOptions('GET', null, true);

    try {
      const res = await fetch(URL + 'auth/verify', options);

      if (!res.ok) {
        // Verification failed, user is not authenticated
        return false;
      }

      // Verification successful, user is authenticated
      return true;
    } catch (error) {
      // An error occurred, user is not authenticated
      return false;
    }
  };

  // Other functions...

  return {
    verifyToken,
    // Other exported functions...
  };
}

export default apiFacade;
