import actionTypes from "../constants/actionTypes";

const initialState = {
  previewMenuOpen: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_PREVIEW_MENU:
      return {
        ...state,
        previewMenuOpen: !state.previewMenuOpen,
      };
    default:
      return state;
  }
}
