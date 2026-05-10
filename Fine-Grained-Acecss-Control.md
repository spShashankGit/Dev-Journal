#FGAC

## Goal:
Understand how to simplify data sharing using AWS Lake Formatin and AWS Organisation.

## Data Sharing
Business Units want to share the data with one another.
The key is they want to hold the ownership of the data.
There is possibility to share the data with external vendors and/or clients.


## AWS Organisation
Helps you centrally manage and count your environment as you grow and scale your AWS resources. 

AWS organizations helps you to 
1. Programatically create new AWS accounts and allocate resources,
2. Group accounts to organize your workflows,
3. Apply policies to accounts or groups
4. Simply billiny by using single payment method for all the accounts. One can also have organization specific billing payment created.
5. Define central organisations, security mechanism, audit requirements and resource sharing across accounts in organization.

## Lake Formation
Fully managed service that makes it easy to build a secure and manage data lake.
Lake formation simplifies many of the complex manual steps that are usually required to create data lakes.

Steps include:
1. Collecting
2. Cleansing
3. Moving
4. Cataloging
5. Securely making the data available for analytics and ML usecases.

Lake formation provides its own permission model that augments that IAM permission model. This centrally defined permission model enables fine grain access to the data stored in data lake through a simple grant and rework mechanism (This is very similar to relations DB).

Lake formation enables:
1. Federated data lake with cross account sharing,
2. Delivering centralized domain-oriented data products across your organization with minimal to no data movements.

## Scenarion
Account A: Have database and tables
Account A: Wants to share this with AWS Account B and Account C.
(This can happen as of now without Lake Formation)

If you want to grant access to Account A and Account B in a single grant, then organization units comees into the picture.
You can share at organization unit level as well, and not only at OU level but also at the entire organization level too.
<Could this be key in Data Mesh?>


____
Reference:
https://www.youtube.com/watch?v=S-Mdcmq6oPM&t=88s
