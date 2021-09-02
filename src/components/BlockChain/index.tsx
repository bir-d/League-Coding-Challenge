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
  const [hashes, setHashes] = useState<(string[])>([]); 
  // Contains all blocks
  const [blocks, setBlocks] = useState<(JSX.Element[])>([]);

  /**
   * Complete this function
   * onAdd should create a new block
   */
  const onAdd = () => {
    // Pushes a new block onto `blocks`
    let newBlocks = [...blocks]
    newBlocks.push(<Block block={blocks.length} previousHash={hashes[hashes.length - 1]} hash={hashes[hashes.length]} onHash={onHash} onDelete={onDelete}/>)
    setBlocks(newBlocks)
  }

  /**
   * Complete this function
   * onDelete should delete the last block
   * Should only need to pass to the last block
   */
  const onDelete = (_block: number) => {
    let newBlocks = [...blocks]
    newBlocks.splice(_block, 1)
    setBlocks(newBlocks) 
  }

  /**
   * Complete this function
   * onHash should update the corresponding index in the state 'hashes'
   * E.g., block 1 should update its corresponding index in the state 'hashes'
   */
  const onHash = (_block: number, hash: string) => {
    let newHashes = [...hashes]
    // There's gotta be a better way to do this
    let newBlocks = [...blocks]

    newHashes[_block] = hash
    // Replaces the block with a new one, containing the updated hash
    newBlocks[_block] = <Block block={_block} previousHash={newHashes[_block - 1]} hash={newHashes[_block]} onHash={onHash} onDelete={onDelete}/>

    setHashes(newHashes)
    setBlocks(newBlocks)
  }


  /**
   * Fix the return statement
   * Currently we only show one block, this is incorrect.
   * We need to be able to show multiple blocks as a block chain should.
   * You'll most likely need to add more functions or states to fix the render. Figure out a way you can go about this.
   * Total Blocks is also incorrect.
   */
  return (
    <div className={styles.blockChain}>
      <h1>Block Chain Demo</h1>
      <div>Total Blocks: {blocks.length}</div>
      <div>{blocks}</div>
      <button type="button" onClick={onAdd}>Add Block</button>
    </div> 
  );
}

export default BlockChain;