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

# Good in-house platform
Good in-house platform can narrow the variable for the in-house context. We are doing this thing, we do not need all that variance, therefore we can abstract just a little bit further.

Tricky:
a. Many cooks in the kitchen -> Securtiy is promised there is more compliance and constrains.
b. Developers are being promised that they are more productive.
c. Architects are promised that everything will follow common architectures and standards.
You need to be very careful whether one thing can really achieve all these different aspects that you are after.
e.g. We do not need for the whole world, however, this often start with setting default values.
DynamoDB database: We always have replications, less cognitive loads etc.
1000 piece puzzle, lets take 100 pieces away, makes it harder. It is a good intention not a good abstraction.
