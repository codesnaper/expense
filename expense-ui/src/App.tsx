import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import Loader from './component/Loader';
import { UserContextProvider } from './provider/UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AlertContextProvider } from './provider/AlertProvider';
import CategoryComponent from './component/Category';
import LimitComponent from './component/Limit';
import NotificationComponent from './component/Notification';
const Home = React.lazy(() => import('./component/Home/Home'));
const BankComponent = React.lazy(() => import('./component/Bank'));
const AccountComponent = React.lazy(() => import('./component/Accounts/accounts'));
function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <AlertContextProvider>
          <UserContextProvider>
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/bank" element={<BankComponent />} />
              <Route path="/account" element={<AccountComponent></AccountComponent>}/>
              <Route path="/account/:bankId" element={<AccountComponent></AccountComponent>}/>
              <Route path="/category" element={<CategoryComponent />} />
              <Route path="/limit" element={<LimitComponent/>} />
              <Route path="/notification" element={<NotificationComponent/>} />
            </Routes>
          </UserContextProvider>
        </AlertContextProvider>
      </Suspense>
    </Router>
  );
}

export default App;
