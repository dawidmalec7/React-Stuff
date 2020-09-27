import React, { useReducer, useContext, createContext } from "react";

const initialState = {
  text: "treść"
};

const actions = {
  changeText: (text) => {
    return {
      type: "CHANGE_TEXT",
      text: text
    };
  }
};

const ctx = createContext({
  state: initialState,
  actions: actions
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_TEXT":
      return { ...state, text: action.text };
    default:
      return state;
  }
}

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ctx.Provider value={[state, actions, dispatch]}>{children}</ctx.Provider>
  );
};

const useContextState = ({ stateNames = ["text"] }) => {
  const [state] = useContext(ctx);
  if (stateNames.length > 0) {
    return getObjValuesFromArrayOfKeys(state, stateNames);
  } else {
    return state;
  }
};

const useContextActions = ({ actionsNames = ["changeText"] }) => {
  if (actions.length > 0) {
    return getObjValuesFromArrayOfKeys(actions, actionsNames);
  } else {
    return actions;
  }
};

const getObjValuesFromArrayOfKeys = (arr, arrKeys) => {
  const objToReturn = {};
  arrKeys.forEach((key) => {
    if (actions[key]) {
      objToReturn[key] = arr[key];
    }
  });
  return objToReturn;
};

const useContextActionsAndStore = ({
  actionsNames = ["changeText"],
  stateNames = ["text"]
}) => {
  const state = useContextState(stateNames);
  const actions = useContextActions(actionsNames);

  return { state, actions };
};

export {
  ctx,
  Provider,
  useContextActionsAndStore,
  useContextActions,
  useContextState
};
