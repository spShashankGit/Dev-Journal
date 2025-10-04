# Notes

Disclaimer: These notes are written so that I can refer to them at later stage without having to traverse throught the podcast and/or youtube videos.

1. Personal productivity is very important to understand quickly the type of architecture.

1. Non-obvious tip: Extreme ownership, which means do not stop at the boundry of your team rather go out of the way and understand how the dependencies are with other teams and systems.

1. It is important to differentciate deployment form release. That is deploy the code but it behind the feature file. Next step, is to turn-on the feature flag only for your users and then you can roll-out slowly.
> This simple approach works wonder in terms of providing stability.

1. Regulatory companies have usually a development environment, a staging environment, optionally a user-testing environment and finally the production environment.
Pros and cons

This is different at uber. Uber has the concept of tenancies. This means uber will run the same code everywhere but then uber will have a test tenency and feature flags.
Pros and cons

1. You need both i.e. deploy an instance of your code, route traffic with tenancies and you need a staging environment, a staging environment and a pre-prod where it is much more stable and you open an incident if something is broken.
1. The argument is the earlier we detect the problem the better because it speeds up the process. 

1. Annectode: A user reported the incident on social media. CAD was mas that there was no intneral system that could flag this and we had to learn failure of our system from a customer over social media.

1. Three matrix to track: Time to detection, time to mitigation, time to resolution.
Time to mitagation, most important, because it means how long does it take for us to bring the system to the state that the customer doesnt see the impact. Resolution goes after.

1. Detecting at uber is easiest because the volume of request is high and if something break then there should be some kind of monitoring that will detect it.

1. Automation topic is dear to CAD. He mentions the an artile titled "Ironies of automation".
+ Sometimes when we automate we replace user error with design automation error.We lack context, we don't understand how the software or the process is used. So when we automate, we put in the wrong automation.
+ We cannot automate everything so we automate the easiest part and leave the most difficult part to the user to perform.

What can you do to fix this?
1. Do the process manually, so that it gives you the business context or product context or operational context. Like start-up do things first that do not scale.
2. Tranparency, so many automations especially in developer context are doing a lot of things. As a result you do not see anything and then when something breaks you are left to debug

1. The best way to know about the system is to see the incidents. This will tell you where are the bottlnecks and what are the services that are under pressure.

2. Insight: CAD also exoerienced that when there are lot of incidents coming in there is almost always fire-fighting mode on. This means patching the software and seldom fixing the underlying architecture.
Eventually when the noise dries down it is 

When they were hiring at lage scale what worked is that build up relationship with the recruiter which means they had weekly check-in where they are telling what kind of candidates they are looking for and the recruiters will tell what kind of cohot or companies they are looking to target.
Anentode: Hearing some news from the company so maybe people from there are open for offer.
Anectode 2: HM says we are have tech stack in python, nodejs and a bit of a java etc. 
Recruiter says: Oh so you are looking for someone with experience in these three languages and
HM: oh no, language doesn't matter we are looking for experienced professional.

Tipe for interview training:
1. You shadow the inteview and give feedback.
2. You reverse shadow the interview i.e. you drinve the interview and feedback is provided to you.

Refernece:
1. High Ghowth Startups: Uber and CloudKitchens with Charles-Axel Dein, https://www.youtube.com/watch?v=bM0Wq7aLd5w, accessed on 04.10.2025