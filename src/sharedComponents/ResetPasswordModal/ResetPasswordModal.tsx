import React, { useState, useEffect, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import validator from 'validator';
import styled from 'styled-components';
import RequestHelper from '../../utils/Request.Utils';
import { resetPasswordDialogAction, loginUserDialogAction } from '../../store/dialog/actions';
import { DialogNames } from '../../store/dialog/types';

const ResetPasswordModal = () => {
  const dispatch = useDispatch();
  const { dialog } = useSelector((state: any) => ({
    dialog: state.dialog
  }))
  const [formData, setFormData] = useState({
    email: {value: '', validate: true, errorMsg: ''},
    code: {value: '', validate: true, errorMsg: ''},
    newPassword: {value: '', validate: true, errorMsg: ''},
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    isShow: false,
    status: 'success',
    msg: ''
  })

  useEffect(() => {
    setFormData({
      ...formData,
      code: {
        value: dialog.code, 
        validate: true,
        errorMsg: ''
      }
    })  
  },[dialog.code]) // eslint-disable-line 

  const checkEmailValidate = () => {
    if (formData.email.value.length === 0) {
      setFormData({
        ...formData,
        email: {
          value: formData.email.value,
          validate: false,
          errorMsg: 'Email is required!',
        },
      });
      return false;
    }
    if (validator.isEmail(formData.email.value)) {
      setFormData({
        ...formData,
        email: {
          value: formData.email.value,
          validate: true,
          errorMsg: '',
        },
      });
      return true;
    }
    setFormData({
      ...formData,
      email: {
        value: formData.email.value,
        validate: false,
        errorMsg: 'Not a valid email address!',
      },
    });
    return false;
  };

  const checkCodeValidate = () => {
    setFormData({
      ...formData,
      code: {
        value: formData.code.value,
        validate: formData.code.value.length !== 0,
        errorMsg:
          formData.code.value.length === 0 ? 'Code required!' : '',
      },
    });
    return formData.code.value.length !== 0;
  }

  const checkPasswordValidate = () => {
    setFormData({
      ...formData,
      newPassword: {
        value: formData.newPassword.value,
        validate: formData.newPassword.value.length !== 0,
        errorMsg:
          formData.newPassword.value.length === 0 ? 'New Password required!' : '',
      },
    });
    return formData.newPassword.value.length !== 0;
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      checkEmailValidate() && 
      checkCodeValidate() &&
      checkPasswordValidate()
    ) {
      setLoading(true);
      RequestHelper
        .post('/users/update-password', {
          email: formData.email.value,
          resetCode: formData.code.value,
          newPassword: formData.newPassword.value
        })
        .then((res) => {
          if(!res.data.success) {
            setAlert({
              isShow: true,
              status: 'danger',
              msg: res.data.error
            });

            window.setTimeout(() => {
              setAlert({
                isShow: false,
                status: 'danger',
                msg: res.data.error
              });
            }, 1000)
          }else {
            setAlert({
              isShow: true,
              status: 'success',
              msg: 'Password changed successfully!'
            });

            window.setTimeout(() => {
              setAlert({
                isShow: false,
                status: 'success',
                msg: ''
              });

              dispatch(loginUserDialogAction(true));
            }, 1000)
          }
          setLoading(false);
        })
        .catch((err) => {
          setAlert({
            isShow: true,
            status: 'danger',
            msg: err
          });

          window.setTimeout(() => {
            setAlert({
              isShow: false,
              status: 'danger',
              msg: err
            })
          }, 1000)
          setLoading(false);
        })
    }
  }

  return (
    <CustomModal
      show={dialog.isOpened && dialog.name === DialogNames.RESET_PASSWORD_DIALOG}
      onHide={() => {dispatch(resetPasswordDialogAction(false))}}
      centered
      className="reset-password-modal"
    >
      <Modal.Body className="py-5">
        <h1>Reset Password</h1>
        <Form onSubmit={onSubmit} className="d-flex flex-column justify-content-center">
          <Form.Group controlId="resetPasswordForm.email">
            <Form.Control 
              type="email" 
              placeholder="Email" 
              value={formData.email.value}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: {
                    value: e.target.value,
                    validate: true,
                    errorMsg: '',
                  }
                })
              }}
              isInvalid={!formData.email.validate}
            />
            <Form.Label>Email</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formData.email.errorMsg}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="resetPasswordForm.code">
            <Form.Control 
              type="text" 
              placeholder="Reset Code" 
              value={formData.code.value}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  code: {
                    value: e.target.value,
                    validate: true,
                    errorMsg: '',
                  }
                })
              }}
              isInvalid={!formData.code.validate}
            />
            <Form.Label>Code</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formData.code.errorMsg}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="resetPasswordForm.newPassword">
            <Form.Control 
              type="password" 
              placeholder="New Password" 
              value={formData.newPassword.value}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  newPassword: {
                    value: e.target.value,
                    validate: true,
                    errorMsg: '',
                  }
                })
              }}
              isInvalid={!formData.newPassword.validate}
            />
            <Form.Label>New Password</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formData.newPassword.errorMsg}
            </Form.Control.Feedback>
          </Form.Group>
          { loading?
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </Button> 
            : 
            <Button type="submit">
              Submit
            </Button>
          }
          <a className="signin-btn" onClick={() => {dispatch(loginUserDialogAction(true))}}>Sign In</a>
        </Form>
      </Modal.Body>
      <Alert variant="success" show={alert.isShow && alert.status === 'success'}>{alert.msg}</Alert>
      <Alert variant="danger" show={alert.isShow && alert.status === 'danger'}>{alert.msg}</Alert>
    </CustomModal>
  )
}

const CustomModal = styled(Modal)`
  .form-group {
    margin-bottom: 0.8rem;

    label {
      margin: 0;
      color: white;
      opacity: 0.8;
      font-size: 0.8rem;
    }

    input {
      background: transparent;
      border: none;
      outline: none !important;
      box-shadow: none;
      border-bottom: 1px solid white;
      border-radius: 0;
      padding: 0;
      color: white;
      height: 1.5rem;
    }
    
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: white;
      opacity: 1; /* Firefox */
    }
    
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: white;
    }
    
    ::-ms-input-placeholder { /* Microsoft Edge */
      color: white;
    }
  }

  Button {
    background: white;
    width: 100%;
    color: orange;
    margin-top: 1rem;
    border: 1rem;
    height: 40px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 0.9rem;
  }

  .signin-btn {
    height: 40px;
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 0.9rem;
    width: 100%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  @media (max-width: 991px){
    .form-group {
      margin-bottom: 0.5rem;
    }
  }
`

export default ResetPasswordModal;