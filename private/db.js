// configure mongoose
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/accomplice?authSource=admin";

// define models
const Member = require('./Member');
const Project = require('./Project');

// node utilities
const crypto = require('crypto');

// connect to database
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting to database: '));
db.once('open', () => {console.log('successfully connected to database')});

// get projects with parameters
async function getProjects(options) {
  const result = await Project.find(options);

  // create items array containing results
  const items = [];
  await result.forEach((item) => {
    items.push(item);
  });

  // return results
  return items;
}

// add new project
async function addProject(ctx) {
  const body = ctx.request.body;

  // verify passcode
  const targetMember = await Member.find({passcode: body.passcode});
  if (!targetMember) ctx.throw(502, "Invalid passcode");

  // fill project info
  const data = {};
  data.id = await Project.countDocuments();
  data.name = body.name;
  data.description = body.description;
  data.link = body.link;
  data.member = targetMember.id;
  data.tags = body.tags;

  // assemble and save project
  const newProject = new Project(data);
  await newProject.save();

  return data.id;
}

// get members with parameters
async function getMembers(options) {
  const result = await Member.find(options);

  // create items array containing results
  const items = [];
  await result.forEach((item) => {
    item.passcode = undefined;
    items.push(item);
  });

  // return results
  return items;
}

// add new member
async function addMember(ctx) {
  const body = ctx.request.body;

  // verify password
  if (body.password !== "password") return;

  // fill member info
  const data = {};
  data.id = await Member.countDocuments();
  data.name = body.name;
  data.description = body.description;
  data.accounts = [];

  // fill member socials
  if (body.platform && body.link) {
    for (let i = 0; i < body.platform.length; i++) {
      data.accounts[i] = {};
      data.accounts[i].platform = body.platform[i];
      data.accounts[i].link = body.link[i];
    }
  }

  // create member password
  data.passcode = crypto.randomBytes(8).toString('hex');

  // assemble and save member
  const newMember = new Member(data);
  await newMember.save();

  return data.id;
}

module.exports.getProjects = getProjects;
module.exports.addProject = addProject;
module.exports.getMembers = getMembers;
module.exports.addMember = addMember;