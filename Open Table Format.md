# Open Table Format

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



### References
1. https://delta.io/blog/open-table-formats/
