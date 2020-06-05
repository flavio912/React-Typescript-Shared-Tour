import React, { useState, useEffect, FormEvent } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';
import validator from 'validator';
import RequestHelper from '../../utils/Request.Utils';

type Props = {
  isShow: boolean,
  hideModal: Function,
  userType: string,
}

const RegisterModal = ({isShow, hideModal, userType}: Props) => {
  const [formData, setFormData] = useState({
    userName: {value: '', validate: true, errorMsg: ''},
    country: {value: '', validate: true, errorMsg: ''},
    email: {value: '', validate: true, errorMsg: ''},
    phone: {value: '', validate: true, errorMsg: ''},
    password: {value: '', validate: true, errorMsg: ''},
    imgUrl: {value: '', validate: true, errorMsg: ''}
  });

  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  const checkUserNameValidate = () => {
    setFormData({
      ...formData,
      userName: {
        value: formData.userName.value,
        validate: formData.userName.value.length !== 0,
        errorMsg:
          formData.userName.value.length === 0 ? 'Username required!' : '',
      },
    });
    return formData.userName.value.length !== 0;
  }

  const checkCountryValidate = () => {
    setFormData({
      ...formData,
      country: {
        value: formData.country.value,
        validate: formData.country.value.length !== 0,
        errorMsg:
          formData.country.value.length === 0 ? 'Country required!' : '',
      },
    });
    return formData.country.value.length !== 0;
  }

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

  const checkPhoneValidate = () => {
    setFormData({
      ...formData,
      phone: {
        value: formData.phone.value,
        validate: formData.phone.value.length !== 0,
        errorMsg:
          formData.phone.value.length === 0 ? 'Mobile Phone required!' : '',
      },
    });
    return formData.phone.value.length !== 0;
  }

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
      checkUserNameValidate() && 
      checkCountryValidate() && 
      checkEmailValidate() && 
      checkPhoneValidate() &&
      checkPasswordValidate()
    ) {
      RequestHelper
        .post('/users/register', {
          name: formData.userName.value,
          email: formData.email.value,
          password: formData.password.value,
          phone: formData.phone.value,
          country: formData.country.value,
          role: userType
        })
        .then((res) => {
          hideModal();
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  return (
    <Modal
      show={isShow}
      onHide={hideModal}
      centered
      className="register-modal"
    >
      <Modal.Header className="flex-column">
        <h1>Welcome to your Virtual Guide</h1>
        <h2>A shared virtual experience</h2>
      </Modal.Header>
      <Modal.Body>
        <h1>Register as a <span className="user-type">{userType}</span></h1>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="registerForm.userName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Aaron Smith" 
              value={formData.userName.value} 
              onChange={(e) => {
                setFormData({
                  ...formData,
                  userName: {
                    value: e.target.value,
                    validate: true,
                    errorMsg: '',
                  }
                })
              }}
              isInvalid={!formData.userName.validate}
            />
            <Form.Control.Feedback type="invalid">
              {formData.userName.errorMsg}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="registerForm.country">
            <Form.Label>Country</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="United Kingdom" 
              value={formData.country.value}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  country: {
                    value: e.target.value,
                    validate: true,
                    errorMsg: '',
                  }
                })
              }}
              isInvalid={!formData.country.validate}
            />
            <Form.Control.Feedback type="invalid">
              {formData.country.errorMsg}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="registerForm.email">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Aaron.Smith@email.com" 
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
            <Form.Control.Feedback type="invalid">
              {formData.email.errorMsg}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="registerForm.phone">
            <Form.Label>Mobile Phone</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="+44 (0)7985 630956" 
              value={formData.phone.value}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  phone: {
                    value: e.target.value,
                    validate: true,
                    errorMsg: '',
                  }
                })
              }}
              isInvalid={!formData.phone.validate}
            />
            <Form.Control.Feedback type="invalid">
              {formData.phone.errorMsg}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="registerForm.password">
            <Form.Label>Password</Form.Label>
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
            <Form.Control.Feedback type="invalid">
              {formData.password.errorMsg}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <div className="custom-file">
              <input type="file" className="custom-file-input" />
              <label className="custom-file-label">Upload image</label>
            </div>
          </Form.Group>
          <Button type="submit">
            Register
          </Button>
          <div className="signin-btn d-flex justify-content-center align-items-center">
            <a onClick={() => hideModal()}>Sign In</a>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default RegisterModal;