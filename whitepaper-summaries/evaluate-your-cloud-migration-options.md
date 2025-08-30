How to evaluate your cloud migration options?

Framework: Up or out
Claim: The frameowrk are devised after speaking with CIOs, CTOs and their technical staff. 

Why choose cloud? 
> The cost and business pressures facing IT organizations
today focus attention on value and adopting approaches
which allow focus and effort to be spent on the real jewels
of the organization—the data and services which power
insight and valuable outcomes.
Responsibilities on the organisations and thereby on teams is to make very good use of the time they gain due to offloading infrastructure manegement to cloud. Otherwise one can fall into the trap of "good times make weak people"

Insight: 
> Additionally, many enterprises rely on geographically distributed compute capacity and data storage that can’t be simply centralized into a single cloud data center. For example, most retail or manufacturing businesses have a significant IT footprint in branches or plants due to latency considerations or to assure continued operations in case of a network failure. 

> <img width="922" height="451" alt="image" src="https://github.com/user-attachments/assets/0e17f251-38a7-4979-a479-02bf6f4d4ada" />

## Up 
> One choice you can make is to move your applications up the
stack, and this doesn’t necessarily imply a migration out onto a
cloud provider’s environment. As an initial step, you can
transition from running monolithic applications on dedicated
servers or virtual machines.

> Moving up the stack has several advantages:
-  Application deployment becomes automated, making it
easy to add or subtract capacity as needed, as well as
accelerating feature velocity.
- Operations also become more resilient because new
instances can be rapidly deployed in case of failure,
allowing Platform-as-a-Service or serverless platforms
to withstand a server failure without visible customer
impact.
- Thanks to smaller deployable units, hardware can be
more efficiently utilized, thus reducing run costs.
- Lastly, applications become more portable when they
are better isolated from infrastructure details, as their
containers may be deployed on a variety of
infrastructures. This paves the way for a hybrid cloud
scenario that provides a consistent service execution
environment across the entire estate, including cloud
vendors, on-prem data centers, branch locations, and
remote devices.

> Trade-off
> On the flipside, moving up the stack requires you to fundamentally change the way in which you build applications and operate the infrastructure that supports them. This doesn’t necessarily mean that you must migrate out into the cloud. Products like Anthos allow you to pursue service-centric cloud-native architectures even for workloads which must remain on-premises. 

## Out
> The second option is to lift, shift, and replatform existing applications largely unchanged out into the cloud, for example by moving virtual machines to Compute Engine or by replacing on-premises data archiving with cold-line Cloud Storage. Shifting workloads in the cloud can be simplified and even automated, for example by using tools like Migrate for Anthos.
> Advantages
> several advantages:
- Better economies of scale allow for more cost-efficient
operations
- Automated patching discipline improves security
because it assures that no software with known
vulnerabilities is run
- Increased transparency enables more efficient IT asset
management, for example by rightsizing servers or
detecting and retiring unused IT assets
- Ease of emerging technology adoption like machine
learning
- Improved security and access capabilities
- Enhanced resilience

### Migration to cloud (out) is similar to migration to Saas (up)
> Moving out into the cloud transforms how an enterprise operates and acquires IT infrastructure from an asset-based model to usage-based model. This transformation isn’t quite so stark, however.
>Similar to transforming application architectures to move ‘up’ the stack towards cloud-native systems and services architecture, moving ‘out’ into the cloud can be seen as a progressive transformation toward cloud-centric operations.

### Migration Step 1
> Lifting existing applications and replatforming them onto cloud infrastructure minimizes initial effort,
avoiding the costs of redevelopment, and allowing an enterprise to transform its infrastructure acquisition and scaling processes while minimizing impact to existing operations models.

> Adjusting operations models to increase the use of automation and cloud-native tooling accelerates the overall transformation and maximizes the value from abstracted infrastructure services.

> Finally, decomposing application elements to take advantage of managed cloud services, such as migrating off of self-managed MySQL databases onto provider-managed Database-as-a-Service, requires some additional effort but lays the foundation for focusing engineering effort on truly precious resources: the data and insights generated rather than the databases and analytics platforms themselves. 

> Not only is combining up and out allowed, it’s encouraged. We think of it as a cloud-native hybrid model, where applications are deployed as containers or functions and can be easily shifted and shared from on-premises to the cloud as needed, all while maintaining a consistent deployment, run-time, and management framework.

### Question list
> 1. Which elements of an application or service would benefit most from an event-driven, serverless approach?
2.  Which elements of a service require rapid code releases or the ability to validate new features using A/B testing (meaning that a new version of the software is made available to a percentage of users)?
3.  Which elements change infrequently, but would benefit from automated scaling and deployment?

> With the answers to these questions, you can begin to decompose workloads (if amenable) and map them against the up or out framework, thus presenting the organization with a pragmatic migration approach that maximizes value.

## Applying the model
### Case Study 1: Retailer Enterprise
Front-end was moved-up and out quickly because it requires frequesnt feature updates to be ahead of the competitior. 
The retailer chose to move the application up and out to cloud, implementing A/B testing and an automated CI/CD pipeline to deploy the cloud-native applications to Google Kubernetes Engine (GKE).
<img width="289" height="229" alt="image" src="https://github.com/user-attachments/assets/d44c9d09-0ec6-40dc-ab6e-05458cf596da" />

> The retailer’s mid-tier application processing also stood to benefit from refactoring and re-architecting over time, but they determined they could generate more immediate value by shifting to an automated scale-out model and gaining operational efficiencies in the cloud.
<img width="290" height="231" alt="image" src="https://github.com/user-attachments/assets/ee40780c-3615-4e9d-b231-1ca43cfb480e" />

> The retailer’s back-end catalog systems change quite rarely and were hosted on well-understood and easily maintained systems. To focus their initial energies, they decided to keep these systems in place until they can replace them completely in the future.

> Taking this approach allowed the retailer to minimize the time and effort required to accomplish their primary goal—rapid iteration of a customer experience that was becoming stale. They also gained operational and capital efficiencies and set themselves in a good position to migrate their catalog data to the cloud when the time and price are right for them.
<img width="345" height="254" alt="image" src="https://github.com/user-attachments/assets/226ba4ad-6ce6-4fe7-bd04-4b704b64da85" />

### Case Study 2: Enterprise 2 - Saved on licencing cost by up and out freamework
> Enterprise seeing accelerated growth within their data warehouse and is confronted with consistent and significant increase in licencing costs.
>In addition, it may be increasing investment in engineering and hardware costs to support the data warehouse. Here too, up and out is a useful framework.

### Migrating Hadoop -> Google Compute Enginer
> One enterprise we worked with chose simply to move out into the cloud, migrating their existing Hadoop farm onto Compute Engine. Doing so allowed them to shift resources away from the internal facilities, networking, and compute capacity necessary to support their rapidly expanding data warehouse. By taking this approach, they chose to retain the engineering and operational burden of deploying and maintaining the data warehouse platform itself, thereby avoiding disruption within the data analysis tool chain.
<img width="261" height="201" alt="image" src="https://github.com/user-attachments/assets/5a8fdbf2-c481-4443-a6ba-d67523d1ef64" />

### Data warehouse -> Big Query
> Another retailer chose to move both up and out, migrating from their on-premises, self-managed data warehousing solution to adopt BigQuery, Google’s managed cloud data warehouse solution. Taking this approach allowed the retailer to shift their focus away from managing the infrastructure, systems, and licenses responsible for hosting and analyzing their data. The infrastructure was no longer the precious resource—the data was. As a result, the engineering resources once focused on building and operating the data warehouse where now enriching data and enabling business functions across the retailer to get the most value from the retailer’s data. Furthermore, the engineering team responsible for maintaining the data warehouse was now able to expand its scope, exploring and applying machine learning models on their data to deliver value.
<img width="273" height="217" alt="image" src="https://github.com/user-attachments/assets/2fa37224-1adf-4cc2-98f9-dc1c783f2c4d" />

> Simple but evocative frameworks like ‘up or out’ can help IT decision makers navigate the inevitable complexity of a cloud migration. **Like any good model, simplicity is a feature, not a bug, as it helps keep the focus on the desired outcome and is easily communicated to a variety of audiences**. When planning a cloud migration, plotting a path for individual workloads and architectural elements on the up or out framework helps IT decision makers focus on the benefits achieved by re-platforming, re-architecting—or a combination of the two. It also depicts how a migration is accomplished over time in an approachable manner that can be shared with a wide audience in both business and IT. 

> Insight:
> It’s typical and in fact desirable for different workloads or even individual elements of a system to take unique paths to the cloud.

# Reference
1. Google Cloud Whitepaper titled "Evaluate Your Cloud Migration Options" - [link to the paper](https://cloud.google.com/resources/understanding-cloud-migration-frameworks-whitepaper)
