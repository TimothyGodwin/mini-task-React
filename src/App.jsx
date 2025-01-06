import AppRouter from './routes/AppRouter';
import Header from './components/header/Header';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const ignorePathsHeader = [`/`, `/login`];
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(true);

  useEffect(() => {
    const checkPaths = ignorePathsHeader.includes(location.pathname);
    setCurrentPath(checkPaths);
  }, [location.pathname]);

  return (
    <div>
      {!currentPath && <Header />}
      <AppRouter />
    </div>
  )
}

export default App
