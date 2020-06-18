import React, { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import UserAvatarSvg from '../../assets/images/man-1.svg';
import validator from 'validator';
import RequestHelper from '../../utils/Request.Utils';
import { loginUserAction } from '../../store/user/actions';
import { loginUserDialogAction, registerUserDialogAction, forgotPasswordDialogAction } from '../../store/dialog/actions';
import { DialogNames } from '../../store/dialog/types';

type Props = {
  role: string
}

const SigninModal = ({ role }: Props) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: {value: '', validate: true, errorMsg: ''},
    password: {value: '', validate: true, errorMsg: ''},
  });
  const [alert, setAlert] = useState({
    isShow: false,
    status: 'danger',
    msg: ''
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { dialog } = useSelector((state: any) => ({
    dialog: state.dialog
  }))

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

  const checkPasswordValidate = () => {
    setFormData({
      ...formData,
      password: {
        value: formData.password.value,
        validate: formData.password.value.length !== 0,
        errorMsg:
          formData.password.value.length === 0 ? 'Password required!' : '',
      },
    });
    return formData.password.value.length !== 0;
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (
      checkEmailValidate() && 
      checkPasswordValidate()
    ) {
      setLoading(true);
      RequestHelper
        .post('/users/login', {
          email: formData.email.value,
          password: formData.password.value        
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
            }, 2000)
          }else {
            if(res.data.data.user.role === role || role === 'all' ){
              dispatch(loginUserAction(res.data.data));
              dispatch(loginUserDialogAction(false));
              
              if(role === 'broker')
                history.push('/dashboard');
            }else {
              setAlert({
                isShow: true,
                status: 'danger',
                msg: "Permission Denied!"
              });
  
              window.setTimeout(() => {
                setAlert({
                  ...alert,
                  isShow: false,
                });
              }, 2000)
            }            
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);          
        })
    }
  }

  return (
    <Modal
      show={dialog.isOpened && dialog.name === DialogNames.LOGIN_USER_DIALOG}
      onHide={() => {dispatch(loginUserDialogAction(false))}}
      centered
      className="signin-modal"
    >
      <Modal.Header className="flex-column">
        <h1>Welcome to your Virtual Guide</h1>
        <h2>A shared virtual experience</h2>
      </Modal.Header>
      <Modal.Body>
        {role !== 'all'? 
          (<h1>Sign In as a <span className="user-type">{role}</span></h1>)
          :
          (<h1>Sign In</h1>)
        }
        <Form onSubmit={onSubmit} className="d-flex flex-column justify-content-center">
          <img src={UserAvatarSvg} />
          <Form.Group controlId="signinForm.email">
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
          <Form.Group controlId="signinForm.password">
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={formData.password.value}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: {
                    value: e.target.value,
                    validate: true,
                    errorMsg: '',
                  }
                })
              }}
              isInvalid={!formData.password.validate}
            />
            <Form.Label>Password</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formData.password.errorMsg}
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
              Sign In
            </Button>
          }
          <a onClick={() => {dispatch(forgotPasswordDialogAction(true))}}>Forgot password?</a>
          <div className="signin-btn d-flex justify-content-center align-items-center mt-3">
            <a onClick={() => {dispatch(registerUserDialogAction(true))}}>Register</a>
          </div>
        </Form>
      </Modal.Body>
      <Alert variant="danger" show={alert.isShow}>{alert.msg}</Alert>
    </Modal>
  )
}

export default SigninModal;