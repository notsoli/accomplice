import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import './Projects.css';

import GetProjects from '../../api/GetProjects';
import GetMembers from '../../api/GetMembers';

class Projects extends Component {
  // construct component
  constructor(props) {
    super(props);

    this.state = {
      nameValue: "",
      memberValue: null,
      tags: []
    }

    this.addMemberListeners = this.addMemberListeners.bind(this);
    this.toggleMemberDropdown = this.toggleMemberDropdown.bind(this);
    this.handleMemberClick = this.handleMemberClick.bind(this);
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleTagRemove = this.handleTagRemove.bind(this);
    this.handleTagAdd = this.handleTagAdd.bind(this);
    this.handleTagClose = this.handleTagClose.bind(this);
    this.handleTagUpdate = this.handleTagUpdate.bind(this);
  }

  // mount
  componentDidMount() {
    this.newTag = document.querySelector('#newTag');
    this.newTagInput = document.querySelector('#newTagInput');

    this.memberInput = document.querySelector('#memberInput');
    this.selectedMember = document.querySelector('#selectedMember');
    this.memberDropdown = document.querySelector('#memberDropdown');

    document.addEventListener('keypress', (event) => {
      if (event.keyCode === 13 && document.activeElement === this.newTagInput) {
        event.preventDefault();
        this.handleTagUpdate();
      }
    })
  }

  // add listeners to members
  addMemberListeners(info) {
    const dropdownMembers = this.memberDropdown.querySelectorAll('.member')
    for (const dropdownMember of dropdownMembers) {
      dropdownMember.addEventListener('click', this.handleMemberClick)
    }

    this.members = info;
  }

  // toggle member dropdown
  toggleMemberDropdown() {
    if (this.memberInput.classList.contains("activeInput")) {
      this.memberInput.classList.remove("activeInput");
    } else {
      this.memberInput.classList.add("activeInput");
    }
  }

  // handle member click
  handleMemberClick(event) {
    // get correct target element
    let target = event.target;
    while (target.className !== "member") {
      target = target.parentNode;
    }

    // replace selected member
    const newTarget = target.cloneNode(true)
    this.selectedMember.parentNode.replaceChild(newTarget, this.selectedMember);
    this.selectedMember = newTarget;

    // set member state
    const value = newTarget.querySelector('.memberName').innerHTML
    let memberid;
    if (value === "no member") {
      memberid = null;
    } else {
      for (const member of this.members) {
        if (member.name === value) {
          memberid = member.id;
        }
      }
    }
    this.setState({
      memberValue: memberid
    });

    // close dropdown
    this.memberInput.classList.remove("activeInput");
  }

  // determine when to do search
  handleNameInputChange(event) {
    // set value
    const value = event.target.value;

    // create search buffer
    event.persist();
    setTimeout(() => {
      const newValue = event.target.value;
      if (value === newValue) {
        this.setState({
          nameValue: newValue
        });
      }
    }, 500);
  }

  // handle tag remove
  handleTagRemove(event) {
    // get value of tag to close
    let target = event.target;
    if (!target.previousSibling) {
      target = target.parentElement;
    }
    const tagValue = target.previousSibling.innerHTML;

    // remove value from tag array
    let tags = [...this.state.tags];
    tags = tags.filter(e => e !== tagValue);
    this.setState({
      tags: tags
    });
  }

  // handle tag add
  handleTagAdd() {
    this.newTag.style.display = 'flex';
    this.newTagInput.focus();
  }

  // handle tag close
  handleTagClose() {
    this.newTag.style.display = 'none';
    this.newTagInput.innerHTML = '';
  }

  // handle tag update
  handleTagUpdate(event) {
    // store input of span
    const input = this.newTagInput.innerHTML;

    // check if input is empty
    if (input === '') return;

    // store current tags
    let tags = [...this.state.tags];

    // check if tag is unique
    for (const tag of tags) {
      if (tag === input) {
        this.handleTagClose();
        return;
      }
    }

    // push new tag
    tags.push(input);
    this.setState({
      tags: tags
    });

    // close input
    this.handleTagClose();
  }

  // render DOM
  render() {
    return (
      <div id="projects">
        <div id="projectsSearch">
          <input 
            id="nameInput"
            type="text"
            placeholder="project name"
            onChange={this.handleNameInputChange}
          />
          <div id="memberInput">
            <div id="memberSelect">
              <div id="selectedMember" className="member">
                <div className="memberImage"></div>
                <div className="memberName memberText">no member</div>
              </div>
              <FontAwesomeIcon
                id="memberSelectIcon"
                icon={faChevronDown}
                onClick={this.toggleMemberDropdown}
              />
            </div>
            <div id="memberDropdown">
              <div className="member">
                <div className="memberImage"></div>
                <div className="memberName memberText">no member</div>
              </div>
              <GetMembers
                displayStyle="preview"
                doneRendering={this.addMemberListeners}/>
            </div>
          </div>
          <div id="tagInput">
            <p>Tags:</p>
            <div id="tagList">
              {this.state.tags.map((tag, index) => (
                <div key={index} className="tag">
                  <div className="tagName">{tag}</div>
                  <FontAwesomeIcon
                    className="tagRemove"
                    icon={faTimes}
                    onClick={this.handleTagRemove}
                  />
                </div>
              ))}
              <div id="newTag" className="tag">
                <span
                  id="newTagInput"
                  contentEditable="true"
                  onBlur={this.handleTagUpdate}
                ></span>
                <FontAwesomeIcon
                  className="tagRemove"
                  icon={faTimes}
                  onClick={this.handleTagClose}
                />
              </div>
            </div>
            <FontAwesomeIcon
              className="tagAdd"
              icon={faPlus}
              onClick={this.handleTagAdd}
            />
          </div>
        </div>
        <div id="projectsResults">
          <GetProjects options={{
            name: this.state.nameValue,
            member: this.state.memberValue,
            tags: this.state.tags
            }} />
        </div>
      </div>
    );
  }
}

export default Projects;