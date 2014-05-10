//Get the Stormpath module 
var stormpath = require('stormpath');

var appId = '';

var client = null; //available after the ApiKey is loaded from disk (api key is needed to instantiate the client).
var app;

//Generate a Stormpath client based on your API Key and Secret
var apiKey = new stormpath.ApiKey('YOUR_API_KEY_ID', 'YOUR_API_KEY_SECRET');
var client = new stormpath.Client({apiKey: apiKey});

//Create an application
var app = {
  name: 'My Awesome Application!',
  description: 'No, Srsly. It\'s Awesome.'
};

client.getApplications({name:'My Awesome Application!'}, function(err, applications){
	if (err) throw err;

	if(applications.items){
		//app is already created, you already ran this before
		app = applications.items[0];
		createUser();
	}else{
		//app isn't already created - let's create it!
		client.createApplication(app, {createDirectory: true} ,function onAppCreated(err, createdApp){
			  if (err) throw err;
			  app = createdApp;
			  createUser();
		});
	}
});

//Callback when are ready to create / retrieve the user
var createUser = function(){

	var account = {
		givenName: 'Tom',
		surname: 'Abbott',
		email:'tom@stormpath.com',
		password:'AwesomeSecurePassword1',
		customData: {
			favoriteAnimal: 'Miley Cyrus'
		}
	}

	app.getAccounts({email:'tom@stormpath.com'}, function(err, accounts){
		if (err) throw err;

		if(accounts.items.length > 0){
			//account already exists... delete!
			var acc = accounts.items[0];
			deleteAccount(acc);
			
		} else {
			//account doesn't exist, lets create it before deleting it...
			app.createAccount(account, function(err, acc){
				if (err) throw err;
				console.log('Account Created! ', acc.email);
				deleteAccount(acc);
			});
		}
	});
};
var deleteAccount = function(account){
	account.delete(function(err){
		if(err){
			console.log('Delete failed :(', err);
		}else{
			console.log('Delete Success!');
		}
	});
}