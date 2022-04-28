const initialState = {
  fav: [],
};

export const actionTypes = {
  ADD_TO_FAV: "ADD_TO_FAV",
  DELETE_FROM_FAV: "DELETE_FROM_FAV",
  RESET_FAV: "RESET_FAV",
};

const FavReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_FAV:
      const isPre = state.fav.find((i) => i._id === action.payload.item._id);
      return {
        ...state,
        fav:
          isPre !== undefined
            ? [...state.fav]
            : [...state.fav, { ...action.payload.item }],
      };

    case actionTypes.DELETE_FROM_FAV:
      return {
        ...state,
        fav: state.fav.filter((i) => i._id !== action.payload.item._id),
      };

    case actionTypes.RESET_FAV:
      return {
        ...state,
        fav: [],
      };

    default:
      return state;
  }
};

export default FavReducer;