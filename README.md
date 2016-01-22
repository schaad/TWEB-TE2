# TWEB-TE2
##Decription

[Heroku](https://shrouded-plains-93178.herokuapp.com/#/stats)

This web application is created to display visually the number of commit per week during the last year on one or more repository. 

![](https://raw.githubusercontent.com/schaad/TWEB-TE2/master/img/ScreenShotApp.JPG "")

To display a repository you must type the owner of the repository followed by a `/` and then the name of the repository itself.

>     Owner/RepositoryName

The application work on the following principle :

When a user enter a reporitory, the name is transmitted to the server side with socket.io and the server will make a authenticated (client_id, client_secret) request through GitHub API. When all the response is received by the server side, it will be transmitted to the client who will made the transformation to display the chart. 

##Known issues
* Sometime the GitHub api send an empty response even if the request is correct. It cause for our application to don't display any additionnal line in the dotchart. Repeat the request by pressing again the `+` button will generally retreive a correct response. 
* The heigth of the *svg* pannel created by gRaphael is fixed and can't be enlarged. It cause to hide some lines when too much repositories are displayed.
* Displaying label with name of the repository next to the line in the dotchart will cause to hide the rest of the line. To prevent this, only the value is displayed next to the line and the repository name is provided below the chart with Angular.
* Naviguate between pages when some repositories are displayed can cause an unexpected behavior if you try to come back on the *Stats* page. To prevent this you must refresh the page.   

##Used tools
* __GitHub API__ to retreive GitHub data
* __socket.io__ to communicate between server and client side
* __raphael.js__, __g.raphael.js__, __g.dot.js__ to display the dotchart
* __Angular__, __ui-router__
* __Bootstrap__
* __HTML__, __Javascript__, __CSS__
* __NPM__, __Bower__, __NodeJS__, __Express__, __Grunt__
