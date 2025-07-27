import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.css'
import App from './App.tsx'
import { UserProvider } from './context/UserProvider';
import { CookiesProvider } from 'react-cookie'
import { BugProvider } from './context/BugProvider.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <UserProvider>
        <BugProvider>
          <App />
        </BugProvider>
      </UserProvider>
    </CookiesProvider>
  </StrictMode>
)
