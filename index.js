
window.addEventListener('load', function(){
  if(Web3 === 'undefined'){
    alert('Please Download Metamask')
    //disable everything
  }else{

    // web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io'));

    contractAddress = '0x12458C69eC849aF2854fDec7e0761e60D4eE7ed3';
    abi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"names","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getAddresses","outputs":[{"name":"","type":"address[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"}],"name":"register","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"addresses","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"}]
    consensysAcademy = web3.eth.contract(abi).at(contractAddress);
    getAddresses();
    getAccount();
  }
})

userAddress = "";
getAccount = function(){
  web3.eth.getAccounts(function(e, accounts){
    if(accounts && accounts.length > 0){
      console.log('ACCOUNT: ', accounts[0])
      userAddress = accounts[0];
    }else{
      console.log(e)
      alert("Please open metamask")
    }
  })
}

getAddresses = function(){
  consensysAcademy.getAddresses.call(function(e,addresses){
    if(addresses){ 
      console.log('ADDRESSES: ', addresses)
      renderAddresses(addresses)
    }else{
      console.log(e)
    }
  })
}

getNames = function(addresses){
  for (var i = 0; i < addresses.length; i++) {
    var address = addresses[i];
    consensysAcademy.names(addresses[i],function(e,encodedName){
      if(encodedName){ 
        console.log('ENCODED_NAME: ', encodedName)
        console.log('NAME: ', hex2a(name))
        renderName(address, hex2a(name))
      }else{
        console.log(e)
      }
    })
  }
}
sendTx = function(){
 if(typeof Web3 === 'undefined'){
    alert('Please Download Metamask')
  }else if(userAddress === ''){
    alert('Please open Metamask to do that')
  }else{
    var name = document.getElementById('nameField').value;
    consensysAcademy.register(name,{from: userAddress},function(e,txHash){
      if(txHash){ 
        console.log('TXHASH: ', txHash)
        getAddresses();
        document.getElementById('success').innerHTML = "REGISTRATION SUCCESS!!!";
      }else{
        console.log(e)
      }
    })
  }
}

renderAddresses = function(addresses){
  //replace all this shit with creation of html elements nested and appended
  registrationsHTML = ''
  for (var i = 0; i < addresses.length; i++) {
    registrationsHTML += '<h2 id="' + addresses[i] + '"></h2>';
  }
  document.getElementById('registrations').innerHTML = registrationsHTML
  getNames(addresses)
}

renderName = function(address, name){
  document.getElementById(address.toString()).innerHTML = address + " \t " + name; 
}

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}
