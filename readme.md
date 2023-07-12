# Me Making My Meal - 4M

api: https://www.themealdb.com/

## core functionalities:
### from api
* view by meal categories
* view by meal regions
* view by meal Ingredients
* search meal by name
* search meal by id
* search a meal randomly
* seatch meal by first letter
### for app
* single page application
* show most popular searches - involves db - maybe firebase
* show most popular categories - involves db - maybe firebase
* show most popular cuisine - involves db - maybe firebase
* make recipes shareable (if possible without nextjs - something new)
* make recipes emailable
* make app diferent language friendly - something new
* make user annonymously authenticated on visit and interactions -- something new
### app stack
* tailwindcss
* firebase - for user data (wont be making a backend services for this app)
* typescript
* react
* reducx-toolkits
* react-router-dom
* react-icons
* tanstack react queries / redux-toolkits provided optimistic fetching
### app ui - brainstorming
* header
    * 4M - app name
    * search - show example search terms
    * Filters modal - by category, area, ingredients
* each modal options will show bare minimuum results after taking them to their designated route page
    * in that route page there will be a big carousel kinds of views with various items list
    * users can click on those items and go to their respective route page
* landing page
    * bare minimum items with recipe cards for each category
* recipe card
    * each recipe will have many available data points
    * each recipe will have image
    * each recipe will have ingredients
    * each recipe will have instructions
* footer page
    * stack in use
    * copyrights
    * get in touch 