
window.addEventListener('load', function(){
  if(typeof web3 === 'undefined'){
    web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io'));
    // alert('Please Download Metamask')
    //disable everything
  }else{

    contractAddress = '0x12458C69eC849aF2854fDec7e0761e60D4eE7ed3';
    abi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"names","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getAddresses","outputs":[{"name":"","type":"address[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"}],"name":"register","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"addresses","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"}]
    consensysAcademy = web3.eth.contract(abi).at(contractAddress);
    setTimeout(getAddresses, 500); //why do I need this?
    // getAddresses() //instead of this? Which returns the array with only first element! WTF
    // getAccount()
    web3.version.getNetwork(function(e,r){
      if(r == 1){
        console.log("MAINNET");
      }else{
        alert("Please Connect Metamask to Ethereum Main Net");
      }
    })
  }
})

// userAddress = "";
// getAccount = function(){

// }

getAddresses = function(){
  consensysAcademy.getAddresses.call(function(e,addresses){
    if(addresses){
      console.log('ADDRESSES: ', addresses)
      console.log('consensysAcademy: ', consensysAcademy)
      renderAddresses(addresses)
    }else{
      console.log(e)
    }
  })
}

getNames = function(addresses){
  for (var i = 0; i < addresses.length; i++) {
    getName(addresses[i])
  }
}
getName = function(address){
  consensysAcademy.names(address,function(e,encodedName){
    if(encodedName){ 
      console.log('ENCODED_NAME: ', encodedName)
      renderName(address.toString(), hex2a(encodedName.toString()))
    }else{
      console.log(e)
    }
  })
}
sendTx = function(){
  if(typeof Web3 === 'undefined'){
    alert('Please Download Metamask')
  }else{
    var name = document.getElementById('nameField').value;
    web3.eth.getAccounts(function(e, accounts){
      if(accounts && accounts.length > 0){
        console.log('ACCOUNT: ', accounts[0])
        var userAddress = accounts[0];
        consensysAcademy.register(name,{from: userAddress},function(e,txHash){
          if(txHash){ 
            console.log('TXHASH: ', txHash)
            getAddresses();
            document.getElementById('success').innerHTML = "Thank You For Registering";
          }else{
            console.log(e)
          }
        })
      }else{
        console.log(e)
        alert("Please open metamask")
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
  console.log('NAME: ', name)
  document.getElementById(address).innerHTML = name + " \t " + address; 
}

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}




