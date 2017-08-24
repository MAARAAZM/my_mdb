import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './style_reset.css';
import Main from './../containers/Main/Main';
import Details from './../containers/Details/Details';
import { ScrollToTop } from './../presentational/CommonComponents';


const App = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <ScrollToTop>
      <Route path="/:movieId" component={Details} ignoreScrollBehavior />
    </ScrollToTop>
  </Switch>
);

export default App;
