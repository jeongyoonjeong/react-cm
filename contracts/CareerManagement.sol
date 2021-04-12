pragma solidity ^0.5.1;
// We have to specify what version of compiler this code will compile with

contract CareerManagement {

  address[] authorizers;
  mapping(string => bool) careerStateMap;

  // 인증자(기업,기관 등)에 대한 정보는 컨트랙트 배포 시 설정
  constructor(address[] memory authorizerNames) public {
    authorizers = authorizerNames;
  }

  modifier onlyAuthorizer(){
    bool isVerified = false;
    for(uint i = 0;i < authorizers.length; i++){
      if(authorizers[i] == msg.sender)
        isVerified = true;
    }
    require(isVerified,"you are not qualified..");
    _;                       //modifier함수가 실행된 본체의 함수를 실행
  }

  modifier matchCode(string memory code){
    bool isVerified = false;
    for(uint i = 0;i < authorizers.length; i++){
      if(authorizers[i] == msg.sender)
        isVerified = true;
    }
    require(isVerified,"you are not qualified..");
    _;                       //modifier함수가 실행된 본체의 함수를 실행
  }



  // 경력 등록
  // code => careerId + authId + empId
  function register(string memory code)
  public {
    careerStateMap[code] = false;

  }


  function certify(string memory code)
  public
  onlyAuthorizer
  matchCode(code){
    careerStateMap[code] = true;
  }

  function verify(string memory code) view public returns(bool){
    return careerStateMap[code];
  }

}