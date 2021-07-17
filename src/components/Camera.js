import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { closeCamera } from "../redux/actions/cameraActions";
import Loading from "./Loading";
import imageCompression from "browser-image-compression";

export default function Camera(props) {
  const dispatch = useDispatch();
  const cameraOpen = useSelector((state) => state.camera.cameraOpen);
  const [readerWorking, setReaderWorking] = useState(false);
  const [progress, setProgress] = useState(0);
  const cameraRef = useRef();
  useEffect(() => {
    if (cameraOpen) {
      cameraRef.current.click();
      dispatch(closeCamera());
    }
  }, [cameraOpen, dispatch]);

  const handleChange = async (e) => {
    let files = e.currentTarget.files;
    const options = {
      maxSizeMB: 0.1,
      onProgress: function (progressPercent) {
        setProgress(progressPercent);
      },
      useWebWorker: true,
      maxIteration: 10,
      exifOrientation: 2,
    };
    if (files[0]) {
      setReaderWorking(true);
      const file = await imageCompression(files[0], options);
      const src = await imageCompression.getDataUrlFromFile(file);
      console.log(src);
      setReaderWorking(false);
      props.setEditorData({ src, editIndex: null, mimeType: files[0].type });
    }
  };

  return (
    <>
      <Loading
        text={`Loading & Compressing Image... ${progress}%`}
        hidden={!readerWorking}
      />
      <input
        onInput={handleChange}
        hidden
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture={true}
      />
    </>
  );
}
