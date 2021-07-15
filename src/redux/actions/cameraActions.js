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

export function togglePreviewMenu() {
  return {
    type: actionTypes.TOGGLE_PREVIEW_MENU,
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

export function setDownloadSettings(settings) {
  return {
    type: actionTypes.SET_DOWNLOAD_SETTINGS,
    data: settings,
  };
}
