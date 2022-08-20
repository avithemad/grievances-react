import { BrowserMultiFormatReader } from "@zxing/library";
import React from "react";

function Qrscanner() {
  const reader = new BrowserMultiFormatReader();
  const [devices, setDevices] = React.useState([]);
  const [selectedDevice, setSelectedDevice] = React.useState(0);
  const [qrResult, setQrResult] = React.useState("");
  const [displayVideo, setDisplayVideo] = React.useState(false);
  const scanQr = (ev) => {
    setDisplayVideo(true);
    reader.listVideoInputDevices().then((devices) => {
      setDevices(devices);
      if (devices) {
        reader.decodeFromVideoDevice(
          devices[selectedDevice].id,
          "video",
          (result, err) => {
            if (result) {
              setQrResult(result.text);
              setDisplayVideo(false);
              reader.reset();
            }
          }
        );
      }
    });
  };
  const changeCamera = (ev) => {
    reader.reset();
    if (devices) {
      reader.decodeFromVideoDevice(
        devices[(selectedDevice + 1) % devices.length].id,
        "video",
        (result, err) => {
          if (result) {
            setQrResult(result.text);
            setDisplayVideo(false);
            reader.reset();
          }
        }
      );
    }
    setSelectedDevice((selectedDevice + 1) % devices.length);
  };

  return (
    <div className="w-9/12 mx-auto ">
      <h1 className="text-xl mt-4">Scan and upload file movement</h1>
      <ol className="ml-4 mt-4">
        <li className="list-disc">Allow access to camera</li>
        <li className="list-disc">Click Scan to start the camera</li>
        <li className="list-disc">
          Once the camera detects the QR, it is validated and new form is
          presented
        </li>
        <li className="list-disc">Fill in the form and click Submit.</li>
      </ol>
      <p className="mt-4">
        Note: Use the Change camera button to change camera in mobile devices.
      </p>
      <div>
        <button
          className="mr-2 my-4 bg-green-600 px-2 py-1 rounded"
          onClick={scanQr}
        >
          Scan QR
        </button>
        {devices.length > 0 && (
          <button
            className="mr-2 my-4 bg-green-600 px-2 py-1 rounded"
            onClick={changeCamera}
          >
            Change camera
          </button>
        )}
      </div>
      {displayVideo && <video id="video" height={300} width={200}></video>}
      <div>{qrResult}</div>
    </div>
  );
}

export default Qrscanner;
