import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Block from './';

/**
 * Block Testing
 * Please Complete these tests
 */

/**
 * Hash is set on load
 * We need to check that when component is rendered, 
 * onHash is called and the hash change is reflected in the component
 */
it('Hash is set on load', () => {
  // Define mock functions
  const onHash = jest.fn

  // Render block
  render(<Block  block={1} hash={'0'.repeat(64)} onHash={onHash}/>);

  // Check if onHash() is called
  expect(onHash).toBeCalled();

  // Render new block
  const { getByText } = render(<BlockChain />);
  userEvent.click(getByText('Add Block'));

  // Check blocks hash 
  expect(getByText("d5f28bdae4731c38abc064bc702233257035309462dbeaa891f9e8f33df6d78e")).toBeInTheDocument();
});

/**
 * Shows not valid text
 * On render, the text 'Not Valid' should be in the document as the hash is not valid
 */
it("Shows not valid text", () => {
  // Render block
  const { getByText } = render(<BlockChain />);
  userEvent.click(getByText('Add Block'));
  expect(getByText("Not Valid")).toBeInTheDocument();
});

/**
 * Delete is called correctly
 * We need to make sure that when clicking on delete, the delete function is called
 */
it("Delete is called correctly", () => {
  // Define mock functions
  const onDelete = jest.fn
  const onHash = jest.fn

  // Render block
  const {getByText} = render(<Block  block={1} hash={'0'.repeat(64)} onDelete={onDelete} onHash={onHash}/>);

  // Click on delete
  userEvent.click(getByText('Delete'));

  // See if onDelete() called
  expect(onDelete).toBeCalled();
});

/**
 * Mining works correctly
 * We need to be able to click on mine and expect the block hash to now be valid
 * The text 'Valid' should also be in the document
 */
it("Mining works correctly", () => {
  // Render block
  const { getByText } = render(<BlockChain />);
  userEvent.click(getByText('Add Block'));

  // Mine it
  userEvent.click(getByText('Mine'));

  // Check if valid hash (This should always be the same with no data in the block)
  expect(getByText("000bb107bb6e6eed87f53ae39eecfcd496716fc2a7d26941c85307ec681f66e4")).toBeInTheDocument();
  
  // Check "Valid" indicator
  expect(getByText("Valid")).toBeInTheDocument(); //TODO: This is wrong!
});

/**
 * Changing data effects hash
 * The data textarea can be change, 
 * we need to make sure the changes effect the hash and that onHash is called
 */
it("Changing data effects hash", () => {
  // Define mock functions
  const onHash = jest.fn

  // Render block
  const block = render(<Block  block={1} hash={'0'.repeat(64)} onHash={onHash}/>);

  // Change its data
  const input = block.getByLabelText('Data')
  fireEvent.change(input, {target: {value: 'Test data'}})

  // Check if onHash() is called
  expect(onHash).toBeCalled();

  // Check block hash
  const { getByText } = render(<BlockChain />); // Is there a way to get this to work without going through BlockChain?
  userEvent.click(getByText('Add Block'));
  const secondInput = block.getByLabelText('Data')
  fireEvent.change(secondInput, {target: {value: 'ABC'}})

  // Hash of data "ABC" will always be the same
  expect(getByText("081111fb5897465c6d5f51ee4fc377b6db3e222acab586f255bb2240519eeebd")).toBeInTheDocument();
});

