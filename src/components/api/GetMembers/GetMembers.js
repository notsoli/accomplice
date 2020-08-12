import React, { Component } from 'react';

class GetMembers extends Component {
  // construct component
  constructor() {
    super();
    this.state = {
      error: false,
      isLoaded: true,
      members: []
    }
  }

  // mount
  async componentDidMount() {
    // compose url
    let url = 'http://api.api.localhost:8080/getMembers?';
    if (this.props.id) {
      url += `id=${this.props.id}&`;
    }

    // fetch data from api
    const response = await (await fetch(url)).json();
    if (response.error) {
      this.state = {
        error: response.error
      }
    } else {
      // set state
      this.setState({
        isLoaded: true,
        members: response.members
      });
    }
  }

  // render DOM
  render() {
    const { error, isLoaded, members } = this.state;
    if (error) {
    return <p>error: {error.message}</p>;
    } else if (!isLoaded) {
      return <p>Loading...</p>
    }
    return (
      <div>
        {members.map((member, index) => (
          <div key={index} className="member">
            <img className="memberImage" src={`/images/members/${member.id}.png`} alt="" />
            <div className="memberName">{member.name}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default GetMembers;