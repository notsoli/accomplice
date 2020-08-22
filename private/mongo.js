const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://mongo:27017/accomplice";

const options = {
  useUnifiedTopology: true
}

// store database
let db

MongoClient.connect(url, options, (err, client) => {
  if (err) throw err;
  db = client.db('accomplice');
});

async function getProjects(options) {
  // connect to projects collection
  const projects = db.collection('projects');

  // query projects
  const result = await projects.find(options);

  // create items array containing results
  const items = [];
  await result.forEach((item) => {
    items.push(item);
  });

  // return results
  return items;
}

async function getMembers(options) {
  // connect to projects collection
  const members = db.collection('members');

  // query projects
  const result = await members.find(options);

  // create items array containing results
  const items = [];
  await result.forEach((item) => {
    items.push(item);
  });

  // return results
  return items;
}

module.exports.getProjects = getProjects;
module.exports.getMembers = getMembers;