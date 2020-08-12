import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

class ContinueArrow extends Component {
  // construct component
  constructor() {
    super();

    this.state = {
      hover: false
    }
  }

  // mount
  componentDidMount() {
    // find target element
    this.target = document.querySelector(`#${this.props.target}`)
  }

  // handle click event
  handleClick = () => {
    window.scroll({
      top: this.target.offsetTop,
      left: 0,
      behavior: 'smooth'
    })
  }

  // render DOM
  render() {
    return (
      <div>
        <FontAwesomeIcon 
          className="ContinueArrow"
          icon={faChevronDown} 
          onClick={this.handleClick}
          style={{
            width: "100%",
            fontSize: "50px",
            color: this.props.color,
            transition: "0.3s",
            marginTop: this.props.offset
          }}
        />
      </div>
    );
  }
}

export default ContinueArrow;