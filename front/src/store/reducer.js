const initialState = {
  isAuthenticated: false,
  isAdmin: false
}

const reducer = (state = initialState,action) => {
  if(action.type === "LOG_IN_USER") {
    return {
      ...state,
      isAuthenticated : true
    }}
  if(action.type === "LOG_IN_ADMIN") {
    return {
      ...state,
      isAdmin : true
    }}
  return state
}

export default reducer
