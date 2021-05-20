import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import FinishPage from "./components/FinishPage";
import Camera from "./components/Camera";
import PreviewMenu from "./components/PreviewMenu";
import { useSelector } from "react-redux";

export default function App(props) {
  const imagesUploaded = useSelector((state) => state.camera.imagesUploaded);
  const previewMenuOpen = useSelector(
    (state) => state.previewMenu.previewMenuOpen
  );
  const open = useSelector((state) => state.camera.cameraOpen);
  return (
    <>
      <NavBar />
      {previewMenuOpen && <PreviewMenu />}
      {imagesUploaded ? <FinishPage /> : <LandingPage />}
      {open && <Camera />}
    </>
  );
}
