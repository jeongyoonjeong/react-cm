import React, {Component} from "react";
import CareerManagement from "../contracts/CareerManagement.json";
import getWeb3 from "./getWeb3";
import Main from "../root/MainPresenter";

import {Redirect} from "react-router";


class Authority extends Component {

    constructor(props) {
        super();
        this.state = {
            web3: null,
            accounts: null,
            contract: null,
        };
    }

    componentDidMount = async () => {
        try {
            const web3 = await getWeb3();
            
            const accounts =  await web3.eth.getAccounts();
            
            const networkId =  await web3.eth.net.getId();
            
            const deployedNetwork = CareerManagement.networks[networkId];
            
            const instance = new web3.eth.Contract(
                CareerManagement.abi,
                deployedNetwork && deployedNetwork.address,
            );

            this.setState({ web3 : web3, accounts : accounts, contract: instance });

        } catch (error) {
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    }

    //근로자 트랜잭션
    registerCareer = async code => await this.state.contract.methods.register(code).send({from: this.state.accounts[0]});


    //인증자 트랜잭션
    certifyContent = async code => {
        const { accounts, contract } = this.state;   
        try{
            const res = await contract.methods.certify(code).send({from:accounts[0]});
            return res;
        }catch (e) {
            alert("인증 권한이 없는 계정입니다");
            return e;
        }
    };

    //view 트랜잭션 호출
    verifyCareer =  async code =>  this.state.contract.methods.verify(code).call();

    render() {
        
        if(!this.state.web3 || !this.state.accounts[0])
             return <div className="loadingWeb3">Loading Web3, accounts, and contract...</div>;
        
        if(this.state.accounts[0] !== sessionStorage.getItem("address"))
            return (    alert("😅 MetaMask Address가 일치하지 않습니다."),
                        sessionStorage.clear(),
                        <Redirect to={'/login'} />
                    );

        return <Main 
                    web3={this.state}
                    verify={this.verifyCareer}
                    register={this.registerCareer}
                    certify={this.certifyContent}
                />
    }
}
export default Authority;

