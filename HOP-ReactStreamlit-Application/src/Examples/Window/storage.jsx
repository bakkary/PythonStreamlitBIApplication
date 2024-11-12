const LocalStorageComponent = () => {
    // Store data in local storage
    const saveToLocalStorage = () => {
      window.localStorage.setItem('key', 'value');
    };
  
    // Retrieve data from local storage
    const getFromLocalStorage = () => {
      const storedValue = window.localStorage.getItem('key');
      console.log('Value from local storage:', storedValue);
    };
  
    return (
      <div>
        <button onClick={saveToLocalStorage}>Save to Local Storage</button>
        <button onClick={getFromLocalStorage}>Get from Local Storage</button>
      </div>
    );
  };
  
  export default LocalStorageComponent;
  