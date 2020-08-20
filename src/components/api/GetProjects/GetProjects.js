import React, { Component } from 'react';

import GetMembers from '../GetMembers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';


class GetProjects extends Component {
  // construct component
  constructor() {
    super();
    this.state = {
      error: false,
      isLoaded: true,
      projects: []
    }
  }

  // mount
  async componentDidMount() {
    await this.requestProjects();
  }

  // update
  async componentDidUpdate(oldProps) {
    // redo request call with new parameters
    if (oldProps !== this.props) {
      this.setState({
        error: false,
        isLoaded: false
      })
      await this.requestProjects();
    }
  }

  // make request call
  async requestProjects() {
    const options = this.props.options;

    // compose url
    let url = 'http://api.accomplice.us/getProjects?';
    if (options.name !== "") {
      url += `name=${encodeURI(options.name)}&`;
    }
    if (options.member !== null) {
      url += `member=${options.member}`
    }
    if (options.tags.length !== 0) {
      url += `tags=${options.tags.join(',')}`
    }
    console.log(url);

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
        projects: response.projects
      });
    }
  }

  // render DOM
  render() {
    const { error, isLoaded, projects } = this.state;
    if (error) {
    return <p>error: {error.message}</p>;
    } else if (!isLoaded) {
      return <p>Loading...</p>
    }
    return (
      <div>
        {projects.map((project, index) => (
          <div key={index} className="project">
            <div className="projectInfo">
              <div className="projectName">{project.name}</div>
              <div className="projectDescription">{project.description}</div>
              <a href={project.link}className="projectLink">
                <FontAwesomeIcon className="linkIcon" icon={faLink} />
                <div className="linkText">{project.link}</div>
              </a>
              <GetMembers memberid={project.member} displayStyle="preview" />
              <div className="projectTags">{'tags: ' + project.tags.join(', ')}</div>
            </div>
            <div className="projectImage">
              <img src={`/images/projects/${project.id}.png`} alt="" />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default GetProjects;