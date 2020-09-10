import React, { Component } from 'react';
import './AddMember.css';

class AddMember extends Component {
  // construct component
  constructor() {
    super();
    this.state = {
      avatar: "/assets/default-user-icon.png",
      fileName: "No File Chosen",
      name: "Member",
      description: "Description",
      accounts: [
        {platform: "Twitter", link: ""},
        {platform: "GitHub", link: ""},
      ]
    }

    // bind functions
    this.avatarChange = this.avatarChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.platformChange = this.platformChange.bind(this);
    this.linkChange = this.linkChange.bind(this);
    this.removeAccount = this.removeAccount.bind(this);
    this.addAccount = this.addAccount.bind(this);
  }

  // handle avatar changes
  avatarChange(event) {
    if (event.target.files.length === 1) {
      const currentFile = event.target.files[0];
      this.setState({
        avatar: URL.createObjectURL(currentFile),
        fileName: currentFile.name
      });
    }
  }

  // handle name changes
  nameChange(event) {
    const value = event.target.value;
    if (value !== "") {
      this.setState({
        name: value
      });
    } else {
      this.setState({
        name: "Member"
      });
    }
  }

  // handle description changes
  descriptionChange(event) {
    const value = event.target.value;
    if (value !== "") {
      this.setState({
        description: value
      });
    } else {
      this.setState({
        description: "Description"
      });
    }
  }

  // handle platform changes
  platformChange(event) {
    const targetId = event.target.parentNode.dataset.id;
    const accounts = [...this.state.accounts];
    accounts[targetId].platform = event.target.value;
    this.setState({
      accounts: accounts
    })
  }

  // handle link changes
  linkChange(event) {
    const targetId = event.target.parentNode.dataset.id;
    const accounts = [...this.state.accounts];
    accounts[targetId].link = event.target.value;
    this.setState({
      accounts: accounts
    })
  }

  // handle account removal
  removeAccount(event) {
    // remove target item from accounts
    const targetId = event.target.parentNode.dataset.id;
    const accounts = [...this.state.accounts];
    accounts.splice(targetId, 1);
    this.setState({
      accounts: accounts
    });
  }

  // handle account addition
  addAccount() {
    const accounts = [...this.state.accounts];
    accounts.push({platform: "", link: ""});
    this.setState({
      accounts: accounts
    })
  }

  // render DOM
  render() {
    return (
      <div id="addMember">
        <div id="memberForm">
          <h1>Add Member</h1>
          <form action="/members" encType="multipart/form-data" method="post">
            <h2>Main Info</h2>
            <div><input type="password" name="password" placeholder="password" required></input></div>
            <input id="avatarInput" type="file" name="avatar" accept="image/*" onChange={this.avatarChange} required></input>
            <div id="filePicker">
              <button type="button" onClick={() => {document.querySelector('#avatarInput').click()}}>Choose Avatar</button>
              <p>{this.state.fileName}</p>
            </div>
            <div><input type="text" name="name" placeholder="name" onChange={this.nameChange} required></input></div>
            <div><textarea name="description" rows="5" placeholder="description" onChange={this.descriptionChange} required></textarea></div>
            <div id="accountForm">
              <h2>Socials</h2>
              <div id="accounts">
                {this.state.accounts.map((account, index) => (
                  <div key={index} className="account" data-id={index}>
                    <input className="accountPlatform" type="text" name="platform" value={account.platform} placeholder="platform" onChange={this.platformChange} required></input>
                    <input className="accountLink" type="text" name="link" value={account.link} placeholder="URL" onChange={this.linkChange} required></input>
                    <button type="button" onClick={this.removeAccount}>-</button>
                  </div>
                ))}
              </div>
              <button id="addAccount" type="button" onClick={this.addAccount}>+</button>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div id="memberPreview">
          <h2>Preview</h2>
          <div className="member">
            <img className="memberImage" src={this.state.avatar} alt="" />
            <div className="memberInfo">
              <div className="memberName">{this.state.name}</div>
              <div className="memberDescription">{this.state.description}</div>
              <div className="memberAccounts">
                {this.state.accounts.map((account, index) => (
                  <a key={index} href={account.link}>{account.platform}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddMember;