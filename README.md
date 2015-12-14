Info about my app about MTA elevator/escalator outages

Technology Used: MEAN stack - MongoDB stores user accounts. Express and Node.js for server and AngularJS for front-end rendering and routing. External APIs - pulling data from external XML feed.

User Stories: The purpose is to be helpful for those with limited mobility - seniors/people with injuries/people with strollers. People who can climb up/down one flight of stairs but will find it difficult to climb up/down many more flights of stairs. If they know that the elevator/escalator is out of service, then they can use another station or the bus, or they can travel when the equipment is back in service.

How to Use: The bulk of the application is the Angular route, if you click on show notifications without logging in - you can search outages by borough, train line, search query or full list. You can also access the full list of outages on the front page. TBD - I think I'll change the user account route - currently you can save an email/password and which train you want to receive outage notifications, but I haven't set up Nodemailer yet. When I transform this into a mobile app, I may get remove the user account option.

Random Notes about Development:
Received a developer key from the MTA but didn't use since that is necessary for real time train tracking info.

MTA feed is returned in XML, not JSON. Learned a lot here... out of necessity! Took me a long time to figure out a way to overcome the Cross Origin Request Error (CORS). Matt Huntington explained I should make a server-side call to the MTA XML feed via my server, and then send that info to a route on my site, and then make an AJAX request to my own site. This took a while for me to figure out! I wanted my code to be more Angular and less jQuery so I first Angularized it by using a $http request instead of a $.get. Then I used a plugin to convert XML to JSON, which Angular works well with.There was definitely a learning curve, but glad I was able to get a deep understanding of Node, CORS and XML through all my time trying to udnerstand this!

Used bcrypt to hash my passwords, for the first time in a MEAN app.

Filtered appearance of words using Angular custom filters and regular JS functions