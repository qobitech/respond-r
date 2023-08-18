import React from "react"
import "./index.scss"

interface IProps {}

const ResetPassword = (props: IProps) => {
  return (
    <>
      {/* <div className="login-page">
                <div className='login-main'>
                    <div className="main-card">
                        {
                            isVPLoad ?

                                <div style={{ textAlign:'center' }}>
                                    <img src={Loader} alt="loading...."/>
                                </div>

                                :
                                isSuccessful ? 
                                    <>
                                        <h2>Reset password?</h2>

                                        <div className="input-area">
                                            <p className="label">Enter password</p>
                                            <input type="password" name='password' onChange={handleOnChange} value={formDetails!?.password} />
                                            <ErrorTxt formError={ formError } value={'password'} />
                                        </div>

                                        <div className="input-area">
                                            <p className="label">Confirm password</p>
                                            <input type="password" name='confirmPassword' onChange={handleOnChange} value={formDetails!?.confirmPassword} />
                                            <ErrorTxt formError={ formError } value={'confirmPassword'} />
                                        </div>

                                        {BTN}

                                        <div className='back-to-login'>
                                            <a href={url.LOGIN}>Back to Login</a>
                                        </div>
                                    </>
                                    :
                                    <div className='expired-token'>
                                        <h2>Oh my  :(</h2>
                                        <p>The token has expired.</p>
                                        <button onClick={() => navigate(url.FORGOT_PASSWORD)}>
                                            Request new token
                                        </button>
                                    </div>
                        }
                    </div>
                </div>
            </div> */}
    </>
  )
}

export default ResetPassword
