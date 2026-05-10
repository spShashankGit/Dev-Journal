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

## Scenario
Account A: Have database and tables
Account A: Wants to share this with AWS Account B and Account C.
(This can happen as of now without Lake Formation)

If you want to grant access to Account A and Account B in a single grant, then organization units comees into the picture.
You can share at organization unit level as well, and not only at OU level but also at the entire organization level too.
<Could this be key in Data Mesh?>

Under the hood: Lake formatiion uses AWS Resource Access Manager service to share resources. 
If the grantee account is in the same organization as the granter account, the shared resource is available immediately to grantee.

If the account is not part of the organization , you can still be able to share externally as well.

**Demo Time**
1. AWS Management Console and logged in as Admin.
2. Management Account: AWS Organization have a master account who will going to manage all the accounts. This account can see various OUs like Marketting and other OU as Sales.
3. Invitation: You can invite an existing AWS account to be part of the OU by sending an invite. You need an acount number to send the invitation. As soon as this is done, it starts to show up under the OU.

**To share the data across the organization we need to enable the Resource Access Manager(RAM) setting and enable the checkbox which says Enable_Sharing_with_AWS_Organization**

Producer account: will create data on S3 and catalogue it using Glue.
This will be used a resource to share wiht the entire organization.

Role: Lake Formation Administrator who is going to share this data between different accounts using organization.  -> AWS Lake Formation -> Database -> Certain tables registered under S3 location.
-> (Registering the S3 buckets under "Data Lake location")
-> Got to database and start granting permissions to this database.

Grant permissions -> External Grants -> Listing all the options to share -> Options show Organizations, Sub-organizations and also individual accounts.
(If one chooses organization or sub-organization then these permissions are propogated downwards.)

<img width="601" height="586" alt="image" src="https://github.com/user-attachments/assets/27ae6417-6ebc-492a-bf68-82f9a0a243f1" />

<img width="798" height="628" alt="image" src="https://github.com/user-attachments/assets/48b3266c-5988-49ce-9885-8336731f5171" />

<img width="587" height="352" alt="image" src="https://github.com/user-attachments/assets/efdee60a-1fdc-4749-9e1a-390adcedf31e" />

<img width="597" height="572" alt="image" src="https://github.com/user-attachments/assets/99bcc71e-912c-4f07-941b-e7c26cac7af6" />
**This workflow has granted permission to the database.**

## Grant permssion for the tables that needs to be shared
<img width="815" height="603" alt="image" src="https://github.com/user-attachments/assets/06501dae-2034-462b-96f1-1fc80182c17d" />

<img width="786" height="615" alt="image" src="https://github.com/user-attachments/assets/8363ad32-4624-46ad-9ba7-ddaf96e2b851" />

**This workflow has granted consumer the permission to read the tables from the database selected in the previous workflow.**


## Consumer
Login: As AWS Administrator.
Lake Formation > Database > Create Database > Resource Link
(Create resource link to the database so that consumer can see the data.)

<img width="662" height="506" alt="image" src="https://github.com/user-attachments/assets/45c09b3f-6e54-4827-8561-fe29010519c2" />

Next step if to provide the Analytics the privlages to describe the database.


# AI generated summary with timestamps
## 🛠️ Step-by-Step Workflows
The process involves three distinct personas performing specific roles to enable seamless data access.
## 1. The Organization Administrator (Global Setup)
Persona: AWS Administrator with access to the Management/Master account ([5:11](https://www.youtube.com/watch?v=S-Mdcmq6oPM&t=311s)).
Goal: To establish the organizational trust and enable sharing capabilities.

* Step 1: Log into the AWS Management Console and verify the AWS Organization structure (e.g., creating OUs like "Sales" or "Marketing") ([5:11](https://www.youtube.com/watch?v=S-Mdcmq6oPM&t=311s)).
* Step 2: Invite member accounts to join the organization if they are not already present ([5:41](https://www.youtube.com/watch?v=S-Mdcmq6oPM&t=341s)).
* Step 3: Navigate to the Resource Access Manager (RAM) console ([6:41](https://www.youtube.com/watch?v=S-Mdcmq6oPM&t=401s)).
* Step 4: In RAM Settings, check the box to "Enable sharing with AWS Organizations" to allow Lake Formation to use the organization's structure for resource sharing ([6:52](https://www.youtube.com/watch?v=S-Mdcmq6oPM&t=412s)).

## 2. The Data Producer (Data Sharing)
Persona: Lake Formation Administrator in the Producer account (the account owning the data) ([7:40](https://www.youtube.com/watch?v=S-Mdcmq6oPM&t=460s)).
Goal: To grant data access to the Consumer account(s).

* Step 1: Register the S3 bucket containing the data as a Data Lake location in Lake Formation ([8:23](https://www.youtube.com/watch?v=S-Mdcmq6oPM&t=503s)).
* Step 2: Select the database or tables to be shared and click Grant ([8:53](https://www.youtube.com/watch?v=S-Mdcmq6oPM&t=533s)).
* Step 3: Under "Principals," choose External Accounts and select the entire AWS Organization or a specific OU ([9:18](https://www.youtube.com/watch?v=S-Mdcmq6oPM&t=558s)).
* Step 4: Assign permissions (e.g., DESCRIBE for the database and SELECT/DESCRIBE for tables) and click Grant ([10:02](https://www.youtube.com/watch?v=S-Mdcmq6oPM&t=602s)).

## 3. The Data Consumer (Data Access)
Persona: Lake Formation Administrator in the Consumer account ([12:00](https://www.youtube.com/watch?v=S-Mdcmq6oPM&t=720s)).
Goal: To make the shared data available to local users (e.g., Analysts).

* Step 1: Locate the shared database in the Lake Formation console ([12:09](https://www.youtube.com/watch?v=S-Mdcmq6oPM&t=729s)).
* Step 2: Create a Resource Link for the shared database to make it visible to local services like Amazon Athena ([12:28](https://www.youtube.com/watch?v=S-Mdcmq6oPM&t=748s)).
* Step 3: Use "Grant on target" to give local IAM roles (like a "Business Analyst") permission to query the actual underlying tables ([14:47](https://www.youtube.com/watch?v=S-Mdcmq6oPM&t=887s)).
* Step 4: The Business Analyst persona can then log into Amazon Athena and query the shared data immediately ([15:56](https://www.youtube.com/watch?v=S-Mdcmq6oPM&t=956s)).

`IAMAllowedPrincipals` is a role makes lake formation backward compatible. 
> Principal is an IAM group - IAMAllowedPrincipals
Lake Formation sets Super permission on all databases and tables in the Data Catalog to a group called IAMAllowedPrincipals by default. If this group permission exists on a database or a table, all principals in your account will have access to the resource through the IAM principal policies for AWS Glue. It provides backward compatibility when you start using Lake Formation permissions to secure the Data Catalog resources that were earlier protected by IAM policies for AWS Glue.
> When you use Lake Formation to manage permissions for your Data Catalog resources, you need to first revoke the IAMAllowedPrincipals permission on the resources, or opt in the principals and the resources to hybrid access mode for Lake Formation permissions to work.
Source: https://docs.aws.amazon.com/lake-formation/latest/dg/lf-permissions-reference.html
____
Reference:
https://www.youtube.com/watch?v=S-Mdcmq6oPM&t=88s

____________________Part 2_________________________________________

# Worflow for the Athena and Lake Formation
<img width="1106" height="565" alt="image" src="https://github.com/user-attachments/assets/62db2c6f-817b-4f83-8089-abae47e8b200" />

<img width="1172" height="587" alt="image" src="https://github.com/user-attachments/assets/605e093d-d0e9-4c57-8e2f-19036467d373" />

Permission set
<img width="1103" height="589" alt="image" src="https://github.com/user-attachments/assets/5468dcea-2650-41bb-aee8-d8a7084b258e" />
Admin = All
Data Analytics = Want to analyse PII data have access to only PII data
Data Scientist = Geo & demographic model, have access to only those columns. 

This is a great way to showcase how to do column level filtering.
___
Reference:
https://www.youtube.com/watch?v=zF2M4dmOISc
