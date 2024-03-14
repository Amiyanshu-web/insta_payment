# Insta Payment

## Introduction
The project aims to provide users with a seamless shopping checkout experience by offering various features such as cart checkout page, payment option page and order confirmation page.

![Page 1](/public/img1.png)
![Page2](/public/img2.png)
![Page3](/public/img3.png)

## Table of Contents
1. [Project Overview](#project-overview)
2. [Setup](#setup)
3. [Features](#features)
4. [Technologies Used](#technologies-used)
5. [Design Choices](#design-choices) 
6. [Chalenges](#chalenges)

## 1. Project Overview
The e-commerce shopping cart website is built using the Next.js framework, which enables server-side rendering, static site generation, and seamless routing. Tailwind CSS is used for styling, providing a utility-first approach for building custom designs with minimal CSS.

## 2. Setup
To set up the project locally, follow these steps:
1. Clone the repository from GitHub.
2. Navigate to the project directory `cd insta_payment`.
3. Install dependencies using `npm install` or `yarn install`.
4. Start the development server using `npm run dev` or `yarn dev`.
5. Access the website on `http://localhost:3000`.

## 3. Features
The e-commerce shopping cart website includes the following features:
- Added a progress bar for users to track checkout steps. Users can navigate between steps by clicking on them.
 - Checkout page where users can view cart items.
- Payment method page to select the method of payment.
- Order summary page to view order details including address, payment status, cart items, total amount, and delivery status.
- Theme toggle button to toggle theme fetched from api (`https://groww-intern-assignment.vercel.app/v1/api/merchant-metad
ata`)

## 4. Technologies Used
The project utilizes the following technologies:
- Next.js: React framework for building server-side rendered web applications.
- Tailwind CSS: Utility-first CSS framework for styling.
- Redux Toolkit: State management library for managing application state.


## 5. Desing Choices
- **Progress Bar**: Implemented a progress bar to guide users through the checkout process and enhance the user experience.
- **Minimalistic Design**: Adopted a minimalistic design approach using Tailwind CSS to ensure a clean and intuitive interface for users.
- **Responsive Layout**: Designed the website to be fully responsive across various devices, providing a seamless experience for users on both desktop and mobile platforms.
- **Error Handling**: Implemented Loading and Error handling on each page for smooth user experience.


## 6. Challenges
- I faced a learning curve when working with theme toggling for the first time. It involved fetching themes dynamically from an API and updating CSS accordingly, which required some effort to grasp.
- Implementing Redux Toolkit to enable smooth transition between different steps was a bit challenging. However, diving into it provided me with valuable insights and skills.
- Choosing the most suitable UI design for the shopping cart proved to be a bit of a challenge. It demanded careful consideration to ensure that users would find it engaging and user-friendly.


---