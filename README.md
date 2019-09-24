# Teamwork

Teamwork is an internal social network for organizations’ employees.
Goal of Application this application is to facilitate more interaction between colleagues and facilitate team bonding.

## Required Features

1. Employees can create their own user account
2. Employees can sign in
3. Employees can write and/or share articles with colleagues on topics of interest to them
4. Employees can edit their articles
5. Employees can delete their articles
6. Employees can comment on other colleagues' article post
7. Employees can view all articles showing the most recently posted articles first
8. Employees can view a specific article

## Optional Features

- Employees can view all articles that belong to a category
- Employees can flag a comment, or article as inappropriate
- Admin can delete a comment, or article flagged as inappropriate


# **Technonlogies**

- **Express JS** - API development framework

- **Node** - run time environment for JavaScript
- **Mocha and Chai** - for testing
- **Eslint** - code analysis tool for identifying problematic patterns found in JavaScript code
- **Babel JS** - JavaScript compiler (**ES6** to **ES5**)

# **Requirements and Installation steps**

## **You need the following to be able to run the application**

[Node](https://nodejs.org/en/download/) a runtime environment for JavaScript

[Postman](https://www.getpostman.com/downloads/) to test the Api endpoints

[Visual studio code](https://code.visualstudio.com/download) for editing and running the app

## **Clone the project**

    - git clone https://github.com/xavioo/Teamwork.git
    - cd /Teamwork
    - npm install (to install required dependencies)
  
## **Testing**

    - npm test

## **Start The Application**

     - npm start


## **API endpoints**

`- POST /auth/signup - Employees can create their own user account`

`- POST /auth/signin - Employees can sign in`

`- POST /articles - Employees can write and/or share articles`

`- PATCH /articles/<articleId> - Employees can edit their articles`

`- DELETE /articles/<articleId> - Employees can delete their articles`

`- POST /articles/<articleId>/comments - Employees can comment on other colleagues' article post`

`- GET /feeds - Employees can view all articles, showing the most recently posted articles first`

`- GET /articles/<articleId> - Employees can view a specific article`

`- GET /articles?articles=<:desired-category> - Employees can view all articles that belong to a category`

`- POST /articles/flag/<articleId> - Employees can flag an article as inappropriate`

`- GET /flags - Admin can view all flags`

`- DELETE /articles/<articleId> - Admin can delete an article flagged as inappropriate`


### Links

### 1.Gh-pages

https://xavioo.github.io/Teamwork/UI/index.html


### 2.Pivotal Tracker

https://www.pivotaltracker.com/n/projects/2395950




# **Author**
Xavier Rucahobatinya




