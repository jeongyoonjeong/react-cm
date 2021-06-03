const CM = artifacts.require("./CareerManagement.sol");
  

contract("CareerManagement", (accounts) => {
  let cm;
  before(async () => {
    cm = await CM.deployed();
    await cm.addAuthorizer(accounts[9]);
  });

  
  describe("테스트 커리어 정보 등록", async () => {
    const careerId = '99'
    const testCode = `${careerId}${accounts[0]}${accounts[9]}`;
    before("register call. \ncode = careerId + accounts[0] + authorizerAddress", async () => {
        const registerResult = await cm.register(testCode, { from: accounts[0] });
    });
  
    it("1) 커리어 인증 상태 확인", async () => {  
      let careerStatus = await cm.verify(testCode,{ from : accounts[0] });
      assert.equal(careerStatus, false, "ERR : 정보 등록에 문제가 있습니다.");
    });

    it("2) 커리어 인증", async () => {
      await cm.certify(testCode, { from : accounts[9] });
      let result = await cm.verify(testCode, { from : accounts[0] });
      assert.equal(result,true, "ERR : 정보 인증에 문제가 있습니다"); 
    });
  });
});
