import React from 'react'

const ReceiptModal = props  => {
    const {transactionHash, transactionIndex, blockHash, blockNumber, gasUsed, status} = props.receipt;

    
    return (
        <div className="receipt-dimmer" >
            <div className="receipt-container">
                <div className="receipt-contents">
                    <h2>Transaction Receipt</h2>
                    <label>Transaction Hash : </label>
                    <div className="transactionHash" value={transactionHash}>{transactionHash || 'no data'}</div>
                    <label>Transaction Index : </label>
                    <div className="transactionIndex" value={transactionIndex}>{transactionIndex || 'no data'}</div>
                    <label>Block Hash : </label>
                    <div className="blockHash" value={blockHash}>{blockHash || 'no data'}</div>
                    <label>Block Num : </label>
                    <div className="blockNumber" value={blockNumber}>{blockNumber || 'no data'}</div>
                    <label>Gas Used : </label>
                    <div className="gasUsed" value={gasUsed}>{gasUsed || 'no data'}</div>
                    <label>Status : </label>
                    <div className="status" value={status}>{status?'정상 처리':'비정상 처리'}</div>        
                </div>
                <button className="receiptButton" onClick={props.handleReceiptModal}>확인</button>
            </div>    
        </div>
            
    );

}
export default ReceiptModal;