var stormpath = require('stormpath');

var apiKey = {id: 'YOURAPIKEYO', 
			  secret: 'YOURSECRET'};

var appId = '';

//Only create a server if we can get the current tenant
var client = new stormpath.Client({apiKey: apiKey});

client.getAccount('https://api.stormpath.com/v1/accounts/3zG5Yfct8T3Hnbc4lOBtMh', {expand: 'customData'} ,function(err, account){
	console.log(account);
});
