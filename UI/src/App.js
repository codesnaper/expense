import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './component/loader/loader';
import ErrorBoundary from './component/error/error';
import AlertPopup from './component/alert/alertPopup';
import Navbar from './component/header/navbar';
import Login from './component/user/login';
import SignUp from './component/user/signUp';
import ForgetPassword from './component/user/forgetPassword';
import { UserContext, UserContextProvider } from './providers/userContext';
const Bank = React.lazy(() => import('./component/bank/banks'));
const Account = React.lazy(() => import('./component/account/account'));
const Home = React.lazy(() => import('./component/dashboard/home'));
const AccountDetail = React.lazy(() => import('./component/accountDetail/accountDetail'));
const Limit = React.lazy(() => import('./component/limit/limit'));
const Expense = React.lazy(() => import('./component/expenses/expenses'));
const Category = React.lazy(() => import('./component/category/category'));
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextType = UserContext;

  render() {
    return (
      <>
        <AlertPopup></AlertPopup>
        <ErrorBoundary>
          <Router>
            <Suspense fallback={<Loader />}>
              <UserContextProvider>
                <Routes>
                  <Route path='/register' element={<><SignUp></SignUp></>}></Route>
                  <Route path='/forgetPass' element={<><ForgetPassword></ForgetPassword></>}></Route>
                  <Route path='/*' element={<><Home></Home></>}></Route>
                  <Route path="/bank" element={<Bank />} />
                  <Route path="/accDetail" element={<AccountDetail />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/limit" element={<Limit />} />
                  <Route path="/exp" element={<Expense />} />
                  <Route path="/category" element={<Category />} />
                </Routes>
              </UserContextProvider>
            </Suspense>
          </Router>
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
