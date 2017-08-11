import React, { Component } from 'react';
import './style_reset.css'
import Main from './components/Main';
import Details from './components/Details';
import { Route, Switch,} from 'react-router-dom'


class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        return this.props.children
    }
}

class App extends Component {

    render() {
        return (
            <Switch>
                <Route exact path='/' component={Main}/>
                <ScrollToTop>
                    <Route path="/details/:movieId"  component={Details} ignoreScrollBehavior/>
                </ScrollToTop>
            </Switch>
        )

    }
}

export default App;
