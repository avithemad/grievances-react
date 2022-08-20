import { BrowserMultiFormatReader } from "@zxing/library";
import React from "react";

function Qrscanner() {
  const reader = new BrowserMultiFormatReader();
  const [devices, setDevices] = React.useState([]);
  const [selectedDevice, setSelectedDevice] = React.useState(0);
  console.log("ZXing code reader initialized");
  const scanQr = (ev) => {
    reader.listVideoInputDevices().then((devices) => {
      setDevices(devices);
      if (devices) {
        reader.decodeFromVideoDevice(
          devices[selectedDevice].id,
          "video",
          (result, err) => {
            if (result) {
              console.log(result);
              reader.reset();
            }
          }
        );
      }
    });
  };
  const changeCamera = (ev) => {
    setSelectedDevice((selectedDevice + 1) % devices.length);
  };

  return (
    <div>
      <div>{JSON.stringify(devices)}</div>
      This is qrscanner section
      <video id="video"></video>
      <div>
        <button onClick={scanQr}>Scan QR</button>
        <button>Change camera</button>
      </div>
    </div>
  );
}

export default Qrscanner;
