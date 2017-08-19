import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './style/style_reset.css';
import Main from './components/Main';
import Details from './components/Details';
import ScrollToTop from './components/ScrollToTop';


const App = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <ScrollToTop>
      <Route path="/:movieId" component={Details} ignoreScrollBehavior />
    </ScrollToTop>
  </Switch>
);

export default App;
