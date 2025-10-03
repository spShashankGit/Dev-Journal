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
3. 

Source:
https://blog.bytebytego.com/p/service-discovery-101-the-phonebook