import React, { useState } from 'react';

import Block from '../Block';

import styles from './styles.module.css';

/**
 * Block Chain Component
 * This component adds, delete and contains the hashes for the block chain
 * A single block is already done
 */
const BlockChain = () => {

  // Contains all hashes
  const [hashes, setHashes] = useState<((string|undefined)[])>([]); 

  // onAdd should create a new block
  const onAdd = () => {
    let newHashes = [...hashes]
    newHashes.push(undefined)
    setHashes(newHashes)
  }

  // onDelete should delete the last block
  const onDelete = () => {
    let newHashes = [...hashes]
    newHashes.pop()
    setHashes(newHashes)
  }

  // onHash should update the corresponding index in the state 'hashes'
  const onHash = (_block: number, hash: string) => {
    let newHashes = [...hashes]
    newHashes[_block] = hash
    setHashes(newHashes)
  }

  // Render by mapping each hash to a new `Block` component.
  return (
    <div className={styles.blockChain}>
      <h1>Block Chain Demo</h1>
      <div>Total Blocks: {hashes.length}</div>
      <div>
        {hashes.map((_block, index) => (
          <Block
            key={index}
            block={index}
            hash={hashes[index]}
            previousHash={hashes[index - 1]}
            onDelete={index == hashes.length - 1 ?  onDelete : undefined} // Only display delete button on last block
            onHash={onHash}
            />
          ))}
      </div>
      <button type="button" onClick={onAdd}>Add Block</button>
    </div> 
  );
}

export default BlockChain;