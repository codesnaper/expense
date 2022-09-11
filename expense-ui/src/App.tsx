import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import Loader from './component/Loader';
import { UserContextProvider } from './provider/UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AlertContextProvider } from './provider/AlertProvider';
import CategoryComponent from './component/Category';
const Home = React.lazy(() => import('./component/Home/Home'));
const BankComponent = React.lazy(() => import('./component/Bank'));
const AccountComponent = React.lazy(() => import('./component/Accounts'));
function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <AlertContextProvider>
          <UserContextProvider>
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/bank" element={<BankComponent />} />
              <Route path="/account/:bankId" element={<AccountComponent></AccountComponent>}/>
              <Route path="/category" element={<CategoryComponent />} />
            </Routes>
          </UserContextProvider>
        </AlertContextProvider>
      </Suspense>
    </Router>
  );
}

export default App;
