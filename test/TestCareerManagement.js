const CM = artifacts.require("./CareerManagement.sol");

contract("CareerManagement", (accounts) => {
  let cm;

  before(async () => {
    cm = await CM.deployed();
  });

  console.log(`${accounts[0]}${accounts[9]}`)
  it("1) 커리어 정상 등록", async () => {
    let register = await cm.register("40x0e775a16f3Dd9379e7bFc4F902293371e1C1dF170x11ef727907AB84938fE19DD1028991BEd7855BD9",{ from : accounts[9] });
    assert.equal(register.receipt.status,true, "error");
  });

  it("2) 커리어 인증", async () => {
    await cm.register("40x0e775a16f3Dd9379e7bFc4F902293371e1C1dF170x11ef727907AB84938fE19DD1028991BEd7855BD9",{ from : accounts[9] });
    // 인증 전
    let result = await cm.verify("40x0e775a16f3Dd9379e7bFc4F902293371e1C1dF170x11ef727907AB84938fE19DD1028991BEd7855BD9");
    assert.equal(result,false, "error");

    await cm.certify("40x0e775a16f3Dd9379e7bFc4F902293371e1C1dF170x11ef727907AB84938fE19DD1028991BEd7855BD9",{ from : accounts[9] })

    // 인증 후
    result = await cm.verify("40x0e775a16f3Dd9379e7bFc4F902293371e1C1dF170x11ef727907AB84938fE19DD1028991BEd7855BD9");
    assert.equal(result,true, "error");
  // });
    // // 코드 생성
    // let registerResult = await contractInstance.methods.certify('40x0e775a16f3Dd9379e7bFc4F902293371e1C1dF170x11ef727907AB84938fE19DD1028991BEd7855BD9', { from: accounts[0] });
    // console.log(registerResult);
    // // 인증여부 확인
    // const verifyResult = await contractInstance.methods.verify('40x0e775a16f3Dd9379e7bFc4F902293371e1C1dF170x11ef727907AB84938fE19DD1028991BEd7855BD9').call();
    // console.log(`log1:${verifyResult}`)
    // assert.equal(verifyResult, false, "not certified yet");
    //
    //
    // //
    // const certifyResult = await contractInstance.methods.certify('40x0e775a16f3Dd9379e7bFc4F902293371e1C1dF170x11ef727907AB84938fE19DD1028991BEd7855BD9',{ from : accounts[0] });
    // const verifyResult2 = await contractInstance.methods.verify('40x0e775a16f3Dd9379e7bFc4F902293371e1C1dF170x11ef727907AB84938fE19DD1028991BEd7855BD9').call();
    // console.log(`log:${verifyResult2}`)
    // assert.equal(verifyResult2, true, "certified");

  });
});
