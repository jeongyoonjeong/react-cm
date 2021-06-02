pragma solidity ^0.5.1;
// We have to specify what version of compiler this code will compile with

contract CareerManagement {

  address[] authorizers;
  mapping(string => bool) careerStateMap;

  //인증자(기업,기관 등)에 대한 정보는 컨트랙트 배포 시 설정
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
    if(keccak256(abi.encodePacked(subAuthAddr(code))) == keccak256(abi.encodePacked(addressToString(msg.sender))))
        isVerified = true;
    
    require(isVerified,"you are not a authenticator");
    _;                       //modifier함수가 실행된 본체의 함수를 실행
  }




  function addressToString(address _addr) internal returns(string memory) {
    bytes32 value = bytes32(uint256(_addr));
    bytes memory alphabet = "0123456789abcdef";

    bytes memory str = new bytes(51);
    str[0] = "0";
    str[1] = "x";
    for (uint i = 0; i < 20; i++) {
        str[2+i*2] = alphabet[uint(uint8(value[i + 12] >> 4))];
        str[3+i*2] = alphabet[uint(uint8(value[i + 12] & 0x0f))];
    }
    return string(str);
  }


  function subAuthAddr(string memory code)
  internal
  returns (string memory) {
      
    bytes memory codeBytes = bytes(code);
    bytes memory result = new bytes(42);
    for(uint i = 0; i < 42; i++) {     
        result[i] = codeBytes[codeBytes.length-42+i];
    }
    return string(result);
  }
  
  


/// @dev 경력 추가 => career code 생성. (default status = false) 
/// @param code =  careerId + empAddress + authAddress.
  function register(string memory code)
  public {
    careerStateMap[code] = false;
  }

/// @dev 경력 인증 => career status 수정  
/// @param code =  careerId + empAddress + authAddress.
  function certify(string memory code)
  public
  onlyAuthorizer
  matchCode(code){
    careerStateMap[code] = true;
  }

/// @dev 경력 상태 확인  
/// @param code =  careerId + empAddress + authAddress.
/// @return 경력 인증 상태 (boolean) 
  function verify(string memory code) view public returns(bool){
    return careerStateMap[code];
  }

}