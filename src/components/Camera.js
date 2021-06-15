import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { closeCamera, loadEditor } from "../redux/actions/cameraActions";
import Loading from "./Loading";

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

  const handleChange = (e) => {
    let files = e.currentTarget.files;
    if (files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      setReaderWorking(true);
      reader.onload = () => {
        setReaderWorking(false);
        dispatch(loadEditor(reader.result));
      };
    }
    e.currentTarget.value = null;
  };
  return (
    <>
      <Loading text="Loading Image..." hidden={!readerWorking} />
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
