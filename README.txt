Datebase setup =>

1. Create an account on MongoDB: mongodb.com
2. After logging in press 'Build New Cluster'
3. Default options are okay (Free Tier), press Create Cluster (7-10 minutes)
4. Press 'CONNECT' under the new database name
5. Whitelist '0.0.0.0' for all IP addresses
6. Create a new MongoDB user
7. Press 'Choose connection method'
8. Press 'Connect Your Application'
9. Create a '.env' folder in the main directory. Copy 'Connection String Only' into the .env file so it reads as follows
    mongoURI=mongodb+srv://<username>:<password>@englishdb-pous3.mongodb.net/test?retryWrites=true&w=majority

10. Enter in the newly created user under <username> and <password> into the fields of step 9
