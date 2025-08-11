# AWS Roles vs Policies: Understanding the Difference

## Overview
AWS Identity and Access Management (IAM) uses two key concepts to control access to AWS resources: **Roles** and **Policies**. While they work together, they serve different purposes in the security model.

## What are IAM Policies?

**IAM Policies** are JSON documents that define permissions. They specify:
- **What** actions are allowed or denied
- **Which** resources can be accessed
- **Under what conditions** access is granted

### Key Characteristics of Policies:
- Written in JSON format
- Define specific permissions (Allow/Deny)
- Can be attached to users, groups, or roles
- Are the actual permission definitions

### Example Policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
```

## What are IAM Roles?

**IAM Roles** are identities that can be assumed by entities (users, services, applications). They:
- Don't have permanent credentials
- Provide temporary security credentials when assumed
- Define **who** can assume them and **what** they can do

### Key Characteristics of Roles:
- Can be assumed by AWS services, users, or external identities
- Have trust policies that define who can assume them
- Have permission policies attached that define what they can do
- Provide temporary credentials (STS tokens)

### Example Role Trust Policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

## Key Differences

| Aspect | Policies | Roles |
|--------|----------|-------|
| **Purpose** | Define permissions (what can be done) | Define assumable identities (who can do it) |
| **Attachment** | Attached to users, groups, or roles | Assumed by entities |
| **Credentials** | N/A (just permission definitions) | Provide temporary credentials |
| **Use Case** | Permission management | Cross-service access, temporary access |

## How They Work Together

1. **Roles contain Policies**: Roles have permission policies attached that define what the role can do
2. **Trust Policies**: Roles have trust policies that define who can assume the role
3. **Assumption Process**: When an entity assumes a role, it gets temporary credentials with the permissions defined by the role's attached policies

## Common Use Cases

### Policies:
- Granting specific permissions to users
- Creating reusable permission sets
- Implementing least privilege access

### Roles:
- EC2 instances accessing S3 buckets
- Cross-account access
- Lambda functions accessing DynamoDB
- Temporary access for external users (federation)

## Best Practices

1. **Use Roles for Services**: Always use roles for AWS services instead of embedding credentials
2. **Least Privilege**: Both roles and policies should follow least privilege principle
3. **Separation of Concerns**: Use policies to define permissions, roles to define assumable identities
4. **Regular Review**: Regularly audit both roles and policies for unused permissions

## Example Scenario

**Scenario**: An EC2 instance needs to read from an S3 bucket

**Solution**:
1. Create a **Policy** that allows S3 read access
2. Create a **Role** with:
   - Trust policy allowing EC2 to assume it
   - The S3 read policy attached
3. Attach the role to the EC2 instance
4. EC2 assumes the role and gets temporary credentials with S3 read permissions

This demonstrates how policies define the permissions while roles provide the mechanism for entities to assume those permissions securely.