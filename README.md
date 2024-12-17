# Nearby Ambulances and Doctors
This project provides a RESTful API for managing doctors and ambulances. It includes basic CRUD (Create, Read, Update, Delete) operations, as well as pagination and filtering functionality.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- @vitejs/plugin-react uses Babel for Fast Refresh
- @vitejs/plugin-react-swc uses SWC for Fast Refresh
- 
# Functionality Overview:-
When you open the application, you will first be prompted to verify if you have admin permissions. To proceed as an admin, you need to enter a static password: "admin".
1.If you enter the correct password, you will access the application as an Admin.
2.If you enter an incorrect password or cancel the prompt, you will access the application as a User.
Sidebar Navigation
The application has two sidebar tabs:

🚑 Ambulance Services (default selection):-
1.Medical Staff
2.Ambulance Services

By default, the Ambulance Services tab will be selected, and you will see a list of ambulances available for each location.
At the top of the screen, there is a location selector dropdown that allows you to filter and view data specific to a selected location.
User Role:-
If you access the application as a User, the list will be displayed, but you will not see the Actions column or any admin functionalities.
Admin Role:-
If you access the application as an Admin:
You will see an "Add" button that allows you to add new ambulance data.
The Actions column will be visible, where you can:
1.Edit ambulance details
2.Delete ambulances

👩‍⚕️ Medical Staff:-
The same functionalities (view, add, edit, and delete) apply to the Medical Staff tab when accessed as an Admin.

🔒 Logout
To log out of the application, click on the avatar icon in the header and select the logout option.

# 🛠 Technologies Used for frontend 
React: UI library for building user interfaces.
TypeScript: Type-safe JavaScript for better development.
Vite: Lightning-fast build tool for modern web applications.
Tailwind CSS: For styling the components.

# Features

1. Role-Based Access Control:

   .Admins can perform Add, Edit, and Delete operations.
   .Users have a restricted view-only mode.


2. Dynamic Filtering:

    . Filter data using the Location Selector Dropdown.


3. CRUD Operations:

     . Admins can perform Create, Read, Update, and Delete operations.


4. Responsive UI:

    . The layout is optimized for desktop and mobile screens.


5. Session Management:

    . Admin permissions persist during the session until logout.


# Frontend:

. React
. TypeScript
. Vite
. Tailwind CSS


# Backend:

Node.js
Express.js
MongoDB
Mongoose



# Frontend (to execute frontend code )
Available Scripts

# Install dependencies:
  1. npm install


# Start the development server:
1. npm run dev

# To access the application on the server, use the IP address: 52.11.158.58

# Backend (to execute backend code)
# Install dependencies
  1. npm install
# Start the development server
 1. npm run dev


# API Endpoints 
# Doctors

1. POST /api/doctors: Create a new doctor.
2. GET /api/doctors?page=1&limit=10&location=: List all doctors with pagination and filtering by location.
3. PUT /api/doctors/:id: Update an existing doctor by ID.
4. DELETE /api/doctors/:id: Delete a doctor by ID.

# Ambulances

1. POST /api/ambulances: Create a new ambulance.
2. GET /api/ambulances?page=1&limit=10&location=: List all ambulances with pagination and filtering by location.
3. PUT /api/ambulances/:id: Update an existing ambulance by ID.
4. DELETE /api/ambulances/:id: Delete an ambulance by ID.

# Locations
1.GET /api/location/:type: Get the location data for either doctors or ambulances. Replace :type with either doctor or ambulance.
e.g /api/location/ambulance
e.g /api/location/doctor
