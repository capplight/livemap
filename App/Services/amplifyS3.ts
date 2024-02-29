import RNFS from 'react-native-fs';
import ImgToBase64 from 'react-native-image-base64';

export const convertImageBase64 = async (imageUri: any) => {
  ImgToBase64.getBase64String(imageUri)
    .then(base64String => {
      b64toBlob(base64String);
    })
    .catch(err => {
      console.log('Error converting image to binary:', err);
    });
};

export const imageToBinary = async (imageUri: any) => {
  try {
    // Read the image file as base64 string
    const base64Image = await RNFS.readFile(imageUri, 'base64');

    // Convert base64 string to binary data
    const binaryData = Buffer.from(base64Image, 'base64');
    console.log('Image converted successfully');
    return binaryData;
  } catch (error) {
    console.error('Error converting image to binary:', error);
    return null;
  }
};

const b64toBlob = (b64Data, contentType = 'image/jpeg', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  console.log('Image converted successfully');
  return blob;
};
