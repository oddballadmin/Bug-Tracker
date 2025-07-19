import Header from "./components/Header";
import AddBugForm from "./components/AddBugForm";
import './styles/main.css';
import { useState } from 'react';
const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="app">
      <Header />
      <section >
        <div className="container app-content">
          <h1>Welcome to the Bug Tracker</h1>
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
    </div>
  )
}

export default App;
