import { combineReducers } from "redux";
import cameraReducer from "./cameraReducer";
import previewMenuReducer from "./previewMenuReducer";

export default combineReducers({
  camera: cameraReducer,
  previewMenu: previewMenuReducer,
});
