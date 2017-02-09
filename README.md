# Add Bank Entry
A prototype I created for adding bank accounts as a payment method. An API call is made to routingnumbers.info to retrieve bank data and display it in the faux check.

![Bank Account Entry Demo](https://joshualondon.github.io/add-bank-form/demo/demo-bank-account-entry.gif)

## Demo
https://joshualondon.github.io/add-bank-form/

The demo is base-case scenario and doesn't include error checking or handling.

### Test Routing Numbers
- 122242597
- 075000019

**Note**: There's an intentional 2s delay on the ajax request returning the bank info.

## What's missing

- Validation for:
	- Special characters in number inputs
	- Max length
	- Account number length (7-16 chars)

- Error handling for:
	- Incorrect routing number