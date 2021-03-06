import React, { useState, useEffect, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';
import validator from 'validator';
import RequestHelper from '../../utils/Request.Utils';
import { registerUserAction } from '../../store/user/actions';
import { registerUserDialogAction, loginUserDialogAction, thankyouDialogAction } from '../../store/dialog/actions';
import { DialogNames } from '../../store/dialog/types';

type Props = {
  role: string
}

const RegisterModal = ({ role }: Props) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userName: {value: '', validate: false, errorMsg: ''},
    country: {value: '', validate: false, errorMsg: ''},
    email: {value: '', validate: false, errorMsg: ''},
    phone: {value: '', validate: false, errorMsg: ''},
    password: {value: '', validate: false, errorMsg: ''},
    imgUrl: {value: '', validate: false, errorMsg: ''}
  });
  const [alert, setAlert] = useState({
    isShow: false,
    status: 'success',
    msg: ''
  });
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(new File([""], ""));
  const history = useHistory();

  const { dialog } = useSelector((state: any) => ({
    dialog: state.dialog
  }))

  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  useEffect(() => {
    setFormData({
      userName: {value: '', validate: true, errorMsg: ''},
      country: {value: '', validate: true, errorMsg: ''},
      email: {value: '', validate: true, errorMsg: ''},
      phone: {value: '', validate: true, errorMsg: ''},
      password: {value: '', validate: true, errorMsg: ''},
      imgUrl: {value: '', validate: true, errorMsg: ''}
    })
  }, [dialog.isOpened]);

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

  const isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  const checkPhoneValidate = (value) => {
    let phoneNum = value.replace(/\s/g, '');
    if(phoneNum[0] === '+')
      phoneNum = phoneNum.substr(1);
    
    if(value.length > 0 && isNumeric(phoneNum)) {
      setFormData({
        ...formData,
        phone: {
          value: value,
          validate: true,
          errorMsg: '',
        }
      });
      return true;
    }else {
      setFormData({
        ...formData,
        phone: {
          value: value,
          validate: false,
          errorMsg: value.length === 0 ? 'Mobile Phone required!' : 'Invalid format!',
        },
      });
      return false;
    }        
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
  
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      checkUserNameValidate() && 
      checkCountryValidate() && 
      checkEmailValidate() && 
      checkPhoneValidate(formData.phone.value) &&
      checkPasswordValidate()
    ) {
      setLoading(true);
      
      let avatar_url = '';
      if(avatar.name !== ''){
        const upload_res = await RequestHelper.upload(avatar);
        if(!upload_res.data.success){
          setAlert({
            isShow: true,
            status: 'danger',
            msg: upload_res.data.error
          });

          window.setTimeout(() => {
            setAlert({
              ...alert,
              isShow: true
            });
          }, 2000)
        }else {
          avatar_url = upload_res.data.url;
          setAlert({
            isShow: true,
            status: 'success',
            msg: "Avatar uploaded successfully!"
          });

          window.setTimeout(() => {
            setAlert({
              ...alert,
              isShow: false
            });
          }, 2000)
        }
      }

      RequestHelper
        .post('/users/register', {
          name: formData.userName.value,
          email: formData.email.value,
          password: formData.password.value,
          phone: formData.phone.value,
          country: formData.country.value,
          role: role,
          avatar: avatar_url
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
                ...alert,
                isShow: false,
              });
            }, 2000)
          }else {
            // call registerUserAction
            dispatch(registerUserAction(res.data.data));
            dispatch(registerUserDialogAction(false));
            dispatch(thankyouDialogAction(true));

            window.setTimeout(() => {
              dispatch(thankyouDialogAction(false));
              if(role === 'broker'){
                history.push('/dashboard');
              }
            }, 3000);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        })
    }
  }

  return (
    <Modal
      show={dialog.isOpened && dialog.name === DialogNames.REGISTER_USER_DIALOG}
      onHide={() => {dispatch(registerUserDialogAction(false))}}
      centered
      className="register-modal"
    >
      <Modal.Header className="flex-column">
        <h1>Welcome to your Virtual Guide</h1>
        <h2>A shared virtual experience</h2>
      </Modal.Header>
      <Modal.Body>
        {role === 'client' ?
          <h1>Register as a <span className="user-type">{role}</span></h1>
          :
          <h1>Register</h1>
        }
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="registerForm.userName">           
            <Form.Control 
              type="text" 
              value={formData.userName.value}
              placeholder="full name"
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
            <Form.Label>Full Name</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formData.userName.errorMsg}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="registerForm.country">
            <Form.Control 
              type="text" 
              value={formData.country.value}
              placeholder="country"
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
            <Form.Label>Country</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formData.country.errorMsg}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="registerForm.email">
            <Form.Control 
              type="email" 
              value={formData.email.value}
              placeholder="email"
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
          <Form.Group controlId="registerForm.phone">
            <Form.Control 
              type="text" 
              value={formData.phone.value}
              placeholder="phone"
              onChange={(e) => {
                checkPhoneValidate(e.target.value);
              }}
              isInvalid={!formData.phone.validate}
            />
            <Form.Label>Mobile Phone</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formData.phone.errorMsg}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="registerForm.password">
            <Form.Control 
              type="password" 
              value={formData.password.value}
              placeholder="password"
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
          <Form.Group>
            <div className="custom-file">
              <input 
                id="user_avatar"
                type="file" 
                className="custom-file-input" 
                accept=".jpg, .jpeg, .png, .gif" 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setAvatar(e.target.files? e.target.files[0]: new File([""], ""))}} 
              />
              <label className="custom-file-label">{avatar.name !== ''? avatar.name :'Upload image'}</label>
            </div>
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
              Register
            </Button>
          }
          <div className="signin-btn d-flex justify-content-center align-items-center">
            <a onClick={() => {dispatch(loginUserDialogAction(true))}}>Sign In</a>
          </div>
        </Form>
      </Modal.Body>
      <Alert variant="danger" show={alert.isShow}>{alert.msg}</Alert>
      <Alert variant="success" show={alert.isShow && alert.status === 'success'}>{alert.msg}</Alert>
      <Alert variant="danger" show={alert.isShow && alert.status === 'danger'}>{alert.msg}</Alert>
    </Modal>
  )
}

export default RegisterModal;