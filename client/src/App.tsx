import Header from "./components/Header";
import AddBugForm from "./components/AddBugForm";
import './styles/main.css';
import { useState } from 'react';
import axios from 'axios';
import useUserContext from "./context/useUserContext";
import UserInfo from "./components/UserInfo";
import useBugContext from "./context/useBugContext";

// Set up axios defaults
axios.defaults.baseURL = "http://localhost:3000/api/"
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';


const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { userName, userId } = useUserContext();
  const { bugList } = useBugContext();
  return (


    <div className="app">
      <Header />
      <section >
        <div className="container app-content">
          <h1>Welcome to the Bug Tracker {userName === undefined ? "Guest" : userName}</h1>
          <div className="info">
            <p>Bugs currently being tracked:</p>
            <h2>{bugList.length === 0 ? "0" : bugList.length}</h2>
          </div>
          <button type="button" onClick={() => setIsFormOpen(!isFormOpen)}>
            Report New Bug
          </button>

        </div>

      </section>
      {isFormOpen && <AddBugForm />}
      {userId !== undefined ? <UserInfo /> :  <p>Please log in to see your information.</p>}
    </div>

  )
}

export default App;
