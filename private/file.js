const fs = require('fs');
const path = require('path');
const jimp = require('jimp');

// determine source folder
const source = path.join(__dirname, '../data/images/');

async function uploadAvatar(ctx, id) {
  const file = ctx.request.files.avatar;

  // load image into jimp
  const image = await jimp.read(file.path);

  // create full image
  image.cover(250, 250);
  image.write(path.join(source, 'members', 'full',  id + '.jpg'));

  // create preview image
  image.cover(32, 32);
  image.write(path.join(source, 'members', 'preview',  id + '.jpg'));
}

async function uploadImage(ctx, id) {
  const file = ctx.request.files.image;

  // load image into jimp
  const image = await jimp.read(file.path);

  // create full image
  image.cover(1280, 720);
  image.write(path.join(source, 'projects', id + '.jpg'));
}

module.exports.uploadAvatar = uploadAvatar;
module.exports.uploadImage = uploadImage;