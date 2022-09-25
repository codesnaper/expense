[![Release Pipeline](https://github.com/codesnaper/expense/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/codesnaper/expense/actions/workflows/release.yml)
[![Develop PR](https://github.com/codesnaper/expense/actions/workflows/develop.yml/badge.svg?branch=develop)](https://github.com/codesnaper/expense/actions/workflows/develop.yml)
# expense-management
Expense Management application help you to track and manage all of your expenditure and accounts. You can add multiple banks and account like (Saving account, loan account) which calculate total interest and accumulate the total credit and debit and give short summary. You can define rule to limit out the expenditure for particular  category.

## Getting Started
### Project Structure
```text
expense
|   LICENSE
│   README.md
└───expense-api (Back End Source Code)
│───expense-ui (Front End Source Code)
```
### Back End Project Structure

### Front End Project Structure

### Architecture Diagram

### ER Diagram

### Technologies Used:
- Srping Boot
- React.js
- Maven
- Spring JPA
- WebSocket
- MySQL
- AWS

### Prerequisites
1. Install Java 11 [[Java 11](https://www.oracle.com/pl/java/technologies/javase/jdk11-archive-downloads.html)]
2. Install Maven
3. Install Node LTS v16.15.0 [Node](https://nodejs.org/fa/blog/release/v16.15.0/)
4. NPm [NPM](https://www.npmjs.com/package/npm/v/8.5.5)

### Installation and running FE
1. switch directory to expense-ui
```shell
cd expense-ui
```
2. Install npm dependencies
```shell
npm i
```
3. Run Server
```shell
npm start
```
4. Application will start on [http://localhost:3000](http://localhost:3000)

### Installing and running BE
1. Run mvn clean compile
```shell
mvn clean compile
```
2. set enviornment varaible -Dspring.profile.active=local
3. Run application.


## Contributing
As I use this for my own projects, I know this might not be the perfect approach for all the projects out there. If you have any ideas, just open an [issue](https://github.com/codesnaper/expense/issues/new/choose) and tell me what you think.

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.
