# ✂️ SalonSync - Comprehensive Project Reference

> **SalonSync** is a professional-grade, serverless management platform specifically designed for medium-sized salons. It acts as the single source of truth for both online bookings and traditional phone-in customers, ensuring a seamless, conflict-free daily operation.

---

## 🌟 1. Business Vision & Model

Many salons currently rely on paper diaries and manual phone calls, leading to inefficiencies, missed appointments, and the dreaded **"Double-Booking Dilemma."** 

SalonSync solves this by offering a unified hybrid system:
- **Zero-Setup Cost Model:** Removes the financial barrier for local business owners.
- **Affordable Pricing:** 14-day free trial, followed by a low-cost monthly subscription of **2,500 LKR**.
- **Maximum Profitability:** Built on a Serverless AWS infrastructure. When the salon is closed and there is no traffic, overhead server costs drop to near zero.

---

## 👥 2. User Roles & The Seamless Workflow

To ensure maximum security and simple training for salon staff, the platform is strictly divided into **two** user roles. Stylists do not require their own logins.

### 👩‍💻 1. Clients (Customers)
Clients **do not** have backend access. Their entire journey takes place on the Client Website.
* **Full Website Presence:** A complete, modern salon website showcasing the salon's brand, location, and services.
* **Integrated Booking:** Clients can visit the website, choose their preferred stylist, select an available 30-minute time slot, and receive instant confirmation.

### 🛡️ 2. Admin (Salon Owner / Receptionist)
The Admin is the **only** role with secure access to the backend control center. 
* **Centralized Control:** The Admin logs in via a secure portal to view the daily "Grid View" master schedule.
* **Manual Phone Bookings (The Hybrid Flow):** Customers will still call the salon. When they do, the Admin manually adds them to the Grid View. This immediately blocks out the slot, physically preventing an online customer from booking that exact same time.
* **Resource Management:** The Admin controls all stylist availability, marks sick leave, and oversees daily operations.

---

## ✨ 3. Core Features

1. **Smart "Cutter" Slot System:** A dynamic scheduling engine that manages up to 4 hair stylists simultaneously, preventing overlapping appointments between web users and walk-in/phone clients.
2. **Unified Admin Dashboard:** A sleek, mobile-responsive control center for the Admin to run the business.
3. **Automated Communication:** Integration with SMS gateways (Notify.lk / ShoutOUT) and WhatsApp. Once an appointment is on the grid, automated reminders are sent out to eliminate "no-shows."
4. **QR Code Marketing:** Custom QR codes at the salon front desk. Walk-in customers can scan it to view the Client Website and book their next appointment digitally.

---

## 🛠️ 4. Technical Stack (Phase 1)

To guarantee 99.9% uptime and keep maintenance costs minimal, SalonSync utilizes a highly scalable **Serverless AWS Stack**.

| Category | Technology |
| :--- | :--- |
| **Development Env.** | Google Antigravity (Agentic IDE) |
| **Frontend Framework** | React.js + Tailwind CSS (Used for both Website & Admin UI) |
| **Backend Runtime** | Node.js running on AWS Lambda |
| **Database** | AWS DynamoDB (NoSQL - Single Table Design) |
| **Identity & Auth** | AWS Cognito (Strictly for Admin access) |
| **API Management** | Amazon API Gateway |
| **Asset Storage** | AWS S3 (Stores Logos, Stylist Photos, Website Assets) |

---

## 🚀 5. Phase Roadmap

* **Phase 1: Core Foundation** 
  * Develop the Full Client Website with integrated booking.
  * Build the secure Admin Dashboard for schedule viewing and manual entries.
  * Set up the AWS Serverless backend (Cognito, API Gateway, Lambda, DynamoDB).
* **Phase 2: Engagement & Retention** 
  * Integrate SMS gateways for automated client reminders.
  * Generate physical QR marketing assets.
* **Phase 3: Scale & SaaS Transition** 
  * Upgrade architecture to support multi-salon tenant data.
  * Roll out the fully automated SaaS subscription billing model.