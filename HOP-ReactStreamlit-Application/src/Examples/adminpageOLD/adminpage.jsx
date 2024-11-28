import './css/admin.css';

function AdminPage() {
    return (
     
       <div>
        <h1>Admin Page</h1>
        <p>Only for admins</p>
<div class ="flex">
        <div class="flexexamplep">
         <label htmlFor="username">Username:</label>
    <input type="text"  name="username" placeholder="Enter your username" />

    <label htmlFor="password">Password:</label>
    <input type="password"  name="password" placeholder="Enter your password" />

    <button type="submit">Login</button>
    </div>
        </div> 
        </div>
 
        
    );
    }

export default AdminPage;