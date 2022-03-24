import { v2 as cloudinary } from "cloudinary";
import { google } from "googleapis";
import { Readable } from "stream";
import config from "../config/index.js";

cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export const imageUpload = (file) => {
  return cloudinary.uploader.upload(file, {
    upload_preset: "deepchat",
  });
};

/**
 * @param binary Buffer
 * returns readableInstanceStream Readable
 */
const bufferToStream = (binary) => {
  const readableInstanceStream = new Readable({
    read() {
      this.push(binary);
      this.push(null);
    },
  });

  return readableInstanceStream;
};

const oauth2Client = new google.auth.OAuth2(
  config.DRIVE_CLIENT_ID,
  config.DRIVE_CLIENT_SECRET,
  config.DRIVE_REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: config.DRIVE_REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const getIdFromUrl = (url) => {
  return url.substring(43);
};

const getUrlFromId = (id) => {
  return `https://drive.google.com/uc?export=view&id=${id}`
};

export const uploadFile = async (file, folderId) => {
  try {
    const { data } = await drive.files.create({
      resource: {
        name: file.originalname,
        mimeType: file.mimetype,
        parents: [folderId],
      },
      media: {
        mimeType: file.mimetype,
        body: bufferToStream(file.buffer),
      },
    });

    const fileId = data.id;

    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    return { Location: getUrlFromId(fileId) };

    /* 
    webViewLink: View the file in browser
    webContentLink: Direct download link 
    */
    // const result = await drive.files.get({
    //   fileId,
    //   fields: 'webViewLink',
    // });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteFile = async (url) => {
  try {
    const fileId = getIdFromUrl(url);

    await drive.files.delete({
      fileId,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateFile = async (file, url, folderId) => {
  await deleteFile(url);
  return uploadFile(file, folderId);
};
