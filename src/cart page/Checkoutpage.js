import React, { useState } from 'react'
import { Button, message, Steps, theme } from "antd";

const steps = [
  {
    title: "First",
    content: [
      <div>
        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="col s12">
                <label for="country">Country</label>
                <select
                  id="country"
                  class="browser-default"
                  required
                  title="Please select a country"
                >
                  <option value="" disabled selected>
                    Select a country
                  </option>
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                  <option value="mx">Mexico</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12 m12 l6">
                <input
                  id="first_name"
                  type="text"
                  required
                  class="validate"
                  pattern="^\S.{1,23}\S$"
                  title="Please enter a first Name between 3-25 characters"
                  length="25"
                />
                <label for="first_name">First Name</label>
              </div>
              <div class="input-field col s12 m12 l6">
                <input
                  id="last_name"
                  type="text"
                  required
                  class="validate"
                  pattern="^\S.{1,23}\S$"
                  title="Please enter a last Name between 3-25 characters"
                  length="25"
                />
                <label for="last_name">Last Name</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12 m12 l6">
                <input
                  id="address"
                  type="text"
                  required
                  class="validate"
                  pattern="^\S.+"
                  title="Please enter a valid address"
                />
                <label for="address">Address</label>
              </div>
              <div class="input-field col s12 m12 l6">
                <input
                  id="town"
                  type="text"
                  required
                  class="validate"
                  title="Please enter a valid City/Town"
                  pattern="^\S.+"
                />
                <label for="town">City/Town</label>
              </div>
            </div>
            <div class="row">
              <div class="col s12 m12 l6">
                <label for="state">State</label>
                <select
                  id="state"
                  class="browser-default"
                  required
                  title="Please select a state"
                >
                  <option value="" disabled selected>
                    Select a state
                  </option>
                  <option value="ar-us">Arizona</option>
                  <option value="ny-us">New York</option>
                  <option value="ca-us">California</option>
                </select>
              </div>
              <div class="input-field col s12 m12 l6">
                <input
                  id="zip-code"
                  type="text"
                  required
                  title="Please enter a valid post code
(e.g., 12345)"
                  pattern="^\d{5}(-\d{4})?$"
                  class="validate"
                />
                <label for="zip-code">Zip Code</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12 m12 l6">
                <i class="material-icons prefix">email</i>
                <input
                  id="email"
                  type="email"
                  required
                  class="validate"
                  title="Please enter a valid email"
                />
                <label for="email">Email</label>
              </div>
              <div class="input-field col s12 m12 l6">
                <i class="material-icons prefix">contact_phone</i>
                <input
                  id="phone-number"
                  type="tel"
                  required
                  title="Please enter a valid phone number (e.g., (123) 456-7890)"
                  pattern="^[0-9]?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$"
                  class="validate"
                />
                <label for="phone-number">Phone Number</label>
              </div>
            </div>
            <button class="waves-effect waves-light btn right" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>,
    ],
  },
  {
    title: "Second",
    content: "Second-content",
  },
  {
    title: "Last",
    content: "Last-content",
  },
];
export default function Checkoutpage() {


 const [current, setCurrent] = useState(0);

 const next = () => {
   setCurrent(current + 1);
 };

 const prev = () => {
   setCurrent(current - 1);
 };

 const items = steps.map((item) => ({ key: item.title, title: item.title }));


  return (
    <>
      <div className='flex justify-center items-center mt-10'> 
        <div className="w-[80%]">
                  <Steps current={current} items={items} />
                  




                  <div>{steps[current].content}</div>
                  



          <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <Button onClick={() => next()}>Next</Button>
            )}
            {current === steps.length - 1 && (
              <Button
                
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
