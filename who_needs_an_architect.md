# Who Needs an Architect?
Author: Martin Folwer\
Source: Article titled "Who needs an Architect?" [1]

> I think that one of an architect’s most important tasks is to remove architecture by finding ways to eliminate irreversibility in software designs. - Pg 3

> Let’s forget the developers who just understand their little piece. Architecture is the highest level concept of the expert developers.

### Architecture
> “In most successful
software projects, the expert developers working
on that project have a shared understanding of the system design. This shared understanding
is called ‘architecture.’ This understanding
includes how the system is divided into
components and how the components interact through interfaces. These components are usually composed of smaller
components, but the architecture only includes the components and interfaces that
are understood by all the developers.”


### IEEE definition of an architect
>  “the highest level concept of a system in its environment. The architecture of a software system (at a given point in time) is its organization or structure of significant components
interacting through interfaces, those components
being composed of successively smaller components and interfaces"

### Martin Folwer's definition of the Architect
> Architectus Reloadus is the person who makes all the important decisions. The architect does this because a single mind is needed to ensure a system’s conceptual integrity, and perhaps because the architect doesn’t think that the team members are sufficiently skilled to make those decisions. Often, such decisions must be made early on so that everyone else has a plan to follow.

### Day to Day Architect Job
> Architectus Oryzus is a different kind of animal (if you can’t guess, try www.nd.edu/~archives/latgramm.htm). This kind of architect must be very aware of what’s going on in the project, looking out for important issues and tackling them before they become a serious problem. When I see an architect like this, the most noticeable part of the work is the intense collaboration. In the morning, the architect programs with a developer, trying to harvest some common locking code. In the afternoon, the architect participates in a requirements session, helping explain to the requirements people the technical consequences of some of their ideas in nontechnical terms—such as development costs.

### One of the important activity of an Architect
> In many ways, the most important activity of Architectus Oryzus is to mentor the development team, to raise their level so that they can take on more complex issues.
>  Improving the development team’s ability gives an architect much greater leverage than being the sole decision maker and thus
running the risk of being an architectural bottleneck.

### Rule of thumb
> This leads to the satisfying rule of thumb that an architect’s value is inversely proportional to the number of decisions he or she makes.

### Another Metaphor for an Architect
> I’ve heard so far: guide, as in mountaineering. A guide is a more experienced and skillful team member who teaches other team members to better fend for themselves yet is always there for the really tricky stuff.

### Prime driver for the complexity
> "One aspect I found particularly interesting was his comment that irreversibility was one of the prime drivers of complexity."
> He saw agile methods, in manufacturing and software development, as a shift that seeks to contain complexity by reducing irreversibility as opposed to tackling other complexity drivers.
> I think that one of an architect’s most important tasks is to remove architecture by finding ways to eliminate irreversibility in software designs.


### Difference between building architecture and software architecture
> One of the differences between building architecture and software architecture is that a lot of decisions about a building are hard to change. It is hard to go back and change your basement, though it is possible.
> There is no theoretical reason that anything is hard to change about software. If you pick any one aspect of software then you can make it easy to change, but we don’t know how to make everything easy to change. Making something easy to change makes the overall system a little more complex, and making everything easy to change makes the entire system very complex. Complexity is what makes software hard to change. That, and duplication.
> My reservation of Aspect-Oriented Programming is that we already have fairly good techniques for separating aspects of programs, and we don’t use them. I don’t think the real problem will be solved by making better techniques for separating aspects. We don’t know what should be the aspects that need separating, and we don’t know when it is worth separating them and when it is not. Software is not limited by physics, like buildings are. It is limited by imagination, by design, by organization. In short, it is limited by properties of people, not by properties of the world. “We have met the enemy, and he is us.”


## Reference
[1] [Who needs an architect?](https://martinfowler.com/ieeeSoftware/whoNeedsArchitect.pdf) by Martin Fowler \
[2] Evodb(http://martinfowler.com/articles/evodb.html)  - Allow us to change the schema of the database and migrate the data to the new schema. 

## Next topic to explore
1. ~~Aspect-Oriented Programming~~ ✅ [Completed](aspect-oriented-programming.md)
