# propine
propine assignment task
Couple of packages used to increase the speed of the development such as for reading csv and API call, axios 


 # Setup
First install nodejs latest version from the internet.

To set up the environment, required to install couple of packages in the nodejs framework.

npm install csv

npm install axios

npm install node-csv

run the file with: node crypto


# Design decisions
At the begining tried use normal method to read the csv file but couldn't load due to the buffer issue in the node. Then used the csv loading createReadStream function in file reading with some modified function available in the node-csv package. This function read the csv line by line and write to the buffer and hence no issue.

Seperate functions created for each requirement and called those function at the end.

Created an account in CryptoCompare and generated API key and changed the URL accordingly to get the dollar values required for BTC, ETH and XRP. URL fetch the json data and made required filter to get capture the requied dollar values.

Could not create the parameter passing in nodejs due to the time contraints. Currently Sri Lanka having power cut which goes around 6-7 working hours. At the same time, crisis and the bad weather made this difficult to complete the parameter passing part.
