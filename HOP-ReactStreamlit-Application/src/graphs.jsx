import React, { useState, useEffect } from 'react';
import './css/App.css';
import './css/graphs.css';
import facade from './util/apiFacade';

function GraphsPage({ isAdmin, setIsAdmin }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataFromServer, setDataFromServer] = useState('Loading...');

  useEffect(() => {
    facade.fetchData('diary', 'GET').then((data) => setDataFromServer(data));
  }, [isLoggedIn]);

 
  return (
    <div className="userflex">


      <div className="user-flex-item flex-item2">

          <div className="diary">
            
            <div className="diary-items diary-item1">
              <form action="userpage.php" method="post">
                <input type="text" name="date" placeholder="Date" className="UP1UP3" />
              </form>
            </div>

            <div className="diary-items diary-item2">
              <form action="userpage.php" method="post">
                <input type="text" name="mood" placeholder="pick your mood" className="UP2" />
              </form>
            </div>

            <div className="diary-items diary-item3">
              <form action="userpage.php" method="post">
                <input type="text" name="topic" placeholder="todays topic" className="UP1UP3" />
              </form>
            </div>

            <div className="diary-items diary-item4">
              <form>
                <label htmlFor="multilineInput">write your diary here</label>
                <textarea
                  className="diary-box"
                  id="multilineInput"
                  name="multilineInput"
                  rows="40"
                  cols="50"
                ></textarea>
                <input type="submit" value="save page in diary" />
              </form>
            </div>
          </div>
        
      </div>
    </div>
  );
}

export default GraphsPage;
