import Header from "./components/Header";
import AddBugForm from "./components/AddBugForm";
import './styles/main.css';
import { useState } from 'react';
import axios from 'axios';
import {UserProvider} from './context/UserProvider';
import useUserContext from "./context/useUserContext";
axios.defaults.baseURL = "http://localhost:3000/api/"
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';


const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { userName } = useUserContext();
  return (
    <div className="app">
    <UserProvider>
      <Header />
      <section >
        <div className="container app-content">
          <h1>Welcome to the Bug Tracker {userName === undefined ? "Guest" : userName}</h1>
          <div className="info">
            <p>Bugs currently being tracked:</p>
            <h2>21</h2>
          </div>
          <button type="button" onClick={() => setIsFormOpen(!isFormOpen)}>
            Report New Bug
          </button>
        </div>
        
      </section>
      {isFormOpen && <AddBugForm />}
      </UserProvider>
    </div>
  )
}

export default App;
