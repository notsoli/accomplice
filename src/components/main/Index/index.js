import React from 'react';
import './Index.css';

import { Link } from "react-router-dom";

import Parallax from '../../ui/Parallax';
import ContinueArrow from '../../ui/ContinueArrow';


const Index = () => {
  return (
    <div id="index">
      <div id="intro" style={{position: "relative", overflow: "hidden"}}>
        <Parallax parentElement="intro" strength="50">
          <img
            id="logoTexture"
            src="images/main/index/texture.jpg"
            alt="logo texture"
          />
        </Parallax>
        <Parallax parentElement="intro" strength="40">
          <img
            id="logoBig"
            src="images/main/logos/logo-big.png"
            alt="big accomplice logo"
          />
        </Parallax>
        <Parallax parentElement="intro" strength="30">
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
        <ContinueArrow target="about" color="var(--text)" offset="30px"/>
      </div>
    </div>
  );
};

export default Index;