# FitFeet
FitFeet is an shoe recommender / retail management app. It was created as my capstone project for GA's Software Engineering Immersion

## App Main Features
- User Interface
  - Allows user to input their feet dimensions to get recommendations
  - Allow users to order shoes that retailers put onto the app to sell
- Retailer Management Platform
  - Order Management & Tracking
  - Product Management & Tracking
- Admin Platform
   - to manage users and components
- *Wireframe*: https://miro.com/app/board/uXjVMoki5VI=/?share_link_id=803697538485
- *Database Design*: https://drawsql.app/teams/wallgecko/diagrams/fit-feet


## Getting Started 
1. Setting up Backend
    > Create database with psql. Instructions and codes to create database can be found in the file
    ```
      ./backend/database.sql
    ```
    > Create .env file in your backend folder with the following variables
    ```  
      PORT=5001
      ACCESS_SECRET="YOUR RANDOMLY GENERATED VERY LONG STRING"
      REFRESH_SECRET="YOUR RANDOMLY GENERATED VERY LONG STRING"
      DB_HOST=localhost
      DB_PORT=5432
      DB_NAME=fitfeet
      DB_USER="urdatabaseusername"
      DB_PASSWORD="urdatabasepassword"
    ```
   > In the backend terminal ("/Fitfeet/backend/"). Install packages and run to start.
    ```
      npm i
      npm run dev
    ```
    
2. Setting up Frontend
    > Create .env file in your frontend folder with the following variables

    ```
      VITE_SERVER=http://localhost:5001
    ```

    > In the frontend terminal ("/Fitfeet/frontend/"). Install packages and run to start. 

    ```
      npm i
      npm run dev
    ```

## Technologies Used
- PERN stack
- Material UI (https://mui.com/)

## Future Improvements
- Improve recommendation algorithm. Currently due to a lack of time, it is only based on matching user to other users with similar feet lenght
- Payment integration when user orders a shoe
