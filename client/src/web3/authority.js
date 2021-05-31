import React, {Component} from "react";
import CareerManagement from "../contracts/CareerManagement.json";
import getWeb3 from "./getWeb3";
import EmpMain from "../emp/EmpMain";
import AuthMain from "../authenticator/AuthMain";
import {Redirect} from "react-router";


class Authority extends Component {

    constructor(props) {
        super();
        this.state = {
            web3: null,
            accounts: null,
            contract: null,
            // user : sessionStorage.getItem("user");
        };
    }

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts =  await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId =  await web3.eth.net.getId();
            const deployedNetwork = CareerManagement.networks[networkId];
            const instance = new web3.eth.Contract(
                CareerManagement.abi,
                deployedNetwork && deployedNetwork.address,
            );

            this.setState({ web3 : web3, accounts : accounts, contract: instance });

        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    }

    //근로자 트랜잭션
    registerCareer = async code => await this.state.contract.methods.register(code).send({from: this.state.accounts[0]});

    //임시 블록체인 메소드
    // todo. delete web3통신 구현
    deleteCareer = async code => await console.log(`deleted code :  ${code}`);

    //인증자 트랜잭션
    certifyContent = async code => {
        const { accounts, contract } = this.state;
        try{
            const result = await contract.methods.certify(code).send({from:accounts[0]})
            console.log(result)
        }catch (e) {
            alert("인증 권한이 없는 계정입니다");
            return;
        }
        const response = contract.methods.verify(code).call();
    };

    //view 트랜잭션 호출
    verifyCareer =  async code =>  this.state.contract.methods.verify(code).call();

    render() {
        if(!this.state.web3)
             return <div className="loadingWeb3">Loading Web3, accounts, and contract...</div>;
        if(this.state.accounts[0] !== sessionStorage.getItem("address"))
            return (    alert("❗ MetaMask Address가 일치하지 않습니다."),
                        sessionStorage.clear(),
                        <Redirect to={'/login'} />
                    );
    
        return ( sessionStorage.getItem("role") === "ROLE_EMP" ?
                    <EmpMain
                        web3={this.state}
                        verify={this.verifyCareer}
                        register={this.registerCareer}
                    /> :
                ( sessionStorage.getItem("role") === "ROLE_AUTH" ?
                        <AuthMain
                            web3={this.state}
                            verify={this.verifyCareer}
                            certify={this.certifyContent}
                        />
                    : <div> common user page </div>)
        );
    }
}
export default Authority;

