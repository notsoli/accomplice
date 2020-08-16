import React from 'react';

import GetMembers from '../../api/GetMembers';

import './Members.css';

const Members = () => {
  return (
    <div id="members">
      <GetMembers displayStyle="complete"/>
    </div>
  );
};

export default Members;