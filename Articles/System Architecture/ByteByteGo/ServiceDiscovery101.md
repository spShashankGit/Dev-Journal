Disclaimer: This is just my notes, the original article is linked below. I am writing my notes here so that I can refer to them later.
I have not figured out a way to highlight the text on a website permanently and search through them when needed, hence building up this library for myself on github.

# Service Discovery 101: The Phonebook for Distributed Systems

For food delivery App to work, the App needs to know:
1. The currently open restaurants
2. Where restaurants are located
3. Are they accepting orders?
4. How busy they are?

Critical information path that the app needs to know immediately:
1. If the restaurant closes early or 
2. Temporarily stop accepting orders due to high demand


Current system applications have many similarities to a good ordering app:
1. Instead of reastaurants we have services
2. Instead of checking if the restaurants are open, we need to check if the service (e.g notification) is healthy and responding.
3. Insteasd of finding the nearest restaurant location, we need to find which service can handle the request with lowest latency.
4. Just as food app will fail if we send the request to a closed restaurant similaryl the application will fail if th request is trying to communicate to a service at an oudated address or send request to unhealthy instances.

> In today's cloud environment, applications are commonly broken down into dozens or even hundreds of services. 
> These services run across a dynamic infrastructure where servers appear and disappear based on traffic, containers restart in different locations, and entire service instances can move between machines for load balancing.

> The key questions is how to all these services find and communicate with each other in this constantly shifting landscape?

Queston:
1. What are the different types of load balancers?
2. How often do containers restart in cloud and in distirbuted server? 
3. How much does it cost to rent a server fractionally in USA, Germany and/or India? 


https://substackcdn.com/image/fetch/$s_!CEQb!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F30caf720-4b66-4f5f-84d2-72c578969944_2250x2624.heic


Source:
https://blog.bytebytego.com/p/service-discovery-101-the-phonebook