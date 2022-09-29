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
import Profile from './component/User/Profile';
import Expenditure from './component/Expenditure';
import ExpenditureComponent from './component/Expenditure';
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
              <Route path="/em/*" element={<Home />} />
              <Route path="/em/bank" element={<BankComponent />} />
              <Route path="/em/account" element={<AccountComponent></AccountComponent>}/>
              <Route path="/em/account/:bankId" element={<AccountComponent></AccountComponent>}/>
              <Route path="/em/category" element={<CategoryComponent />} />
              <Route path="/em/limit" element={<LimitComponent/>} />
              <Route path="/em/notification" element={<NotificationComponent/>} />
              <Route path="/em/profile" element={<Profile/>} />
              <Route path="/em/expense" element={<ExpenditureComponent/>} />
            </Routes>
          </UserContextProvider>
        </AlertContextProvider>
      </Suspense>
    </Router>
  );
}

export default App;
