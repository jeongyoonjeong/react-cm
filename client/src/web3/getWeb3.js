import Web3 from "web3";

const getWeb3 = async function(){
      let result = '';
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);          
        try {
          //metamask 크롬 앱 깨우기
          await window.ethereum.enable();          
          result = web3;
        } catch (error) {
          result = error;
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        result = web3;
      }
      else {
        const provider = new Web3.providers.HttpProvider(
          process.env.REACT_APP_CHAIN_HOST
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        result = web3;
      }
    return result;
  }
  

export default getWeb3;
