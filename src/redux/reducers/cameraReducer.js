import actionTypes from "../constants/actionTypes";

const initialState = {
  cameraOpen: false,
  previewMenuOpen: false,
  editorData: null,
  editIndex: null,
  alertMsg: undefined,
  downloadSettings: null,
  update: null,
};

export default function cameraReducers(state = initialState, action) {
  switch (action.type) {
    case actionTypes.OPEN_CAMERA:
      return { ...state, cameraOpen: true };
    case actionTypes.CLOSE_CAMERA:
      return { ...state, cameraOpen: false };
    case actionTypes.TOGGLE_PREVIEW_MENU:
      return {
        ...state,
        previewMenuOpen: !state.previewMenuOpen,
      };
    case actionTypes.LOAD_EDITOR:
      return {
        ...state,
        editorData: action.data,
      };
    case actionTypes.CLOSE_EDITOR:
      return {
        ...state,
        editorData: null,
      };
    case actionTypes.EDIT_PHOTO:
      return {
        ...state,
        editorData: action.data,
      };
    case actionTypes.ADD_EDIT_INDEX:
      return {
        ...state,
        editIndex: action.data,
      };
    case actionTypes.REMOVE_EDIT_INDEX:
      return {
        ...state,
        editIndex: null,
      };
    case actionTypes.SET_ALERT_MSG:
      return {
        ...state,
        alertMsg: action.data,
      };
    case actionTypes.SET_DOWNLOAD_SETTINGS:
      return {
        ...state,
        downloadSettings: action.data,
      };
    default:
      return state;
  }
}
