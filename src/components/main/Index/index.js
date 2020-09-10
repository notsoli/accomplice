import React from 'react';
import './Index.css';

import { Link } from "react-router-dom";

import ContinueArrow from '../../ui/ContinueArrow';
import ParallaxImage from '../../ui/ParallaxImage';
import { Parallax } from 'react-scroll-parallax';


const Index = () => {
  return (
    <div id="index">
      <div id="intro" style={{position: "relative", overflow: "hidden"}}>
        <Parallax y={[-60, 60]}>
          <ParallaxImage
            id="logoTexture"
            src="assets/main/index/texture.jpg"
          />
        </Parallax>
        <Parallax y={[-40, 40]}>
          <ParallaxImage
            id="logoBig"
            src="assets/main/logos/logo-big.png"
          />
        </Parallax>
        <Parallax y={[-30, 30]}>
          <div id="logoText">
            <h1>Accomplice</h1>
            <p>creative collective</p>
          </div>
        </Parallax>
        <ContinueArrow target="about" color="var(--text)" offset="calc(100vh - 80px)"/>
      </div>
      <div id="about">
        <div id="patchWrapper">
          <div id="description" className="patch">
            <p>ACCOMPLICE is a conglomeration of the creative efforts by a <Link to="/members" className="patchLink">group of students</Link> at Dover-Sherborn High School.</p>
          </div>
          <div id="types" className="patch">
            <p>The <Link to="/projects" className="patchLink">projects</Link> created under ACCOMPLICE range from video production, to music, to web design.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;