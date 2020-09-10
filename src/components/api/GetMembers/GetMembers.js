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
    let url = 'https://api.accomplice.us/getMembers?';
    if (this.props.memberid !== undefined) {
      url += `id=${this.props.memberid}&`;
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

      if (this.props.doneRendering) {
        this.props.doneRendering(response.members);
      }
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
            <img className="memberImage" src={
              this.props.displayStyle === "complete"
              ? `/images/members/full/${member.id}.jpg`
              : `/images/members/preview/${member.id}.jpg`
            } alt="user avatar" />
            <div className="memberInfo">
              <div className="memberName">{member.name}</div>
              {this.props.displayStyle === "complete" &&
                <div className="completeMember">
                  <div className="memberDescription">{member.description}</div>
                  <div className="memberAccounts">
                    {member.accounts.map((account, index) => (
                      <a key={index} href={account.link}>{account.platform}</a>
                    ))}
                  </div>
                </div>
              }
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default GetMembers;