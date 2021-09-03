import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Block from './';
import BlockChain from '../BlockChain'

// Block Testing

/**
 * Hash is set on load
 * We need to check that when component is rendered, 
 * onHash is called and the hash change is reflected in the component
 */
it('Hash is set on load', () => {
  // Define mock functions
  const onHash = jest.fn()

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
  const onDelete = jest.fn()

  // Render block
  const {getByText} = render(<Block  block={1} hash={'0'.repeat(64)} onDelete={onDelete} onHash={() => {}}/>);

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
  
  // Check "Valid" indicator. Ignore the "Valid Block" header.
  expect(getByText("Valid", {ignore:"Valid Block"})).toBeInTheDocument;
});

/**
 * Changing data effects hash
 * The data textarea can be change, 
 * we need to make sure the changes effect the hash and that onHash is called
 */
it("Changing data effects hash", () => {
  // Define mock functions.
  const onHash = (_block: number, hash: string) => {return hash};
  const mockOnHash = jest.fn(onHash);

  // Render block
  const block = render(<Block  block={0} hash={'0'.repeat(64)} onHash={mockOnHash}/>);

  // Change its data -- this will be the second time onHash is called
  const input = block.getByLabelText('Data');
  fireEvent.change(input, {target: {value: 'Test data'}});

  // Check if onHash() has been called twice
  expect(mockOnHash).toBeCalledTimes(2);

  // Check hash: the hash of data "Test data" will always be the same
  expect(mockOnHash.mock.results[1].value).toBe("46edce07533d9fa80d23fd15a1e95f8315c95cc9579bb6ad564fe41c1c4e00c1");
  // Check if the hash has changed from block render after data field was modified.
  expect(mockOnHash.mock.results[1].value).not.toEqual(mockOnHash.mock.results[0].value)
});