import actionTypes from "../constants/actionTypes";

const initialState = {
  cameraOpen: false,
  scannedImages: [],
  imagesUploaded: false,
  previewMenuOpen: false,
  editorData: null,
  editIndex: null,
  alertMsg: undefined,
};

function moveImages({ src, dest }, arr) {
  let temp = [...arr];
  if (src === dest) return arr;
  [temp[dest], temp[src]] = [temp[src], temp[dest]];
  return temp;
}

function replaceWithEdited(index, src, arr) {
  let temp = [...arr];
  temp.splice(index, 1, src);
  return temp;
}

export default function cameraReducers(state = initialState, action) {
  switch (action.type) {
    case actionTypes.OPEN_CAMERA:
      return { ...state, cameraOpen: true };
    case actionTypes.CLOSE_CAMERA:
      return { ...state, cameraOpen: false };
    case actionTypes.ADD_NEW_PICTURE: {
      return {
        ...state,
        scannedImages: [...state.scannedImages, action.data],
        imagesUploaded: true,
      };
    }
    case actionTypes.ADD_EDITED_PICTURE: {
      return {
        ...state,
        scannedImages: replaceWithEdited(
          action.index,
          action.data,
          state.scannedImages
        ),
        imagesUploaded: true,
      };
    }
    case actionTypes.REMOVE_PHOTO:
      return {
        ...state,
        scannedImages: state.scannedImages.filter(
          (src, index) => index !== action.data
        ),
      };
    case actionTypes.TOGGLE_PREVIEW_MENU:
      return {
        ...state,
        previewMenuOpen: !state.previewMenuOpen,
      };
    case actionTypes.MOVE_IMAGES: {
      return {
        ...state,
        scannedImages: moveImages(action.data, state.scannedImages),
      };
    }
    case actionTypes.IMAGES_UPLOADED: {
      return {
        ...state,
        imagesUploaded: !state.imagesUploaded,
      };
    }
    case actionTypes.SET_PREV_IMAGES:
      return {
        ...state,
        scannedImages: action.data,
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
    default:
      return state;
  }
}
