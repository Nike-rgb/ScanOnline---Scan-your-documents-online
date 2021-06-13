import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { closeCamera, loadEditor } from "../redux/actions/cameraActions";

export default function Camera(props) {
  const dispatch = useDispatch();
  const cameraOpen = useSelector((state) => state.camera.cameraOpen);
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
      reader.onload = () => {
        dispatch(loadEditor(reader.result));
      };
    }
  };
  return (
    <>
      <input
        onChange={handleChange}
        hidden
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="camera"
      />
    </>
  );
}
