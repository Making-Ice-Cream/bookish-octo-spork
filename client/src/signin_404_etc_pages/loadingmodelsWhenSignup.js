import * as faceapi from 'face-api.js';

export async function loadModels() {
  const MODEL_URL = process.env.PUBLIC_URL + '/models';

  try {
    // setLoadingMessage('Loading Face Detector');
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);

    // setLoadingMessage('Loading 68 Facial Landmark Detector');
    await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);

    await faceapi.nets.faceLandmark68Net.loadFromUri('/models')

    // setLoadingMessage('Loading Feature Extractor');
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
  } catch (err) {
    // setLoadingMessageError(
    //   'Model loading failed. Please contact me about the bug:attendlytical@gmail.com'
    // );
  }
}

export function isFaceDetectionModelLoaded() {
    return !!faceapi.nets.ssdMobilenetv1.params;
  }
  
export function isFeatureExtractionModelLoaded() {
    return !!faceapi.nets.faceRecognitionNet.params;
  }
  
export function isFacialLandmarkDetectionModelLoaded() {
    return !!faceapi.nets.faceLandmark68TinyNet.params;
  }