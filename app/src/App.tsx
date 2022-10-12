import './app.css';
import 'react-form-lego/dist/styles/bundle.css';
import { Box, BoxItem, BoxOrder } from 'react-form-lego';
import { useState } from 'react';

function App() {
  const [mode, setMode] = useState<'edit' | undefined>();

  const handleMode = () => {
    setMode((prev) => (prev === 'edit' ? undefined : 'edit'));
  };

  const onOrderChange = console.log;

  const accountOrder: BoxOrder[] = [2, 1, null];

  return (
    <>
      <div className='toggle'>
        <button onClick={handleMode}>Mode: {mode ?? 'default'}</button>
      </div>
      <div className='container'>
        <form>
          <div className='row'>
            <Box
              id='account'
              mode={mode}
              onOrderChange={onOrderChange}
              dataSource={{
                order: accountOrder,
              }}
            >
              <h4>Account</h4>
              <BoxItem>
                <div className='input-group input-group-icon'>
                  <input type='text' placeholder='Full Name' />
                  <div className='input-icon'>
                    <i className='fa fa-user'></i>
                  </div>
                </div>
              </BoxItem>
              <BoxItem>
                <div className='input-group input-group-icon'>
                  <input type='email' placeholder='Email Adress' />
                  <div className='input-icon'>
                    <i className='fa fa-envelope'></i>
                  </div>
                </div>
              </BoxItem>
              <BoxItem>
                <div className='input-group input-group-icon'>
                  <input type='password' placeholder='Password' />
                  <div className='input-icon'>
                    <i className='fa fa-key'></i>
                  </div>
                </div>
              </BoxItem>
            </Box>
          </div>
          <div className='row'>
            <Box id='box-birthdate' mode={mode} onOrderChange={onOrderChange}>
              <div className='col-half'>
                <h4>Date of Birth</h4>
                <div className='input-group'>
                  <div className='col-third'>
                    <BoxItem>
                      <input type='text' placeholder='DD' />
                    </BoxItem>
                  </div>
                  <div className='col-third'>
                    <BoxItem>
                      <input type='text' placeholder='MM' />
                    </BoxItem>
                  </div>
                  <div className='col-third'>
                    <BoxItem>
                      <input type='text' placeholder='YYYY' />
                    </BoxItem>
                  </div>
                </div>
              </div>
            </Box>
          </div>
          {/* <Box
            id='payment'
            mode={mode}
            onOrderChange={onOrderChange}
            className='row'
          >
            <h4>Payment Details</h4>
            <div className='input-group'>
              <BoxItem>
                <input
                  id='payment-method-card'
                  type='radio'
                  name='payment-method'
                  value='card'
                />
                <label htmlFor='payment-method-card'>
                  <span>
                    <i className='fa fa-cc-visa'></i>Credit Card
                  </span>
                </label>
              </BoxItem>
              <BoxItem>
                <input
                  id='payment-method-paypal'
                  type='radio'
                  name='payment-method'
                  value='paypal'
                />
                <label htmlFor='payment-method-paypal'>
                  <span>
                    <i className='fa fa-cc-paypal'></i>Paypal
                  </span>
                </label>
              </BoxItem>
            </div>
            <BoxItem className='input-group input-group-icon'>
              <input type='text' placeholder='Card Number' />
              <div className='input-icon'>
                <i className='fa fa-credit-card'></i>
              </div>
            </BoxItem>
            <div className='col-half'>
              <BoxItem className='input-group input-group-icon'>
                <input type='text' placeholder='Card CVC' />
                <div className='input-icon'>
                  <i className='fa fa-user'></i>
                </div>
              </BoxItem>
            </div>
            <div className='col-half'>
              <BoxItem className='input-group'>
                <select>
                  <option>01 Jan</option>
                  <option>02 Jan</option>
                </select>
                <select>
                  <option>2015</option>
                  <option>2016</option>
                </select>
              </BoxItem>
            </div>
          </Box> */}
          <div className='row'>
            <h4>Terms and Conditions</h4>
            <div className='input-group'>
              <input id='terms' type='checkbox' />
              <label htmlFor='terms'>
                I accept the terms and conditions for signing up to this
                service, and hereby confirm I have read the privacy policy.
              </label>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
