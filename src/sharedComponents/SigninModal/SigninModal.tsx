import React, { useState, FormEvent } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import UserAvatarSvg from '../../assets/images/man-1.svg';
import validator from 'validator';
import RequestHelper from '../../utils/Request.Utils';
import { loginUserAction } from '../../store/user/actions';

type Props = {
  isShow: boolean,
  hideModal: Function,
  userType: string,
  loginUserAction: Function,
}

const SigninModal = ({isShow, hideModal, userType, loginUserAction}: Props) => {
  const [formData, setFormData] = useState({
    email: {value: '', validate: true, errorMsg: ''},
    password: {value: '', validate: true, errorMsg: ''},
  });
  const [returnError, setReturnError] = useState({
    isShow: false,
    msg: ''
  });
  const [loading, setLoading] = useState(false);

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
            setReturnError({
              isShow: true,
              msg: res.data.error
            });
          }else {
            loginUserAction(res.data.data);
            hideModal('signin_'+userType);
          }
          setLoading(false);
        })
        .catch((error) => {
          setReturnError({
            isShow: true,
            msg: error
          });
          setLoading(false);
        })
    }
  }

  return (
    <Modal
      show={isShow}
      onHide={hideModal}
      centered
      className="signin-modal"
    >
      <Modal.Header className="flex-column">
        <h1>Welcome to your Virtual Guide</h1>
        <h2>A shared virtual experience</h2>
      </Modal.Header>
      <Modal.Body>
        <h1>Sign In as a <span className="user-type">{userType}</span></h1>
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
          <a>Forgot password?</a>
          <div className="signin-btn d-flex justify-content-center align-items-center mt-3">
            <a onClick={() => hideModal('register')}>Register</a>
          </div>
        </Form>
      </Modal.Body>

      { returnError.isShow ?
        <Alert variant="danger" dismissible>{returnError.msg}</Alert> : null}
    </Modal>
  )
}

export default connect(null, {loginUserAction})(SigninModal);