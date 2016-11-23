# photoShare

A web application that allows users to upload pictures to sell.

# How to use

#### Installing MongoDB 
##### Linux

~~~~
sudo apt install mongodb
~~~~

#### Installing packages

__Note:__ Before running these commands make sure you are at the root of the project.
~~~~
npm install
~~~~
## Using the application

#### MongoDB
Make sure that mongoDB is running first.
~~~~
sudo service mongodb status
~~~~
If it is not running.
~~~~
sudo service mongodb start
~~~~

#### Running the server

Run the server. Must use root privileges to run on port 80.
~~~~
sudo npm start
~~~~
##### Development
~~~~
sudo npm start dev
~~~~
This has the nodemon package so will auto update changes whenever files are changed.