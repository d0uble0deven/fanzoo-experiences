# FanZoo Experiences

## Overview

FanZoo is a web application that allows users to book experiences with athletes. The project includes a simple purchase/booking flow where a user can place an order for an athlete experience.

---

## **🎥 Video**

Below is a demo video of the application.

- [Video - Desktop](https://youtu.be/LmBuaGtzRY0)

---

## Tech Stack

- **Frontend:** React (Remix)
- **Backend:** Node.js, AWS DynamoDB
- **Payments:** Stripe API (mocked)
- **Deployment:** Vercel
- **Documentation:** OpenAPI

---

## 🔗 API Documentation

FanZoo follows the **OpenAPI Specification**. The full API definition is located in the repo at:

- fanzoo-experiences/openapi.json

This file provides a structured API contract, including:

- Endpoints (`POST /bookings`)
- Request & response models
- Error handling

You can use tools like **Swagger UI** or **Postman** to visualize and test API requests.

---

## Features

### **Backend**

- `POST /Bookings`: Creates a booking record in DynamoDB.
- Simulated payment processing with a mock Stripe API.
- Stores booking details in a database after successful payment.

### **Frontend**

- Lists athletes and their available experiences.
- Users can select an experience and proceed to booking.
- Booking details are stored in the backend.
- Success page displays booking details after confirmation.
- Responsive UI for desktop, tablet, and mobile.

---

## **💳 Payment Information**

- **Any credit card will work** – this is a mock integration.
- Simply click **"Pay Now"** to book an experience.
- No real payment is processed.

---

## Setup Instructions

### **1. Clone the Repository**

```
git clone https://github.com/d0uble0deven/fanzoo-experiences.git
cd fanzoo-experiences
```

### **2. Install Dependencies**

```
npm install
```

### **3. Environment Variables**

Create a `.env` file in the project root and add:

```
AWS_ACCESS_KEY_ID=your_AWS_public_key
AWS_SECRET_ACCESS_KEY=your_AWS_secret_key
AWS_REGION=us-east-2

VITE_STRIPE_PUBLISHABLE_KEY="your_stripe_public_key"
VITE_STRIPE_SECRET_KEY="your_stripe_secret_key"

APP_URL=http://localhost:5173

DYNAMODB_TABLE_NAME=Bookings
```

### **4. Run the Project**

```npm run dev

```

Then, open `http://localhost:5173/` in your browser.

---

## Folder Structure

```
📦 fanzoo-experiences
├── 📂 app
│ ├── 📂 components # UI components
│ ├── 📂 routes # API routes & pages
│ ├── 📂 styles # CSS Modules
│ ├── 📂 MockData # Static mock data
│ ├── 📄 entry.client.tsx # Client entry point
│ ├── 📄 entry.server.tsx # Server entry point
│ ├── 📄 root.tsx # Main layout & routing
├── 📄 package.json # Dependencies & scripts
├── 📄 remix.config.js # Remix config
└── 📄 tailwind.config.ts # Tailwind config
```

---

## API Endpoints

### `POST /bookings`

Creates a new booking.

```
{
"experienceId": "exp_105",
"userId": "test-user-id",
"athlete": "Patrick Mahomes",
"timestamp": "2025-01-30T19:24:59.634Z"
}
```

### `GET /bookings`

Retrieves all bookings.

---

## **If I Had More Time**

### **📱 Responsiveness**

- Improve left spacing on mobile views.
- iPad Pro has spacing issues. I wanted to use [react-glider](https://www.npmjs.com/package/react-glider) so each row would be a **glider**, but I did not have time to implement it.

### **💳 Stripe API**

- Currently, Stripe validation is turned off.
- I would refine the integration to allow demo cards for testing.
- I would remove the **"Link"** payment option or integrate it better into the flow.

### **🎴 Card Designs**

- Introduce **retro sports card** and **Pokémon-style cards**.
- Add **holographic effects**, **stats**, and **animations**.
- Found inspiration from:
  - [CSS Only: Baseball Cards](https://codepen.io/kitjenson/pen/YoLWqX?css-preprocessor=scss)
  - [Digital baseball cards for fictional players](https://codepen.io/kaisle/pen/pqxNPz)
  - [Pokemon Cards V2](https://codesandbox.io/p/github/yeswesurf/3d-css-baseball-cards/main?file=%2Fsrc%2Flib%2Fcomponents%2Fcard-shine.svelte)

---

## Deployment

The project is deployed on **Vercel**.

- [Live Demo](https://fanzoo-experiences-o80vaq3h7-dev94s-projects-9a098fa3.vercel.app/)

---

## Author

Developed by **[Your Name]**

- GitHub: [Your GitHub](https://github.com/d0uble0deven)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/DevGovindji)
