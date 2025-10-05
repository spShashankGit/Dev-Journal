# Video Notes

**Disclaimer:** These notes are written so that I can refer to them at later stage without having to traverse throught the podcast and/or youtube videos. Most of the insights are either talked about in the video or in one of their use blogs or shownotes.

## Personal Productivity
1. Personal productivity is very important to understand quickly the type of architecture.
2. Investing early on in Personal productivity is a good idea because it pays rich dividens (compounded).
3. Have a good process for keeping youself up-to-date with what's going on in the industry.
Charles tries to read in total of 1 hour per day, usually reading engineering articles ever day. 
When he finds a new classic article he adds that to the repository.[2] 🚀

3. **Non-obvious tip:** Extreme ownership, which means do not stop at the boundry of your team rather go out of the way and understand how the dependencies are with other teams and systems.

## Deployment strategies
1. It is important to differentciate deployment from release. That is deploy the code but it behind the feature file. Next step, is to turn-on the feature flag only for your users and then you can roll-out slowly.
**This simple approach works wonder in terms of providing stability.**

1. Regulatory companies have usually a development environment, a staging environment, optionally a user-testing environment and finally the production environment.


2. This is different at uber. Uber has the concept of tenancies. This means uber will run the same code everywhere but then uber will have a test tenency and feature flags.

3. You need both i.e. deploy an instance of your code, route traffic with tenancies and you need a staging environment, a staging environment and a pre-prod where it is much more stable and you open an incident if something is broken in prod.
1. The argument is the earlier we detect the problem the better because it speeds up the process. 
**Annectode**: A user reported the incident on social media. Charles was mas that there was no intneral system that could flag this and we had to learn failure of our system from a customer over social media.

## When it comes to tracking performance of a system
1. Three matrix to track: 
    + Time to detection, 
    + Time to mitigation, 
    + Time to resolution.

**Time to mitagation**, most important, because it means how long does it take for us to bring the system to the state that the customer doesnt see the impact. Resolution goes after.

**Time to Detection**, Detecting at uber is easiest because the volume of request is high and if something break then there should be some kind of monitoring that will detect it.

## Automation
Automation topic is dear to Charles. He mentions the an artile titled "Ironies of automation"[3].
1. Sometimes when we automate we replace user error with design automation error.We lack context, we don't understand how the software or the process is used. So when we automate, we put in the wrong automation.
2. We cannot automate everything so we automate the easiest part and leave the most difficult part to the user to perform.

### What can you do to fix this?
1. **Do the process manually**, so that it gives you the business context or product context or operational context. Like start-up do things first that do not scale.
2. **Tranparency**, so many automations especially in developer context are doing a lot of things. As a result you do not see anything and then when something breaks you are left to debug

3. The best way to know about the system is to see the incidents. This will tell you where are the bottlnecks and what are the services that are under pressure.

4. **Insight**: Charles also experienced that when there are lot of incidents coming in there is almost always fire-fighting mode on. This means patching the software is priority and seldom it happens that team fix the underlying architecture.
Eventually when the noise dries down it is important to fix the root-cause of the problem.

## 
When they were hiring at lage scale what worked is that build up relationship with the recruiter which means they had weekly check-in where they are telling what kind of candidates they are looking for and the recruiters will tell what kind of cohot or companies they are looking to target.
**Annectode**: Hearing some news from the company so maybe people from there are open for offer. This is a sign that recruiters use to find/reach-out to the candidates.
**Annectode 2**: Hiring Manager(HM) says we are have tech stack in python, nodejs and a bit of a java etc. 

Recruiter says: Oh so you are looking for someone with experience in these three languages and

HM: No, language doesn't matter we are looking for experienced professional.

### Tips for training the interviewer:
1. You shadow the inteview and give feedback.
2. You reverse shadow the interview i.e. you drinve the interview and feedback is provided to you.
**Note:** One can become great interviewer with feedback and with on the job training.

## Sign that the company is going through the hyper-growth phase:
You are hiring a lot and there are things breaking left and right. The team who needs the help most are the one who are affected by the interviews the most.

## Sign that the company is out of the hyper-growth phase:
Okay, now I actually have time to look at this systematically and fix and build a system that I am pretty happy with not necessarily a second system from scratch, this is rearely a good idea.

## What can you do when you are feeling overloaded?
1. Personal productivity is important for Charles, he has invested a lot. Book he read was getting things done.
2. The earlier you invest in your personal productivity, the mode dividents it will pay (compounded).
3. Principal, divide and conquer: You need to find people that take-over some of the topics from you. Tech lead a project for instance.

4. Charles when asked Gergely (Pragmatic Engineer) to become the lead he specifically asked "I want to you to lead the project"
### Ideas for checking on the topics that you have handed-over
1. Charles will check-in with Gregely once a week and if something comes up before that let me know.
2. Here is the plan etc.
3. Bottom line: Charles was very methodological in his approach and people appreciated that he was specific, they find it was nice for them to showcase their capabilities and finally they understood that the situation is such that manager has left Charles has got more responsibility and he cannot do everytghing by himself so he has to distribute.

**Advice:** One of the manage of Charles said that the most powerful expression that you can tell to somebody is __"I need you help"__. 
The employee also feels empower to make decisions.
When you hand over responsibility to someone, then you expect them to drive the poject and one in a while you will hear some incidents and this is completely fine. 

**Leadership Advice**: Charles: Best way to learn is to make mistakes. If you want to invest in your own people, you have to let them make their own mistake.

One other important thing to keep in mind for personal productivity is to: have a good process for keeping youself up to date with what's going on in the industry.
Charles tries to read in total of 1 hour per day, 
i.e. engineering articles ever day. When he finds a new classic article he adds that to the repository. [2] 🚀
He has been doing that for last 15 years or so.

### What are the sources of good articles?
1. RSS feed of top-10 articles of the day?
2. Then he checks because there is a diamond that don't necessarily makes it to the top.
3. Good newsletter e.g. bytes for front-end engineers is very good and hilarious.
4. Newsletter from the programming language like Python, Java, CK etc software tech leads as well.

## Story of a stand-out software engineer
Traits of a typical good engineer
1. **Shipping** Many seniors do meta work,reviewing RFCs, attending meetings, influencing this, strategising that. It is difficulat to understand what is going on.
Focus on building, shipping value, being creative, being an expert in your programming language, in system architecture
Staff and senior staff levels holds true at this level too.
CloudKitchens expect staffe engineers to really find creative ways to speed up execution or achieve a 10x improvement in quality. Not only reviewing RFC's or attending meetings.

2. **Lifting:** Lifting people around you. We are knowledge workers so you have train people around you, you have to give a hand, you have to help, you have to have a good attitude. The best engineers Charles has work with has this amazing attitude of ownership i.e. taking a problem and not stopping at teams boundaries for instance seeing the problem in mobile app, going to API Gateqway and see problem is not there, and then looking at backend and then ship a fix.

3. **Humour**: A little bit of self-depricating humour, it is hard to get an ego.

4. Good engineer has **structure and method** in place to start fixing problem, it starts with observability matrix. Example, everyone is looking at system a that problem is here and there is another engineer who checks and says we are looking into wrong repo, the problem is in system B. Goes back to shipping.
You can only do that if you keep youself close to the code.

## Importance of reading over doing?
How to balance this?

You are confronted wiht this topic, you are in doing mode i.e. you need to get the results. If you get the book from shelf and start reading it, people usually do not see that super well.
**Outside of work:** Read a book about the fundamentals of the topic you are confronted with. Because when you are trying to make things work, you are missing the fundamental of this topic and if you add that it will unblock you and considerably speed up the process.
Reading and doing goes hand-in-hand and you have to do both.

## Book recommendation: 
1. Complication, Surgeon, it is about how do you learn from your mistakes. And hwo to have a scientif process to learn from those mistakes.
https://www.amazon.de/-/en/gp/product/1846681324/ref=ewc_pr_img_1?smid=A3JWKAKR8XB7XF&psc=1

2. Aviation incident postmortm: 

## Github repo
How did the repo started Wanted to automate the process of giving people feedback and sending them to certain good articles.
Start compiling list of articles, articles are are considered as classic articles on the topic.

T-Shaped graph: Rake i.e. go over different topics.

_______________________________
## References:
1. High Ghowth Startups: Uber and CloudKitchens with Charles-Axel Dein, https://www.youtube.com/watch?v=bM0Wq7aLd5w, accessed on 04.10.2025


2. Charle's repo: professional-programming, https://github.com/charlax/professional-programming/tree/master, accessed on 04.10.2025

3. Ironies of Automatio, https://ckrybus.com/static/papers/Bainbridge_1983_Automatica.pdf, accessed on 05.10.2025