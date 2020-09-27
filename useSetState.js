const useSetState = (initialState) => {
  const state = initialState;

  const setPartialState = (newState) => {
    Object.assign(state, newState);
  };

  return [state, setPartialState];
};

export default useSetState;