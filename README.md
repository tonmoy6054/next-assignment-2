To run a Node.js Express application with TypeScript and integrate MongoDB using Mongoose, i follow these steps:

#Initializing a new Node.js project:
mkdir my-project-name
cd my-project-name
npm init -y

#Installing required dependencies.
npm install express mongoose typescript @types/node @types/express @types/mongoose ts-node

#Creating a tsconfig.json file.

#Modifying the tsconfig.json file to include the following:
"outDir": "./dist",
"rootDir": "./src",

    #  Setting up my project structure(model)
    #Creating an app.ts & server.ts file in the src directory
    #then rearrangeing my project (model type) where i use interface,model,controllers, service, routes typescript file.
