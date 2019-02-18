import { authConstants } from '../constants/auth.constants'

const initialState = {
  isAuthenticating: false,
  user: {},

  forgotPwdError: false,
  showForgotPwdConfirmModal: false,
  confirmForgotPwdError: false,
  forgotPwdErrorMessage: '',
  confirmForgotPwdErrorMessage: '',
}

export default auth = (state = initialState, action) => {
  switch (action.type) {  
      case authConstants.FORGOT_PASSWORD:
      return {
        ...state,
        isAuthenticating: true,
      }
      case authConstants.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isAuthenticating: false
      }
      case authConstants.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        forgotPwdError: true,
        forgotPwdErrorMessage: action.error.message
      }
      case authConstants.SHOW_FORGOT_PWD_CONFIRMATION_MODAL:
      return {
        ...state,
        isAuthenticating: false,
        showForgotPwdConfirmModal: true
      }
      case authConstants.CONFIRM_FORGOT_PASSWORD:
        return {
          ...state,
          isAuthenticating: true
        }
      case authConstants.CONFIRM_FORGOT_PASSWORD_SUCCESS:
        return {
          ...state,
          isAuthenticating: false,
          showForgotPwdConfirmModal: false
        }
      case authConstants.CONFIRM_FORGOT_PASSWORD_FAILURE:
        return {
          ...state,
          isAuthenticating: false,
          confirmForgotPwdError: true,
          confirmForgotPwdErrorMessage: action.error.message
        }        
      case authConstants.CLOSE_TO_RESEND_FORGOT_PASSWORD:
      return {
        ...state,
        isAuthenticating: false,
        showForgotPwdConfirmModal: false
      }
      case authConstants.CANCEL_CONFIRM_SIGNUP:
      return {
        ...state,
        isAuthenticating: false,
        showSignUpConfirmationModal: false
      }
    default:
      return state
  }
}
