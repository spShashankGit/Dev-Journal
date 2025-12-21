# S3 Tables

GA: 03.12.2024 \
Table bucket: Store Apache Iceberg format tables natively in S3 and S3 now supports tables as a new construct.

**S3 Tables:**
1. Each of the table has it's own ARN.
2. Resource policy can be written directly against the ARN.
3. Has dedicated endpoint ```s3tables.region.amazonaws.com``` that can be used to access these resources.

**Tables Operations**
1. S3tables:ListTable
2. S3tables:CreateTable
3. S3tables:GetTableMetadataLocation
4. S3tables:UpdateTableMetadataLocation
5. S3tables:DeleteTable
CRUP operations on the tables directly.

**Table Management**
1. S3tables:PutTablePolicy
2. S3tables:PutTableBucketPolicy
3. S3tables:PutTableMaintenanceConfig
4. S3tables:PutTableBucketMaintenanceConfig \
They are both at table level and s3table bucket level. \
How long you want your snapshot to be available? \
How long you want to take to age them out? \
These are the parameters that you can use to define your lifecycle management operations via the policy.

**New Protection**
1. No delete operation allowed of existing objects
2. No overwrite operation allowed of existing objects
3. Audit with AWS CloudTrail \
2 & 3 are in place so that the integrity of the table is maintained. \
Right way to delete/overwrite the object is throught the maintenance policies.

**Additional benefits:**
1. Optimised Performance
2. Security Controls
3. Cost Optimisation (automatic)

**Optimised Performance:S3 Tables**
1. 10x Transactions Per Second (TPS)
2. 3x Faster Query Performance \
S3tables are purpose-build for tables, so as soon S3 recognises the dataset is in iceberg tabular format.
AWS specifically apply optimisation on our behalf for that S3table.

**Performance benchmarks**
| General purpose buckets           | Table buckets |
| ----------------------------      | ----------- |
| Scale by prefix                   | S3 storage optimised for iceberg key naming|
| Adds TPS capacity under load*     | Add TPS capacity under load*|
| TPS startes at 55000 read/seconds | TPS startes at 55000 read/seconds |
| Starts at 3500 writes/seconds.    | Starts at 35000 write/seconds
*Under load S3 request additional resources to achieve the demand. | 

> [!IMPORTANT]
> Open Source Contribution:AWS contributed to Iceberg: in which you are writing your data and laying out your data files in Iceberg now is better optimized to be able to take advantage
of the automatic scaling that S3 provides. Blog post is also available [^2]
______

### Compaction of smaller tables into bigger one
**Real world observation**
Overtimes tables will continue to grow and this means query will be more because it has to go through now additional files.
Iceberg provides a way to solve this i.e. do the compaction of the smaller data files into the larget ones.

**Current and future solution for compaction**
This traditionally need developers to do this. Now in S3 this can be achieved in the background and automatically leads to the shorter query times.
Can lead uptom 3x improvement in the query times. Blog post is linked[3]
___
**Security Controls**
Now that S3Tables itself are resources you can apply resource policy to them and manage read/write permissions to them directly.
(Allowing you to be able to govern access to the table and the table bucket itself.)

**Namespace**: Logically group tables within table buckets.
___________________________________
### Snapshot maintenance
**S3 Tables - Automated maintenance:**\
**Real world observation** Any update in an iceberg tables result in a commit operation and that create a brand new snapshot for that table.
And this is great property of icebreg that lets you go back in time and be able to see a view of the table from the past and be able to rollback to it.
Old snapshots need not to stay forever as you will be pointing your dataset to the newest snapshot.

**Current and future soltution for snapshot lifecycle management**: To manage this applications needs teams to do that. Now AWS can take care of that for us.
The S3 tables will make sure old snapshort are phasing out(deleted?) and the associated files and garbage collector(clean up unreferenced file associated with older snapshot) for that files are run. Elimiinating the manual effort.
All of these procedures are policy driven. So that you can define how many of these snapshots you want to keep around and for how long you want to keep them around.
Also checking the integrity of the table i.e. you can go back and look up the maintenance operations for those tables.
- - - - - - - - - - - - - - - - - - - - - - - - - -

### S3
Originally build: 2006 \
Idea: Store the data securely & durably have it available when needed.\
Envisioned filed stored: Video, Photos and other static content\
Current usage: Data used for Analytics, Machine Learning and AI \
Usage: Meterological data, financial transactions and records \
Format: Apache Parquet (Tabular format)

**Problem with Parquet datafiles:** Evolving the schema was difficult because adding and removing columns means that efforts is spent in making sure data can be consumed at speeed at scale. Does this mean we need to update schema in each and every application?
Iceberg: Adds metadata file, metadata allows to structure the data, safe transactions, time-travel, SQL semantic, allows consistency of the data

#### Iceberg features
1. Time travel
2. Schema information
3. Compaction
_____________
### Demo session starts here

**S3 Tables in action**
James: Pr. Engineer at S3 team

Table on it own do not give us the possibility to read the data stored in the table i.e. read the bit or byts.
AWS Analytics:
1. Amazon EMR
2. Amazon Athena
3. Amazon Redshift
4. Amazon Quicksight
5. Amazon Data Firehose\

Centre of all this integration is Glue Data Catalogue. Long time Glue Data Catalogue has supoprted tables stored in self managed S3 buckets. That means we have to managed the tables ourselves.

With S3 Tabels your tables are automatically registered with the Glue Data Catalogue so that we do not have to make sure that every table is registered there for the access.

Ones the tables are registered with the Glue Data Catalogue they aitomatically show-up across the AWS Analytics ecosystem.
i.e. query the data using the Athena, perform deep analysis using Redshift and stream the data directly into your S3 tables using Amazon Data Firehose
Constrcut visualization using Amazon quicksight.
You can connect data sources like Kinesis and CloudWatch log and IoT devices.

S3 tables is a native iceberg product. There is a rich ecosystem both inside the AWS ecosystem that is known to write the data into the Iceberg tables but also third-party services that know how to generate the Iceberg tables and store them somewhere you would like them to.

Analyse the data that is stores in teh S3 Tables
Option 1: Amazon Athena: Serverless sequel engine that can natively query S3 Tables through Glue Table Catalogue.
```Select * from catalogu:name.namespace_of_tables.table_name```


Option 2: Amazon Redshift: Warehouse analytics service, offer rich integration of the services across the entine organisation.
Offers real high performance query engine specifically for Iceberg and for large volumes of Iceberg in particular.

With Athena you can query a simple query and then go to fast query engine like Redshift for terrabyte of petabyte of the iceberg table.
Ability to get the fine-grained access control with the AWS Lake Formation.

Lake Formation is a way to specify which users have access to each of your tables and even to individual columns or rows within a table.
So Lake Formation integrates with IAM, of course, but it also integrates with IAM Identity Center.
roles or your IAM users, but over your federated identities.
33:52
So things like an active directory instance with your users or an Okta instance or any number of identity providers that integrate with IAM.
Autmatic.

Customers also use S3 Tables with Amazom EMR using their spark infrastructure and the Flink streaming infrastructure.

Offer an open source Iceberg catalogue for integrating your analytics engine of your choice with S3 Tables.

In Iceberg catalogue is essentially a connector that helps to discover the Iceberg metadata for the table you want to query.

**S3 tables cataloue tables for Iceberg is a plugin that allows your spark plugin to directly connect to the S3 Tabels to discover and work with the tables.
Docs available for copy-paste instruction on how to connect external spark workload to S3 tables.
The S3 Tables Catalogue is open source and can be found at [4].

Workload examples: 
1. Stream-in, store in table and visualise the quicksight.
<img width="748" height="396" alt="image" src="https://github.com/user-attachments/assets/e774f023-88c1-42e7-8d26-22c97576d827" />

**Summary:**
S3 Tables is our fully-managed Iceberg service. You get all the benefits of Apache Iceberg like time travel,

transactional semantics, row-level updates and deletes, along with all the benefits of S3, right? Things that S3 is known for, elastic storage,

extremely high performance for large data sets. And with S3 Tables, you get all of this without the operational overhead

of existing Iceberg storage. We do all the maintenance for you, like Adi told you. We offer you access control mechanisms

with IAM and with Lake Formation. We automatically integrate all of this stuff with the the AWS analytics systems
to get the best out of the data that you're storing. The whole S3 team has actually worked incredibly hard



## Reference: 
1. https://www.youtube.com/watch?v=1U7yX4HTLCI

[^2]: https://aws.amazon.com/blogs/storage/how-amazon-ads-uses-iceberg-optimizations-to-accelerate-their-spark-workload-on-amazon-s3/
3. https://aws.amazon.com/blogs/storage/how-amazon-s3-tables-use-compaction-to-improve-query-performance-by-up-to-3-times/
4. https://github.com/awslabs/s3-tables-catalog