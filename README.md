# Clinicly

> Clinic Management

## Table of Contents

- [Team Members](#team-members)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Status](#project-status)

## Team Members

- Lê Công Hửu - 20120294
  - Email: 20120294@student.hcmus.edu.vn
- Lê Tấn Kiệt - 20120312
  - Email: 20120312@student.hcmus.edu.vn
- Ngô Thanh Lực - 20120325
  - Email: 20120325@student.hcmus.edu.vn
- Nguyễn Long Vũ - 20120405
  - Email: 20120405@student.hcmus.edu.vn

## Technologies Used

- Backend - Golang:
  - Gin Web Framework - v1.9.0
  - GORM - v1.25.0
- Frontend - Javascript:
  - React - v18.2.0
  - Ant Design - v5.6.1

### Run

- Database: run db/db.sql script

- Backend:

  - Create .env file based on .env.example file

  - ```bash
    cd be
    go mod tidy
    swag init
    go run main.go
    ```

- Frontend:

```bash
cd fe
npm install
npm start
```

## Features

- Scheduling
- Billing/Payment
- Patient Information
- Reporting
- Inventory Management

## Project Status

Project is: _in progress_
