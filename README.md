# mightyFineLogging

Node.JS based financial logging API.

## Thoughts

This is a WIP that has been progressing alongisde my understanding of coding and web/API development.

The basis of this project is a MongoDB Database utilizing two collections, one of users and one of transactions. Each user has many transactions while each transaction has a single user that is its owner.

The User has an array of object id's for each transaction it has created; each transaction has an element that is the object id of the owner of the transaction.

The structure:
Request the permit route to get userID
Utilize UserID to get all of its transactions.

Goal:
Allow a user to enter their monthly expenses, categorized and titled appropriately, and use that information to create a savings % calculator to dictate how much of their income should be put away towards each purpose.

Allow a user to maintain a running total of how much has been contributed to each financial purpose and add/remove transactions (both positive and negative) that affect the values/totals.

Purposes:

- Rent / Monthly Expenses
- Savings
- Funds for food/day-to-day expenses

## Dependencies

"bcrypt": "^5.1.1"
"cors": "^2.8.5"
"dotenv": "^16.1.4"
"express": "^4.18.2"
"express-async-handler": "^1.2.0"
"mongoose": "^7.2.2"
"morgan": "^1.10.0"
"uuid": "^9.0.0"
"validator": "^13.11.0"

## Dev Dependencies

"@faker-js/faker": "^8.3.1"
"chai": "^4.3.7"
"chai-http": "^4.3.0"
"helmet": "^7.0.0"
"mocha": "^10.2.0"
"nodemon": "^3.0.1"
