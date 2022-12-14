// import { Card } from 'antd';
import Card from '@mui/material/Card';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import {
  isFaceDetectionModelLoaded,
  isFeatureExtractionModelLoaded,
  isFacialLandmarkDetectionModelLoaded,
} from './faceUtils';
export default ({ errorMessage }) => (
  <Card style={{ opacity: 0.8 , marginLeft : '20px' , padding : '20px' }} >
    <p>
      Face Detector:{' '}
      {isFaceDetectionModelLoaded() ? (
        <strong>Loaded</strong>
      ) :
        errorMessage && errorMessage.length > 0 ?
          (
            <span style={{ color: 'red', fontWeight: 'bold' }}>
              ERROR
            </span>
          ) :
          (
            <>
              <strong>Loading</strong> <LoadingOutlined />
            </>)}
    </p>
    <p>
      Facial Landmark Detector:{' '}
      {isFacialLandmarkDetectionModelLoaded() ? (
        <strong>Loaded</strong>
      ) :
        errorMessage && errorMessage.length > 0 ?
          (
            <span style={{ color: 'red', fontWeight: 'bold' }}>
              ERROR
            </span>
          ) : (
            <>
              <strong>Loading</strong> <LoadingOutlined />
            </>)}
    </p>
    <p>
      Feature Extractor:{' '}
      {isFeatureExtractionModelLoaded() ? (
        <strong>Loaded</strong>
      ) :
        errorMessage && errorMessage.length > 0 ?
          (
            <span style={{ color: 'red', fontWeight: 'bold' }}>
              ERROR
            </span>
          ) : (
            <>
              <strong>Loading</strong> <LoadingOutlined />
            </>)}
    </p>
  </Card>
);