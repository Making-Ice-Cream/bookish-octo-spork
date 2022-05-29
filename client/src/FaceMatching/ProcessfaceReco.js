import { Card, Form, Layout, message, Row, Select, Typography } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from '@mui/material/Button';
import { FaceThresholdDistanceContext } from "./faceThresholdDistance";
import {
  getFullFaceDescription,
  isFaceDetectionModelLoaded,
  isFacialLandmarkDetectionModelLoaded,
  isFeatureExtractionModelLoaded,
  loadModels,
} from "./faceUtils";
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import FormControl from '@mui/material/FormControl';
import { drawFaceRect } from "./drawFaceRect";
import ModelLoading from "./ModelLoading";
import ModelLoadStatus from "./ModelLoadStatus";
import InputLabel from '@mui/material/InputLabel';
import {MenuItem }  from '@mui/material';
// import Typography from '@mui/material/Typography';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
const { Content } = Layout;
const { Option } = Select;
let inputSize = 160;
let DEFAULT_WEBCAM_RESOLUTION = {
    label: '640x480',
    width: 670,
    height: 500,
  };

export default (props) => {
  
  const { participants, faceMatcher, facePhotos } = props;
  // console.log(faceMatcher + "at 28 line number")

  const { threshold } = useContext(FaceThresholdDistanceContext);

  const webcamRef = useRef();
  const canvasRef = useRef();

  const [isMatchFound , setisMatchFound ] = useState(false);
  const [userName, setuserName] = useState(false);

  const [selectedWebcam, setSelectedWebcam] = useState();

  const [inputDevices, setInputDevices] = useState([]);
  const [camWidth, setCamWidth] = useState(DEFAULT_WEBCAM_RESOLUTION.width);
  const [camHeight, setCamHeight] = useState(DEFAULT_WEBCAM_RESOLUTION.height);

  const [isAllModelLoaded, setIsAllModelLoaded] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [loadingMessageError, setLoadingMessageError] = useState("");
  const [fullDesc, setFullDesc] = useState(null);
  const [waitText, setWaitText] = useState("");

  const gotoSite = ()=>{
    let para = new URLSearchParams();
    para.append("KEY", uuidv4());
    para.append("name", userName);
    let url =  "https://video-meet-react-app.herokuapp.com/hello?" +    para.toString();
    // <Link to={{ pathname: "https://video-meet-react-app.herokuapp.com/hello" }} target="_blank" />
    window.location.replace(url);
  }



  useEffect(() => {
    async function loadingtheModel() {
      await loadModels(setLoadingMessage, setLoadingMessageError);
      setIsAllModelLoaded(true);
    }
    if (
      !!isFaceDetectionModelLoaded() &&
      !!isFacialLandmarkDetectionModelLoaded() &&
      !!isFeatureExtractionModelLoaded()
    ) {
      setIsAllModelLoaded(true);
      return;
    }
    loadingtheModel();
  }, [isAllModelLoaded]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(async (devices) => {
      let inputDevice = await devices.filter(
        (device) => device.kind === "videoinput"
      );
      setInputDevices({ ...inputDevices, inputDevice });
    });
  }, []);

  useEffect(() => {
    function capture() {
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        // Set canvas height and width
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        // 4. TODO - Make Detections
        // e.g. const obj = await net.detect(video);

        // Draw mesh
        getFullFaceDescription(webcamRef.current.getScreenshot(), inputSize)
          .then((data) => {
            console.log(data);
            setFullDesc(data);
            setWaitText("");
          })
          .catch((err) => {
            setWaitText(
              "Preparing face matcher and device setup, please wait..."
            );
          });
        const ctx = canvasRef.current.getContext("2d");

        drawFaceRect(fullDesc, faceMatcher, participants, ctx, setisMatchFound,setuserName);

        
      }
    }

    let interval = setInterval(() => {
      capture();
    }, 700);

    return () => clearInterval(interval);
  });

  const handleSelectWebcam = (value) => {
    setSelectedWebcam(value);
  };

  
  

  return (
    
      <Card>
        <Card style = {{marginLeft : 60}}>
          <Row>Face Descriptor Matcher: {facePhotos.length}</Row>
          <Row>Threshold Distance: 0.45</Row>
        </Card>

        {facePhotos.length === 0 && (
          <p className="alert">No have any face matcher.</p>
        )}
        <ModelLoadStatus errorMessage={loadingMessageError} />

        {!isAllModelLoaded ? (
          <ModelLoading loadingMessage={loadingMessage} />
        ) : loadingMessageError ? (
          <div className="error">{loadingMessageError}</div>
        ) : (
          <div></div>
        )}
         <Typography variant="h4"  style={{marginTop: "20px"}} component="div" align="center">
          Please, See In The Camera
         </Typography>
        {isAllModelLoaded && loadingMessageError.length == 0 && (
          <Card className="takeAttendance__card__webcam">
            <>
              <p>{waitText}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position:'relative'
                }}
              >
                
               
                <Webcam
                  style = {{marginTop : 75}}
                  muted={true}
                  ref={webcamRef}
                  audio={false}
                  width={camWidth}
                  height={camHeight}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    deviceId: selectedWebcam,
                  }}
                  mirrored
                />
                <canvas
                  ref={canvasRef}
                  style={{
                    position: "absolute",
                    textAlign: "center",
                    top:0,
                    marginTop : 75,
                    zindex: 999,
                    width: camWidth,
                    height: camHeight ,
                    // border:"2px solid red"
                  }}
                />
                </div>
            
              <Button disabled = {!isMatchFound} style = {{display:"block" , marginLeft: "320px",marginTop:"30px"}} variant="contained" color="success" align="center" onClick = {gotoSite}>
                 Mark Attendence & Join Class
                </Button>
            </>
          </Card>
        )}
      </Card>
    
  );
};