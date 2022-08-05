import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './component/loader/loader';
import ErrorBoundary from './component/error/error';
import AlertPopup from './component/alert/alertPopup';
import Navbar from './component/header/navbar';
import Login from './component/user/login';
import SignUp from './component/user/signUp';

const Bank = React.lazy(() => import('./component/bank/banks'));
const Account = React.lazy(() => import('./component/account/account'));

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      login: false,
      loggedUser : {},
    }
  }

  componentDidMount(){
    this.setState({login: sessionStorage.getItem('user') !== null})
    if(sessionStorage.getItem('user')){
      this.setState({loggedUser: JSON.parse(sessionStorage.getItem('user'))});
    }
  }

  setLogin() {
    this.setState({login:true})
    this.setState({loggedUser: JSON.parse(sessionStorage.getItem('user'))});
  }

  userLoggedIn(_self){
    _self.setLogin();
  }

  render(){
    return (
      <>
        {this.state.login && <>
          <Navbar loggedUser={this.state.loggedUser}></Navbar>
          <ErrorBoundary>
            <Router>
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="/bank" element={<><AlertPopup></AlertPopup><Bank></Bank></>} />
                  <Route path="/account" element={<Account />} />
                </Routes>
              </Suspense>
            </Router>
          </ErrorBoundary>
        </>}
        {!this.state.login &&
          <>
            <ErrorBoundary>
              <Router>
                <Suspense fallback={<Loader />}>
                  <Routes>
                    <Route path="/*" element={<Login loggedInCallback={()=>this.userLoggedIn(this)}/>} />
                    <Route path="/register" element={<SignUp />} />
                  </Routes>
                </Suspense>
              </Router>
            </ErrorBoundary>
          </>
        }
      </>
    );
  }
}

export default App;
