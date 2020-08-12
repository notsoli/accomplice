import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';

import './Projects.css';

import GetProjects from '../../api/GetProjects';

class Projects extends Component {
  // construct component
  constructor(props) {
    super(props);

    this.state = {
      nameValue: "",
      tags: []
    }

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

    document.addEventListener('keypress', (event) => {
      if (event.keyCode === 13 && document.activeElement === this.newTagInput) {
        event.preventDefault();
        this.handleTagUpdate();
      }
    })
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
          <div id="tagInput">
            <p>Tags:</p>
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
            tags: this.state.tags
            }} />
        </div>
      </div>
    );
  }
}

export default Projects;