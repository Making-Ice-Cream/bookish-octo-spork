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
    width: 640,
    height: 480,
  };

export default (props) => {
  
  const { participants, faceMatcher, facePhotos } = props;
  // console.log(faceMatcher + "at 28 line number")

  const { threshold } = useContext(FaceThresholdDistanceContext);

  const webcamRef = useRef();
  const canvasRef = useRef();

  const [selectedWebcam, setSelectedWebcam] = useState();

  const [inputDevices, setInputDevices] = useState([]);
  const [camWidth, setCamWidth] = useState(DEFAULT_WEBCAM_RESOLUTION.width);
  const [camHeight, setCamHeight] = useState(DEFAULT_WEBCAM_RESOLUTION.height);

  const [isAllModelLoaded, setIsAllModelLoaded] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [loadingMessageError, setLoadingMessageError] = useState("");
  const [fullDesc, setFullDesc] = useState(null);
  const [waitText, setWaitText] = useState("");



//   const [ createTrxCallback ] = useMutation(
//     CREATE_TRX_MUTATION,
//     {
//       update(_, { data }) {
//         if (data.createTrx != "") message.success(data.createTrx);
//       },
//       onError(err) {
//         // CheckError(err);
//         console.log(err);
//       },
//     }
//   );

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

        drawFaceRect(fullDesc, faceMatcher, participants, ctx);

        // if (!!fullDesc) {
        //   console.log("Now got full desc");
        //   fullDesc.map((desc) => {
        //     const bestMatch = faceMatcher.findBestMatch(desc.descriptor);
        //     console.log(bestMatch);
        //     // if (bestMatch._label != "unknown") {
        //     //   createTrxCallback({
        //     //     variables: {
        //     //       attendanceID: props.match.params.attendanceID,
        //     //       studentID: bestMatch._label,
        //     //     },
        //     //   });
        //     //   console.log("Saving in db now");
        //     // }
        //   });
        // }
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
        <FormControl fullWidth>
          {/* <Form.Item label="Webcam" style ={{margin: "50px"}}>
            <Select
              defaultValue="Select Webcam"
              style={{ width: 500 }}
              onChange={handleSelectWebcam}
            >
              {inputDevices?.inputDevice?.map((device) => (
                <Option key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </Option>
              ))}
            </Select>
          </Form.Item> */}


          {/* <InputLabel id="demo-simple-select-label">Webcam</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          // label="Age"
          // onChange={handleChange}
        >
          {inputDevices?.inputDevice?.map((device) => (
                
                <MenuItem key={device.deviceId} value={device.deviceId} > {device.label}</MenuItem>
              ))}
          
         
        </Select> */}
         
        </FormControl>

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
                }}
              >
                

                <Webcam
                  style = {{marginTop : 70}}
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
                    zindex: 8,
                    width: camWidth,
                    height: camHeight,
                  }}
                />
                
              </div>
              <Button style = {{display:"block" , marginLeft: "320px",marginTop:"30px", marginBottom :"150px"}} variant="contained" color="success" align="center" disabled>
                 Mark Attendence & Join Class
                </Button>
            </>
          </Card>
        )}
      </Card>
    
  );
};