# Towing Service Management System

A full-stack towing request management system built with:

- Laravel (Backend API)
- React (Frontend Web App)
Customers can create towing requests with live location, and drivers can accept and manage them in real-time.
---

## ⚙️ Backend Setup (Laravel)

### 1️⃣ Go to backend folder

```bash
cd backend

2️⃣ Install dependencies
composer install
cp .env.example .env

4️⃣ Configure database in .env
DB_DATABASE=your_db
DB_USERNAME=your_user
DB_PASSWORD=your_password

5️⃣ Generate key
php artisan key:generate

6️⃣ Run migrations & seeders
php artisan migrate
php artisan db:seed

7️⃣ Start backend server
php artisan serve

API runs on:
http://localhost:8000


🌐 Frontend Setup (React)
cd web-customer
npm install
npm start

Frontend runs on:
http://localhost:3000

🔐 Test Users (Seeder)
| Role     | Email                                         | Password    |
| -------- | --------------------------------------------- | ----------- |
| Customer | [customer@test.com]                           | password123 |
| Driver   | [driver@test.com]                             | password123 |

🚀 Features

Customer creates towing request with live location

Driver accepts request

Real-time updates via polling

Role based access

Secure API authentication

Modern responsive UI

🛠 Tech Stack

Laravel 12
React
Axios
Sanctum Auth
OpenStreetMap API


📌 Notes

Backend must run before frontend

Do not commit .env, vendor, or node_modules

Use .gitignore properly