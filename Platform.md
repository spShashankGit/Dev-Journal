| Item | Description |
| --- | --- |
| What | The Best Platform Strategies For Success! |
| Who | Gregor Hohpe |
|Where | Youtube - https://www.youtube.com/watch?v=fLZRk5vzMWY |

## What is a platform? 
Platforms are ways to standarise some aspects of your system, in a way that it boost innovation and diversity on top of that layer.

## Commong practise in IT
We we tend to have this challenge that the more we make something common the more we harmonize it.
The less flexibility we have on top.

## Why platforms are valuable ? 
Platforms have sort of this magical property that yes you can harmonize something you can make a common layer but on top of this layer you seem to have a lot of freedom so there's an important 

## Platforms are different from Abstraction?
Platforms are abstractions that actually work because finding good abstraction is actually very hard and on the chapter in the book (Platfrom Strategy, Chapter 21) is "Build Abstractions and not illusions". It is very easy to over-abstract and then important elements are hidden and that becomes dangerous illusion. You give people something is in a certain way while it is not.
e.g. RPC is like a local procedure call, it isn't as with distributed systems you have latency, does not have a call stack, it has different type systems, partial failures.
Good example of a platform: Operating System because it abstracts away lot of physical aspects that otherwise will be very tedious to deal with. But on top of it you build whatever you please.
OS do not seem to constrain you a lot.

Amazon and Microsoft have a large hand in providing the platform for the world to build on.

Platform standarising lot of things, making it available for innovation.
Underneath you have the scale effect.
Data centres, Global Network is huge invest. 
Magic on top is people who are on top do not have to think about it. Run the lambda for 1ms and pay 0.01 cent.

It world is fractal, lot of people are building platform in-house.
Luckily, they are not building from scratch, usually building on cloud, analytics or data platform.

They are feeling a bit of, 
Make better assumptions for your organisations. AWS, Google and GCP cannot do that for all the organisation at one place.

1. There is room for standarising processes and APIs.
a. These economics are different for you then a large provider.
b. Don't under-estimate how difficult it is to build these kind of things.

## Good in-house platform
Good in-house platform can narrow the variable for the in-house context. We are doing this thing, we do not need all that variance, therefore we can abstract just a little bit further.

Tricky:
a. Many cooks in the kitchen -> Securtiy is promised there is more compliance and constrains.
b. Developers are being promised that they are more productive.
c. Architects are promised that everything will follow common architectures and standards.
You need to be very careful whether one thing can really achieve all these different aspects that you are after.
e.g. We do not need for the whole world, however, this often start with setting default values.
DynamoDB database: We always have replications, less cognitive loads etc.
1000 piece puzzle, lets take 100 pieces away, makes it harder. **It is a good intention not a good abstraction.**

## Good abstraction 
a. Good abstraction will introduce a new vocabulary
b. It will life things in different domains like an operating system e.g: Read and write a file is called stream and or socket for Network. Not like disc sectors or magnetic encoding so we have a different vocabulary and this is an important part that is miss.

## Bad example again
1. Do not allow to use this AZ or 
2. Do not allow to use that service
and argument that you cognitive load went down because now you only choose form 3 AZ instead of 32.
This do not make developer life easier because they wanted to use the service that you just disabled.

Getting this fine-line right is more involved then you generally aspects.
This is one of the anti-pattern: lot of org platform engineering, that they beieve they understand cloud infrastructure and try to hide the use of cloud infrastructure wihtout adding any of those extra constraints or abstractions in any meaningful way. They are just doing the configuration for the team. This do not seem like a sensible use of this light approaches. They are just doing the configuration.

Organisation sit underneath other stuff, that is the infrastructure and organistaion team. Isn't this the right place to make the platform? 
Chapter IT services and Platform are antonyms, they are opposite of each other. Same team will make platform as a classic IT service. Like I need a virtual machine, I need a container or etc.
Some ticketing sysetem kicks-off and after sometinme a container runtime comes out but this is not a platform.

Ticketing system is not the way to go.

To build a platform you need to understand what a problem domain of what the system taht you are building very well. 
Key word is "Domain".

## Test for platform
Unlike other commong layers, Platforms do not try to anticipate all use cases.
Business platforms, here is core of all insurance and he is country specific insurance thing and here for the product, make a few configuration setting a,b,c. SOunds really good on powerpoint, but do not work at all. The assumption is that you know all the needs of all the users upfront and you can go build exactly that.

Test: Have people build something that you have not anticipated? If yes, all good. 
If not, then you are not the right level, and you are falling back into the old model of I am smarter then everybody else so I try to anticipate all their needs and if we put them in this layer then they have to do almost nothing.

The way to get there: Domain is very important.
Financial servies industry customer: When they write to DB they need to have a ledger, say why Gregor has 10Billion dollard, well here is the whole history.
That is specific to financial services, this is a ledger. This is something they use in their business domain. They use Dynamodb and Dynamode stream and define a serive called ledgered database. This is dynamodb with setting that is closer to their businss domain. 
Lifting it into technical-business domain is really what a platform can provide a lot of value.

This is a part of good software design. You need to understand the problem that you are trying to solve really well, whether it is a technical problem or whether it is a business problem. You need to focused on sovling this problem then having a random collection of tools. 100%

> Lot of organistaion fall into the trap of we do not have good developers lets build a platform to get better productivity out of current developers. To build a platform you need even smarter developers which you might not have and then this whole things goes in a downward spiral. Need a very good software engineering discipline to even think about something like this.
> b. platform sits underneath the development, people think it has to be something very very technical but the example of FS is not technical but it is closer to the domain that IT organistaion is operating in.
> This works much better, so even thought the platform sits underneath the concepts should express actually be higher level concepts. There folks stumble a lot especially if it runs out of an infrastructure team. They will not know the business domain well enough to make platform that has real abstractions that represent business need from that domain.


Sinking vs floaring platform -> Genuine need that cloud do not include, fully integrated CICD pipeline, on prem, build on last.
Provider do not stand still, uptill now ever provider has fully CICD tool, build tools, source repos etc.
Going under water: Base platform is growing, if your platform doesn't evolve then you are duplicating something. Catch is:
1. You have users on the existing plaform should also do new things you have migration
2. You have investment in the existing platform so mgmt will say where is my return if you throw this away who is gonna pay for this, because we have multi-year recovery horizon.
3. Boat vs Submarine

Architecture as an option process.
Boat vs Sumbarine is techno-economic decision.

You have taken the high-rode of software engineering and architecture. Lot of the time we give the advice you should be a good architect or a good engineer. You have maneuvered yourself into a field which is less forgiving. You have internal customers, you have people on top of it, you have published interfaces, you have different economics, propolled youself into storm. The bar you set for yourself is very high.

> Platforms are amongst the most valuable ideas in terms of structuring large scale systems and at the same time the most difficult things to do well. This is the peak of good architecture and good engineering.
Greogr: Who wants themselved without printer drivers and a decent operating system, who want to go back to time when you cannot run code into the cloud servelss wihtout doing much anything.
This can work internally very good internally if you understand your domain well.
If you have good discipline you can make assumptions that other people cannot you can increase productivity you can harmoize and at the same time boost innovation.
