import { BrowserMultiFormatReader } from "@zxing/library";
import React from "react";

function Qrscanner() {
  const reader = new BrowserMultiFormatReader();
  const [qrResult, setQrResult] = React.useState("");
  const [displayVideo, setDisplayVideo] = React.useState(false);
  const scanQr = (ev) => {
    setDisplayVideo(true);
    reader.listVideoInputDevices().then((devices) => {
      if (devices) {
        reader.decodeFromVideoDevice(
          devices[0].id,
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
  const stopQr = (ev) => {
    setDisplayVideo(false);
    reader.reset();
  }

  return (
    <div className="w-9/12 mx-auto ">
      <h1 className="text-xl  font-semibold mt-4">Scan and upload file movement</h1>
      <ol className="ml-4 mt-4 text-sm">
        <li className="list-disc">Allow access to camera</li>
        <li className="list-disc">Click Scan to start the camera</li>
        <li className="list-disc">
          Once the camera detects the QR, it is validated and new form is
          presented
        </li>
        <li className="list-disc">Fill in the form and click Submit.</li>
      </ol>
      <div>
        <button
          className={`mr-2 my-4 ${!displayVideo ? 'bg-green-600' : 'bg-red-500'} px-2 py-1 rounded`}
          onClick={!displayVideo ? scanQr : stopQr}
        >
          {!displayVideo ? 'Scan QR' : 'Stop'}
        </button>
      </div>
      {displayVideo && <video id="video" height={300} width={200} ></video>}
      <div>{qrResult}</div>
    </div>
  );
}

export default Qrscanner;
