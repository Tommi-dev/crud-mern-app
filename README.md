# crud-mern-app  
CRUD application with MERN stack  
  
---    
  
## Installation  
  
Before installing, download and install Node.js https://nodejs.org/en/download/.  

Download github repository:    
  
```bash
git clone https://github.com/Tommi-dev/crud-mern-app.git    
```  
  
Go to the root directory and remove .git:  
  
```bash
cd crud-mern-app/  
```  
  
```bash
rm -rf .git
```  
  
Install dependencies:  
  
```bash
npm install
```  
  
---  

## Quick Start  
   
Audit package dependencies for security vulnerabilities:    
  
```bash
npm audit
```  
  
Create a .env file and add environment variables for port and mongodb:  
  
```bash
touch .env
```  
  
`.env`  
```env
PORT=...
MONGODB_URI=...
TEST_MONGODB_URI=...
```  
  
Execute the unit tests:  
  
```bash
npm run test -- tests/integration_tests/employees_api.test.js  
```  
  
Start the application:  
  
```bash
npm start
```  
  
---  
  
## Screenshots  
  
<img src="./images/example.png" width="1000" height="auto">  
 