const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: {}
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
  if(action.type === "LOG_OUT") {
    return {
      ...state,
      isAdmin : false,
      isAuthenticated : false
    }}
  if(action.type === "SEND_USER_INFO") {
    return {
      ...state,
      user : action.user
    }}
  return state
}

export default reducer
