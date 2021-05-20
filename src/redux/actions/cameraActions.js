import actionTypes from "../constants/actionTypes";

export function openCamera() {
  return {
    type: actionTypes.OPEN_CAMERA,
  };
}

export function closeCamera() {
  return {
    type: actionTypes.CLOSE_CAMERA,
  };
}

export function addNewPicture(data) {
  return {
    type: actionTypes.ADD_NEW_PICTURE,
    data,
  };
}

export function togglePreviewMenu() {
  return {
    type: actionTypes.TOGGLE_PREVIEW_MENU,
  };
}

export function removePhoto(index) {
  return {
    type: actionTypes.REMOVE_PHOTO,
    data: index,
  };
}

export function moveImages(rearrangeOrder) {
  return {
    type: actionTypes.MOVE_IMAGES,
    data: rearrangeOrder,
  };
}

export function setImagesUploaded() {
  return {
    type: actionTypes.IMAGES_UPLOADED,
  };
}

export function setPrevImages() {
  return {
    type: actionTypes.SET_PREV_IMAGES,
  };
}
