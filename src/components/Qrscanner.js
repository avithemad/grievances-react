import { BrowserMultiFormatReader } from "@zxing/library";
import React from "react";

function Qrscanner() {
  const reader = new BrowserMultiFormatReader();
  const [qrResult, setQrResult] = React.useState("");
  const [displayVideo, setDisplayVideo] = React.useState(false);
  const [documentDetails, setDocumentDetails] = React.useState({});
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
              try {
                const details = getDocumentDetails(result.text);
                setDocumentDetails({ ...details });
              } catch (error) {
                console.error(error);
                console.warn("QR scan does not contain file detail.");
              }
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

  const getDocumentDetails = (qrScanResult) => {
    return { documentNumber: qrScanResult.split('\n')[0], fileName: qrScanResult.split('\n')[1], amount: qrScanResult.split('\n')[2] };
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

      {!displayVideo &&
        <form action="">
          <div className="flex flex-col mb-4">
            <label htmlFor="">Document number</label>
            <input className="bg-yellow-100 dark:text-slate-900 text-sm p-2 rounded-sm "
              type="text" value={documentDetails.documentNumber} />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="">Document name</label>
            <input className="bg-yellow-100 dark:text-slate-900 text-sm p-2 rounded-sm "
              type="text" value={documentDetails.fileName} />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="">Amount</label>
            <input className="bg-yellow-100 dark:text-slate-900 text-sm p-2 rounded-sm "
              type="text" value={documentDetails.amount} />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="">Document type</label>
            <input className="dark:text-slate-900 text-sm p-2 rounded-sm "
              type="text" />
          </div>
          <span className="pr-4">You want to </span>
          <select className="mb-4 dark:text-slate-900 rounded px-2" name="" id="">
            <option value="recieve">Recieve</option>
            <option value="dispatch">Dispatch</option>
          </select>
          <div className="flex flex-col mb-4">
            <label htmlFor="">Full name</label>
            <input className="dark:text-slate-900 text-sm p-2 rounded-sm "
              type="text" />
          </div>
        </form>
      }
    </div>
  );
}

export default Qrscanner;
