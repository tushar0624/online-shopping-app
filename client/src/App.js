import React, { useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.action';

const queryClient = new QueryClient();

const App = () => {
 
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]) 
 
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={() => 
            currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage/>
            } 
          />
        </Switch>
      </div>
    </QueryClientProvider>
  );
};

export default App;
