import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { closeCamera, loadEditor } from "../redux/actions/cameraActions";
import Loading from "./Loading";
import imageCompression from "browser-image-compression";

async function compressImage(file, callback) {
  const options = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: undefined,
    exifOrientation: 0,
  };
  try {
    const minFile = await imageCompression(file, options);
    return await imageCompression.getDataUrlFromFile(minFile);
  } catch (err) {
    console.log(
      `For some reason, we couldn't minify this file ${file.fileName}`
    );
    return file;
  }
}

export default function Camera(props) {
  const dispatch = useDispatch();
  const cameraOpen = useSelector((state) => state.camera.cameraOpen);
  const [readerWorking, setReaderWorking] = useState(false);
  const cameraRef = useRef();
  useEffect(() => {
    if (cameraOpen) {
      cameraRef.current.click();
      dispatch(closeCamera());
    }
  }, [cameraOpen, dispatch]);

  const handleChange = async (e) => {
    let files = e.currentTarget.files;
    if (files[0]) {
      setReaderWorking(true);
      const minFileSrc = await compressImage(files[0]);
      setReaderWorking(false);
      dispatch(loadEditor(minFileSrc));
    }
  };
  return (
    <>
      <Loading text="Loading & compressing Image..." hidden={!readerWorking} />
      <input
        onInput={handleChange}
        hidden
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="camera"
      />
    </>
  );
}
