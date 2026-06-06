# Types of lock-in

Item | Description 
--- | --- 
| Source |  Artile "Don't get locked up into avoiding lock-in" from Gregor Hohpe  
| Link | https://martinfowler.com/articles/oss-lockin.html 
| Motivation | I wish I could just mark the webpages and come back later to find the interesting bit. Since I am not aware of anything like this, I am taking notes in old fashion way for my reference.

## Types of Lock-ins
1. Vendor Lock-in: This is the most talked kind of lock-in. This describes the difficulty to switch from one vendor to another.
2. Product Lock-in: Like using OSS product like K8 but changing vendors like GCP, AWS etc. This will make sure that we using the same configuration.
  >  "When migrating from one vendor's product to another vendor's, you are usually changing both vendor and product, so the two are easily conflated."_

> "Heavy customization, integration points, and proprietary extensions are forms of product lock-in: they make it difficult to switch to another product, even if it's open source."_
5. Version lock-in: It is difficult to upgrade from one version to another.
> Besides being locked into a product, you may even be locked into a specific version. Version upgrades can be costly if they break existing customizations and extensions you have built (SAP, anyone?).

> Other version upgrades essentially require you to rewrite your application - AngularJS vs. Angular 2 comes to mind.
6. Architecture lock-in:
> You may also be locked into a specific kind of architecture. For example. when you use Kubernetes extensively, you are likely building small-ish services that expose APIs and can be deployed as containers.

> If you want to migrate to a serverless architecture, you'll want to change the granularity of your services closer to single functions, externalize state management, utilize an event-architecture, and probably a few more things.

> Such changes aren't minor, but imply a major overhaul of your application architecture.
7. Platform lock-in:
> A special flavor of product lock-in is being locked into a platform, especially cloud platforms. Such platforms not only run your applications, but they may also hold your user accounts and associated access rights, security policies, infrastructure segmentations and many more aspects.

> They also provide application-level services such as storage or machine learning services, which are generally proprietary. Staying away from these services might seem like a way to reduce platform lock-in but it'd negate one of the major motivations for moving to the cloud in the first place.

8. Skills lock-in: 
> As your developers are becoming familiar with a certain type of product or architecture, you'll have skills lock-in: it'll take you time to re-train (or hire) developers for a different product or technology.
> As skills availability is one of the major constraints in today's IT shops, this type of lock-in is very real.
> Some niche enterprise products have a particularly limited supply of developers, causing your cost for developers to go up. This effect is particularly visible for products that employ custom languages or, somewhat ironically, for “config only” / no-code frameworks.

10. Legal lock-in:
> You may be locked into a specific solution for legal reasons, such as compliance. For example, you might not be able to migrate your data to another cloud provider's data center if it's located outside your country. Your software provider's license may also not allow you to move your systems to the cloud even though they'd run perfectly fine.
> If you decide to do it anyway, you'll be in violation of licensing terms.

>  Legal aspects permeate more facets of engineering than we'd commonly assume: your small-engine air craft is likely to be powered by an engine that was designed back in the 1970s and burns heavily leaded fuel: new engine designs face high legal liabilities.

12. Mental Lock-in:
> The most subtle, but also the most dangerous type of lock-in is the one that affects your thinking. 

> After working with a certain set of vendors and architectures, you are likely to absorb assumptions into your decision making, which may lead you to reject alternative options. 
