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


### References
1. https://delta.io/blog/open-table-formats/
