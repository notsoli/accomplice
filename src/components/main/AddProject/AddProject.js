import React, { Component } from 'react';

import './AddProject.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

class AddProject extends Component {
  constructor() {
    super();

    this.state = {
      fileName: "No File Chosen",
      image: "/assets/default-project-image.png",
      name: "Name",
      description: "Description",
      link: "https://www.example.com",
      member: 0,
      tags: ["tag1", "tag2"],

    }

    // bind functions
    this.imageChange = this.imageChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.linkChange = this.linkChange.bind(this);
    this.tagChange = this.tagChange.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.addTag = this.addTag.bind(this);
  }

  // handle avatar changes
  imageChange(event) {
    if (event.target.files.length === 1) {
      const currentFile = event.target.files[0];
      this.setState({
       image: URL.createObjectURL(currentFile),
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

  // handle link changes
  linkChange(event) {
    const value = event.target.value;
    if (value !== "") {
      this.setState({
        link: value
      });
    } else {
      this.setState({
        link: "https://www.example.com"
      });
    }
  }

  // handle tag changes
  tagChange(event) {
    const targetId = event.target.parentNode.dataset.id;
    const tags = [...this.state.tags];
    tags[targetId] = event.target.value;
    this.setState({
      tags: tags
    })
  }

  // handle tag removal
  removeTag(event) {
    // remove target item from accounts
    const targetId = event.target.parentNode.dataset.id;
    const tags = [...this.state.tags];
    tags.splice(targetId, 1);
    this.setState({
      tags: tags
    });
  }

  // handle tag addition
  addTag() {
    const tags = [...this.state.tags];
    tags.push("");
    this.setState({
      tags: tags
    })
  }

  render() {
    return (
      <div id="addProject">
        <div id="projectForm">
          <h1>Add Project</h1>
          <form action="/projects" encType="multipart/form-data" method="post">
            <h2>Main Info</h2>
            <div><input type="password" name="passcode" placeholder="passcode" required></input></div>
            <p id="infoLabel">(if you don't know where to get this, ask sam)</p>
            <input id="imageInput" type="file" name="image" accept="image/*" onChange={this.imageChange} required></input>
            <div id="filePicker">
              <button type="button" onClick={() => {document.querySelector('#imageInput').click()}}>Choose Image</button>
              <p>{this.state.fileName}</p>
            </div>
            <div><input type="text" name="name" placeholder="name" onChange={this.nameChange} required></input></div>
            <div><textarea name="description" rows="5" placeholder="description" onChange={this.descriptionChange} required></textarea></div>
            <div><input type="text" name="link" placeholder="link" onChange={this.linkChange} required></input></div>
            <div id="tagForm">
              <h2>Tags</h2>
              <div id="tags">
                {this.state.tags.map((tag, index) => (
                  <div key={index} className="tag" data-id={index}>
                    <input className="tagInput" type="text" name="tags" value={tag} placeholder="tags" onChange={this.tagChange} required></input>
                    <button type="button" onClick={this.removeTag}>-</button>
                  </div>
                ))}
              </div>
              <p id="infoLabel">(tags should be all lowercase, check for existing tags before adding a unique one)</p>
              <button id="addTag" type="button" onClick={this.addTag}>+</button>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div id="projectPreview">
          <h2>Preview</h2>
          <div className="project">
            <div className="projectInfo">
              <div className="projectName">{this.state.name}</div>
              <div className="projectDescription">{this.state.description}</div>
              <a href={this.state.link}className="projectLink">
                <FontAwesomeIcon className="linkIcon" icon={faLink} />
                <div className="linkText">{this.state.link}</div>
              </a>
              <div className="member">
                <img className="memberImage" src="/assets/default-user-icon.png" alt="user avatar" />
                <div className="memberInfo">
                  <div className="memberName">Example Member</div>
                </div>
              </div>
              <div className="projectTags">{'tags: ' + this.state.tags.join(', ')}</div>
            </div>
            <div className="projectImage">
              <img src={this.state.image} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddProject;