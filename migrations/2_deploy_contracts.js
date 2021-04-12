var CM = artifacts.require("./CareerManagement.sol");

module.exports = function(deployer) {
  deployer.deploy(CM,[
    "0x11ef727907AB84938fE19DD1028991BEd7855BD9",       //ganache(1)
    "0x8b26FD2a2A95Bd3930D81D474c9A6A1e05efFCa7",       //ganache(2)
    "0xfc774F932a72fb79d647876b6c561e160A7B6fF4",       //ganache(3)
    "0x8226c23A3B56E536653e5A047DcA3C5bb8a43Cfa",       //ganache(4)
    "0xa6A15cA7376330Ed9AbEc8664d72580585fbEa48",       //ganache(5)
  ]);
};
