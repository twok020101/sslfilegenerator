This is SSL file generator that can create SSL for any domain that you can point at your for ~2mins. This is a very specific use case where domain is
owned by someone else and but you will pointing that to your application where you dont have access to production server. 

Create a small server where you can point any domain and copy server.js to some folder in the server.
	 - Run the following script to install the required dependencies
	  ``` sudo apt-get install nodejs && sudo apt-get install npm && npm update```
	 - Then cd into your directory and run following commands
	  ```npm init && npm i express```
	 - Once that is complete run the following command
	  ``` mkdir .well-known && mkdir .well-known/acme-challenge```
	 - For better handling I use pm2 to run the code you can simply start in background using nohup
	  ```nohup node server.js &```
	  For pm2 users
	  ```pm2 server.js```
  
  
 The above steps are one time setup
 ***This completes the server setup***
 
 On your local machine
 	-Run the following command(One time)
		```sudo apt-get install certbot && sudo apt-get install openssl```
	  ```npm i sslgenerator```
	  Then you can directly use commands
	  ``` node sslgenerator <function-name> <param1> <param2> <param3>

	  Function name:
		   1. certfiles : This command can be passed as function-name to generate ssl files
		   2. pfxgenerate: This command can be passed as function-name to generate pfx file from cert and priv key

	  params:
		   1. ip: Ip of the temproary server where server.js is running
		   2. domain: domain for which ssl files needs to be generated
			
			In case of pfx generate
		   3. path: Folder path where cert and private key file exists
		   4. pfxFileName: File name of the pfx
		   5. Password: Password for the file
		   
	Your cert files will be stored in ***/etc/letsencrypt/archives/{domain}***
	***Make sure to run above code as sudo***
