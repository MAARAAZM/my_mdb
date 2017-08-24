import { Component } from 'react';

class ScrollToTopOnMountComponent extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return null;
  }
}

export default ScrollToTopOnMountComponent;
