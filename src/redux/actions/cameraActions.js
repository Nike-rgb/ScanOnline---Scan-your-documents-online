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

export function addNewPicture(data, index) {
  return {
    type: actionTypes.ADD_NEW_PICTURE,
    data,
  };
}

export function addEditedPicture(data, index) {
  return {
    type: actionTypes.ADD_EDITED_PICTURE,
    data,
    index,
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

export function setPrevImages(images) {
  return {
    type: actionTypes.SET_PREV_IMAGES,
    data: images,
  };
}

export function loadEditor(data) {
  return {
    type: actionTypes.LOAD_EDITOR,
    data,
  };
}

export function closeEditor() {
  return {
    type: actionTypes.CLOSE_EDITOR,
  };
}

export function addEditIndex(index) {
  return {
    type: actionTypes.ADD_EDIT_INDEX,
    data: index,
  };
}

export function removeEditIndex() {
  return {
    type: actionTypes.REMOVE_EDIT_INDEX,
  };
}

export function setAlertMsg(msg) {
  return {
    type: actionTypes.SET_ALERT_MSG,
    data: msg,
  };
}
