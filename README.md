# Econest

## Team Information
- **Names:** Corey Cevallos and Emanuel Granados
- **Repo:** https://github.com/Coreyandres10/Econest
- **Emails:** cac20@hood.edu and eag3@hood.edu
- **Title:** All members were active developers.
- **Date** MAY 2024

## Project Description
Econest aims to provide easy-to-use financial management to users looking for a solution to their financial challenges by combining income, expenses, and stock tracking into one intuitive application. We aim for users to effortlessly input, or upload bank statements, into our web application to gain valuable insights into their spending habits through the user-friendly interface. The Econest system operates on the modern MERN stack, leveraging MongoDB for flexible data storage, Express.js for seamless server-side logic, React for dynamic front-end components, and Node.js for efficient server-side processing. Integration with the Real-Time Finance Data API enriches the user experience by providing up-to-date stock prices on stocks they take interest in. We designed Econest for ease of use, allowing users to navigate effortlessly through their financial data. With interactive graphs and visual representations, Econest empowers users to gain insightful insights into their financial trends, and investment performance at a simple glance, enhancing their decision-making process. Econest stands as an asset for individuals seeking a straightforward and effective means of managing their financial journey.

## Tech Stack
- **Frontend:** React, JavaScript XML, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Other:** npm (Node Package Manager), Git (Version Control)

## Repository Structure
1. Client
    -> src
        ->Home 
            -> App.jsx
            -> Home.css
            -> Home.jsx
        ->Home Functions
            -> HomeFunctionsStyling
            -> Stocks
                -> StockBuyInput.jsx
                -> Stocks.jsx
            -> CSV.jsx
            -> Dashboard.jsx
            -> DashboardLine.jsx
            -> DashboardPie.jsx
            -> Expenses.jsx
            -> FinanceTable.jsx
            -> Income.jsx
            -> StocksMain.jsx
        ->Login Page
            -> LoginStyling
                -> Login.css
                -> Signup.css
            -> Login.jsx
            -> Signup.jsx
        ->Pictures 
            -> Avatar.jpeg
            -> Econest.png
            -> EconestBackground.png
            -> EconestPng.png
            -> csvexample.png
        -> main.jsx
2. Server
    -> models
        -> Econest.js
        -> Transaction.js
        -> stock.js
        -> stockcloseprice.js
    -> Node Modules
        -> All required Node Modules
    -> public/csv
        -> All uploaded csv data
    -> util
        -> csv_handler.js
3. Node Modules
        -> All required Node Modules
4. README.md
        -> This file

## Software Used
MongoDB
Express.js
React.js
Node.js
npm (Node Package Manager)
Real-Time Finance Data API by OpenWeb Ninja
Any code editor (e.g., Visual Studio Code)

## Hardware Used
Personal computer (PC) or laptop
Internet connection

## Configuration Instructions
1. Clone Repository
    Use the following code: git clone <https://github.com/Coreyandres10/Econest>

2. Navigate to Project Directory
    cd <project_directory>

3. Install Dependencies
    cd client
        npm install
    cd ../server
        npm install

4. Set Up MongoDB
    sudo service mongod start

5. Start Backend Server
    cd ../server
        npm start

6. Start Frontend Development Server
    cd ../client
        npm run dev

7. Access the Application
    http://localhost:5173/home