# S3 Metadata Tables

Preview: 03.12.2024

GA: ?

Automatic metadata generation, accessible with simple SQL semantic.

Management Summary: S3 Metadata automatically generates metadata about the contents of a general purpose S3 bucket
and it stores that data in an Iceberg table in an S3 table bucket all in near real time.
<img width="748" height="424" alt="image" src="https://github.com/user-attachments/assets/fc3f4010-0c86-4bd4-a4c1-3c2501551b83" />

S3 tables is more then jsut the lsit of object, it include metadata about
1. Information about the storage class they are stored in
2. Modification date
3. ...

S3 metata is rich and always up-to-date
Metadata is always stored in the bucket that you own.
Since metadata is stored in S3 bucket then all the features of S3 i.e. query via Athena, combine wiht other analytics services, governance via the FGAC.
