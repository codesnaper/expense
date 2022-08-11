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
    this.state = {
      login: false,
      loggedUser: {},
    }
  }

  componentDidMount() {
    this.setState({ login: sessionStorage.getItem('user') !== null })
    if (sessionStorage.getItem('user')) {
      this.setState({ loggedUser: JSON.parse(sessionStorage.getItem('user')) });
    }
  }

  setLogin() {
    this.setState({ login: true })
    this.setState({ loggedUser: JSON.parse(sessionStorage.getItem('user')) });
  }

  userLoggedIn(_self) {
    _self.setLogin();
  }

  render() {
    return (
      <>
        <AlertPopup></AlertPopup>
        <ErrorBoundary>
          <Router>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path='/register' element={<><SignUp></SignUp></>}></Route>
                <Route path='/forgetPass' element={<><ForgetPassword></ForgetPassword></>}></Route>
                <Route path="/*" element={
                  <>
                    {!this.state.login ?
                      <>
                        <Login loggedInCallback={() => this.userLoggedIn(this)} />
                      </>
                      :
                      <>
                        <Navbar loggedUser={this.state.loggedUser}></Navbar>
                        <Home></Home>
                      </>
                    }

                  </>} />
                <Route path="/bank" element={
                  <>
                    {!this.state.login ?
                      <>
                        <Login loggedInCallback={() => this.userLoggedIn(this)} />
                      </>
                      :
                      <>
                        <Navbar loggedUser={this.state.loggedUser}></Navbar>
                        <Bank></Bank>
                      </>
                    }
                  </>} />
                <Route path="/accDetail" element={
                  <>
                    {!this.state.login ?
                      <>
                        <Login loggedInCallback={() => this.userLoggedIn(this)} />
                      </>
                      :
                      <>
                        <Navbar loggedUser={this.state.loggedUser}></Navbar>
                        <AccountDetail></AccountDetail>
                      </>
                    }
                  </>} />
                <Route path="/account" element={
                  <>
                    {!this.state.login ?
                      <>
                        <Login loggedInCallback={() => this.userLoggedIn(this)} />
                      </>
                      :
                      <>
                        <Navbar loggedUser={this.state.loggedUser}></Navbar>
                        <Account></Account>
                      </>
                    }
                  </>} />
                <Route path="/limit" element={
                  <>
                    {!this.state.login ?
                      <>
                        <Login loggedInCallback={() => this.userLoggedIn(this)} />
                      </>
                      :
                      <>
                        <Navbar loggedUser={this.state.loggedUser}></Navbar>
                        <Limit></Limit>
                      </>
                    }
                  </>} />
                  <Route path="/exp" element={
                  <>
                    {!this.state.login ?
                      <>
                        <Login loggedInCallback={() => this.userLoggedIn(this)} />
                      </>
                      :
                      <>
                        <Navbar loggedUser={this.state.loggedUser}></Navbar>
                        <Expense></Expense>
                      </>
                    }
                  </>} />
                  <Route path="/category" element={
                  <>
                    {!this.state.login ?
                      <>
                        <Login loggedInCallback={() => this.userLoggedIn(this)} />
                      </>
                      :
                      <>
                        <Navbar loggedUser={this.state.loggedUser}></Navbar>
                        <Category></Category>
                      </>
                    }
                  </>} />
              </Routes>
            </Suspense>
          </Router>
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
