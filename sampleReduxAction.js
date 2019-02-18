function forgotPwd() {
  return {
    type: authConstants.FORGOT_PASSWORD
  }
}

function forgotPwdSuccess(user) {
  return {
    type: authConstants.FORGOT_PASSWORD_SUCCESS,
    user
  }
}

function forgotPwdFailure(err) {
  return {
    type: authConstants.FORGOT_PASSWORD_FAILURE,
    error: err
  }
}

export function showForgotPwdConfirmModal() {
  return {
    type: authConstants.SHOW_FORGOT_PWD_CONFIRMATION_MODAL
  }
}

export function sendCode(phone) {
  return (dispatch) => {
    dispatch(forgotPwd());
    Auth.forgotPassword(phone)
      .then(data => {
        console.log('data from sendCode : ) ', data);
        dispatch(forgotPwdSuccess(data));
        dispatch(showForgotPwdConfirmModal());
      })
      .catch(err => {
        console.log('error from sendCode : ', err)
        dispatch(forgotPwdFailure(err))
      });
  }
}

function confirmForgotPwd() {
  return {
    type: authConstants.CONFIRM_FORGOT_PASSWORD
  }
}

function confirmForgotPwdSuccess(user) {
  return {
    type: authConstants.CONFIRM_FORGOT_PASSWORD_SUCCESS,
    user
  }
}

function confirmForgotPwdFailure(err) {
  return {
    type: authConstants.CONFIRM_FORGOT_PASSWORD_FAILURE,
    error: err
  }
}

export function confirmForgotPwdSubmit(phone, code, password) {
  return (dispatch) => {
    dispatch(confirmForgotPwd())
    Auth.forgotPasswordSubmit(phone, code, password)
      .then(data => {
        console.log('data from confirmForgotPwdSubmit: ', data)
        dispatch(confirmForgotPwdSuccess())
        setTimeout(() => {
          Alert.alert('Successfully Changed Password!', 'Please Sign in to continue.')
        }, 0)
      })
      .catch(err => {
        console.log('error from confirmForgotPwdSubmit : ', err)
        dispatch(confirmForgotPwdFailure(err))
      });
  }
}

export function closeToResendForgotPwd() {
  return {
    type: authConstants.CLOSE_TO_RESEND_FORGOT_PASSWORD
  }
}
