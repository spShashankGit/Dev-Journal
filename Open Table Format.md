# Open Table Format

### References
1. https://delta.io/blog/open-table-formats/


Open table formats solve performance and reliability problems with traditional data lakes. By storing metadata along with your tabular data, open table formats give you great features like:
1. Reliable ACID transactions
2. Advanced data skipping
3. Time travel
4. Schema enforcement and evolution
5. Full CRUD operations


#### 1. Reliable ACID Transition
Open table formats were developed to bring ACID guarantees to the data lake ecosystem.
ACID transactions make your data writes more reliable, so operations will not corrupt your table.
A “transaction” refers to any write operation that changes the table state.

With ACID transactions you can be sure to avoid:

1. Failed partial writes that break downstream queries
2. Accidental data corruption
3. Conflicting concurrent processes or data versions
4. Unintended data loss




___________________________________________________________

## Delta Lake vs Data Lake: ACID Transaction
Delta Lake supports ACID (Atomicity, Consistency, Isolation and Durability) transactions. 

ACID transactions give you 4 important guarantees:

1. Every data transaction is treated as an indivisible unit. Either the entire transaction gets completed or it fails entirely and no data gets changed. This solves the problem of failed partial writes. (Atomicity)

2. Your database is in a valid (un-corrupted) state before and after every transaction. If a transaction is going to break any of the pre-defined constraints, the entire transaction is rejected and will not complete. This solves the problem of table corruption. (Consistency)

3. Concurrent processes happen in isolation from each other and cannot access each other’s intermediate states. This solves the problem of conflicting file or data versions across multiple servers or processes. (Isolation)

4. Once a transaction is completed, the changes are guaranteed to never be lost, even in the event of system failures or power outages. Changes made are stored in non-volatile storage. This solves the problem of unintended data loss. (Durability)

Data lakes do not give you any of these guarantees.

### What a non-delta lake looks like:
For example, suppose you’re writing a large amount of data to an existing data lake of Parquet files. If your cluster dies during the operation, you may be left with partially written Parquet files in your data lake. 
These partial files will break downstream reads. To fix this, you will need to identify all of the corrupted files and delete them. You will then need to re-run the operation and hope that your cluster won’t die again. 

This kind of situation is not possible with ACID transactions: the entire write operation will fail and you will be free to retry without having to deal with a corrupted table.

### Delta Lake
Delta Lake makes your queries run faster than a regular data lake.

Delta Lake optimizes your queries by:

1. Storing file paths in a separate transaction log
2. Storing metadata in the transaction log
3. Prioritizing partial reads via file-skipping
4. Co-locating similar data to allow for better file skipping

#### Delta Lake vs Data Lake: Metadata
<img width="2002" height="1196" alt="image" src="https://github.com/user-attachments/assets/e464b555-b938-42fd-8c0f-c9b54fedf7fc" />

#### Delta Lake vs Data Lake: Data Skipping


Characterstic | Data Lake | Delta Lake
|-------------|-----------|-----------
Data Skipping| Parquet files store column statistics for row groups in the metadata footer. This supports query optimizations like column pruning and predicate pushdown. | Delta Lake takes this further. On top of this Parquet functionality, Delta Lake stores metadata at the file-level in a single transaction log. This way query engines can figure out which data can be skipped using a single network request. Entire files can be skipped this way, giving you order-of-magnitude performance gains when reading large tables with a selective filter.
Z-Ordering | NA | NA |
Data Versioning | Data lakes do not natively support data versioning. This can be a problem when your data scales and it becomes difficult to keep track of when a particular piece of data was accessed or transformed. It is also a problem when you or a colleague makes an accidental data update. Regular data lakes do not give you the possibility to revert this change easily.  | Delta Lake supports data versioning via its transaction log. All changes that are ever made to your data are recorded in this log. This means you have all the information about data transformations available for easy reference.
Time Travel | No time travel | Data versioning means that Delta Lake also supports “time travel” functionality. This means you can easily switch between different versions of your Delta table. This way you can go back to revert any accidental changes or to remember a previous state. Load specific version of your delta table like this: spark.read.format("delta").option("versionAsOf", version).load("path/to/delta")
Schema Enforcement | When writing updates to your data, you usually want to make sure that new data matches the schema of your existing data. This is called “schema enforcement” and ensures the consistency of your dataset: the “C” in ACID that we just saw earlier. Depending on your data lake infrastructure, ensuring schema enforcement may be easy or difficult to set up. If your data lake has a metastore, then you can define your schema enforcement constraints there. Data lakes with regular Parquet files do not support schema enforcement by default. This means that it’s easy to write data with a different schema to your existing Parquet data lake. This will cause problems downstream when trying to read the data.| Delta Lakes have built-in schema enforcement by default. This saves you from accidentally corrupting your data. <img width="766" height="580" alt="image" src="https://github.com/user-attachments/assets/d9393101-9164-469a-9641-b51e55de4898" />
Schema Evolution | You don’t always know the exact schema of your final dataset. Input data may change over time, or you might want to add a new column for analysis purposes. When you need more flexibility in your schema, Delta Lake also supports Schema Evolution. | When you need more flexibility in your schema, Delta Lake also supports Schema Evolution. <img width="751" height="610" alt="image" src="https://github.com/user-attachments/assets/0857d181-3081-48fd-9a0e-fd30b519c39d" />
Data Operations | Many basic data operations are hard or inefficient in data lakes. The only data operation that’s easy in a data lake is appending data. Regular Parquet files are immutable. In order to make changes to your Parquet data lake, you will need to read in the whole file, make the changes, and then rewrite the whole file. This is an expensive operation. Immutability is a feature of Parquet files: it prevents you from accidentally corrupting your data.| Delta Lake gives you a nicer developer experience by making all data operations easy. Delta Lake supports data operations like dropping columns, renaming columns, deleting rows, and selectively overwriting rows that match a filter condition. Delta Lake gives you both more reliability and more flexibility than regular Parquet files. As we’ve already seen, ACID transactions via the transaction log give you production-grade reliability guarantees. Executing data updates is also much more efficient in Delta Lake because changes are logged to the transaction log. This saves you the computation and cost of reading and writing the entire file. <img width="781" height="452" alt="image" src="https://github.com/user-attachments/assets/0cb6299c-8a59-4651-8492-56b875b38be7" />

#### When should I use Delta Lake?
Data lakes are a good technology that give you flexible and low-cost data storage. Data lakes can be a great choice for you if:

1. You have data in multiple formats coming from multiple sources
2. You want to use this data in many different downstream tasks, e.g. analytics, data science, machine learning, etc.
3. You want flexibility to run many different kinds of queries on your data and do not want to define the questions you want to ask your data in advance
4. You don’t want to be locked into a vendor-specific proprietary table format

Data lakes can also get messy because they do not provide reliability guarantees. Data lakes are also not always optimized to give you the fastest query performance.

Delta Lake is almost always more reliable, faster and more developer-friendly than a regular data lake. Delta lake can be a great choice for you because:

1. Delta Lake supports transactions and schema enforcement, so it’s much less likely you’ll corrupt your table.
2. Delta Lake abstracts the file metadata to a transaction log and supports Z Ordering, so you can run queries faster
3. Delta Lakes make it easy to perform common data operations like dropping columns, renaming columns, deleting rows, and DML operations.

----
Yes, exactly. Delta Lake and Apache Iceberg are **direct competitors** — both are open table formats that solve the same problems.

### The Big Three Open Table Formats:

| Format | Created By | Year | Primary Ecosystem |
|--------|------------|------|-------------------|
| **Delta Lake** | Databricks | 2019 | Spark, Databricks |
| **Apache Iceberg** | Netflix | 2017 | Multi-engine (Trino, Spark, Flink, etc.) |
| **Apache Hudi** | Uber | 2016 | Spark, streaming use cases |

### They All Provide:
- ACID transactions
- Time travel / versioning
- Schema evolution
- Partition evolution
- Efficient upserts/deletes

### Key Differences:

| Aspect | Delta Lake | Iceberg |
|--------|------------|---------|
| **Engine support** | Best with Spark/Databricks | Truly engine-agnostic |
| **Cloud vendor support** | Databricks-centric | AWS, Snowflake, Dremio, etc. |
| **Hidden partitions** | No | Yes (partition evolution without rewriting) |
| **Transaction log** | JSON-based `_delta_log/` | Manifest files + metadata |
| **Adoption** | Strong in Databricks shops | Growing fast, especially multi-cloud |

### Choosing Between Them:
- **Delta Lake** → Best if you're all-in on Databricks/Spark
- **Iceberg** → Best for multi-engine environments or AWS-native stacks
- **Hudi** → Best for streaming-heavy, incremental ingestion workloads

**AWS** has strong native support for it.
----



### References
1. https://delta.io/blog/open-table-formats/
