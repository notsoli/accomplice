import React, { Component } from 'react';

class Parallax extends Component {
  // construct component
  constructor() {
    super();

    this.state = {
      offset: 0
    };

    // create references
    this.parallaxRef = React.createRef();
  }

  // mount
  componentDidMount() {
    // add resize listener
    window.addEventListener('resize', this.parallaxResize);

    // add scroll listener
    window.addEventListener('scroll', this.parallaxShift);

    // trigger parallax resize
    this.parallaxResize();
  }

  // unmount
  componentWillUnmount() {
    // remove resize listener
    window.removeEventListener('resize', this.parallaxResize);

    // remove scroll listener
    window.removeEventListener('scroll', this.parallaxShift);
  }

  // handle screen resize
  parallaxResize = () => {
    // identify parent element
    const parentElement = document.getElementById(this.props.parentElement);
    this.parentHeight = parentElement.offsetHeight;
    this.parentPosition = parentElement.offsetTop;

    // identify child element
    this.childHeight = this.parallaxRef.current.offsetHeight / 2;

    // trigger parallax shift
    this.parallaxShift();
  }

  // handle page scroll
  parallaxShift = () => {
    const position = (window.pageYOffset - this.parentPosition) / this.parentHeight
    const offsetPercent = position * this.props.strength + 50
    this.setState({
      offset: `calc(${offsetPercent}% - ${this.childHeight}px)`
    });
  }

  // render DOM
  render() {
    return (
      <div ref={this.parallaxRef} style={{
      position: "absolute",
      top: this.state.offset
      }}>
        {this.props.children}
      </div>
    );
  }
}

export default Parallax;