# Blockchain-Ration-System

This project showcases the usage of Blockchain Technology in Ration distribution.
The project consists of 5 organizations, Central Government, State Government, District Office, Ration Shops ( Fair Price Shops) and Citizens. Hyperledger Fabric has been used to create the complete Blockchain Network. The organization Tree is shown in fig below.  

Starting the Network & Platform


1. Generate cryptographic materials & network artifacts & connection Profiles ==> backend/scripts/generate.sh
2. Install dependencies in the chaincodes ==> run 'go mod vendor' in the respective chaincode folders (6 folders)
3. Start the Network for the 1st Time ==> backend/scripts/run.sh
4. If any errors are encountered after channel creation, related to tcp connections ==> run 'sudo bash prune.sh' and retry STEP-3.
5. Install dependencies in the Node.JS API ==> run 'npm install' in middleware/
6. Copy the Connection Profiles from connections/ -> middleware/fabric/ccp/
7. Enroll the ADMIN's of the SDK ==> run 'node fabric/enroladmin'
6. Start the API server ==> run 'npm start' in middleware/
7. All set, now the Hyperledger Fabric network and the API server are up and running.

Stopping the Network & API Server
-------------------

1. Stop the Node.JS API server
2. Stop the Blockchain Network ==> backend/scripts/stop.sh
2-A. To resume the server Later, run backend/scripts/resume.sh


To start Frontend => run `npm start` in frontend/

![image](https://user-images.githubusercontent.com/54908882/119858452-1bc38300-bf32-11eb-9a62-a0f503641d10.png)

Languages/Libraries/Frameworks used:

React :  It is a JavaScript library used for the development of the   frontend and user interface of the  Application

Express  :  It is a flexible Node.js web application framework used for developing the middleware of the project.

Golang : Used for writing the chaincodes (Smart Contract) of the Blockchain Network.

Hyperledger Fabric:  Hyperledger Fabric is a modular blockchain framework that acts as a foundation for developing blockchain-based products, solutions, and applications using plug-and-play components that are aimed for use within private enterprises.

![image](https://user-images.githubusercontent.com/54908882/119858768-6513d280-bf32-11eb-8e24-ed4728b65d82.png)



![image](https://user-images.githubusercontent.com/54908882/119858627-46add700-bf32-11eb-8eb5-59377b52ae2e.png)

Few Screenshots:
![image](https://user-images.githubusercontent.com/54908882/119858909-84aafb00-bf32-11eb-8a85-a20e2aea68f2.png)


![image](https://user-images.githubusercontent.com/54908882/119858936-8b397280-bf32-11eb-8029-aec389896bb7.png)


