import React from 'react'

const ReceiptModal = props  => {
    const {tHash, tIdx, bHash, bNum, from, to, gasUsed, cumulativeGasUsed, contractAddr, status, events } = 
    {
        "transactionHash": "0x299c2e4a9d245074f2d1dee53874666a564ee0829f0dc2219eeb1a90aac3c2dd",
        "transactionIndex": 0,
        "blockHash": "0xc7903a37b7d4e7ebced11cc89d2dcd97bc375ff4aee02118716e1d8943cc4eee",
        "blockNumber": 63,
        "from": "0x0e775a16f3dd9379e7bfc4f902293371e1c1df17",
        "to": "0xe3103546943074c0e09bed200dc90b99105245e5",
        "gasUsed": 25493,
        "cumulativeGasUsed": 25493,
        "contractAddress": null,
        "status": true,
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "events": {}
    };
    
    return (
        <div className="receipt">
            <div>Transaction Receipt</div>
            <label>Transaction Hash : </label>
            <div className="tHash" value={tHash}></div>
            <label>Transaction Index : </label>
            <div className="tIdx" value={tIdx}></div>
            <label>Block Hash : </label>
            <div className="bHash" value={bHash}></div>
            <label>Block Num : </label>
            <div className="bNum" value={bNum}></div>
            <label>Gas Used : </label>
            <div className="gasUsed" value={gasUsed}></div>
            <label>Status : </label>
            <div className="status" value={status}></div>        
        </div>
            
    );

}
export default ReceiptModal;