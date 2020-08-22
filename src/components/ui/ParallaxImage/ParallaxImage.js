import React, { Component } from 'react';
import { withController } from 'react-scroll-parallax';

class ParallaxImage extends Component {
  handleLoad = () => {
    this.props.parallaxController.update();
  }
  
  render() {
    return <img src={this.props.src} id={this.props.id} alt="" onLoad={this.handleLoad} />;
  }
}

export default withController(ParallaxImage);