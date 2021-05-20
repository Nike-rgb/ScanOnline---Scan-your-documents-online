import actionTypes from "../constants/actionTypes";

const initialState = {
  cameraOpen: false,
  scannedImages: [],
  imagesUploaded: false,
  previewMenuOpen: false,
};

function moveImages({ src, dest }, arr) {
  let temp = [...arr];
  if (src === dest) return arr;
  [temp[dest], temp[src]] = [temp[src], temp[dest]];
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
        imagesUploaded: true,
      };
    }
    case actionTypes.SET_PREV_IMAGES:
      return {
        ...state,
        scannedImages: JSON.parse(localStorage.getItem("images")),
      };
    default:
      return state;
  }
}
