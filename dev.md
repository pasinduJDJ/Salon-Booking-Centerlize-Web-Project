🚀 SalonSync — Phase 1 Development Plan

Goal
Build the core product: a working Client Website with booking + a secure Admin Dashboard, all powered by a Serverless AWS backend.

🗂️ 3 Work Streams

1. 🖥️ Frontend (React.js + Tailwind CSS)
Task	                    Details
Client Website	            Multi-page salon site (Home, Services, About, Book Now)
Booking Flow	            Stylist picker → time slot selector → confirmation page
Admin Login Page	        Cognito-powered secure login portal
Admin Dashboard	            Grid View (4 stylists × time slots), Add/Edit booking panel

2. ⚙️ Backend (AWS Serverless)
Task	                    Details
DynamoDB Setup	            Single-table design for bookings, stylists, slots
Lambda Functions	        CRUD APIs for bookings & stylist availability
API Gateway	                REST endpoints connecting frontend ↔ Lambda
Cognito	                    Admin user pool & authentication config

3. 🔗 Integration & Testing
Task	                    Details
S3 Setup	                Upload/serve logos, stylist photos, static assets
Slot Conflict Guard	        Core logic to prevent double-booking
End-to-End Test	            Client books → Admin sees it → Admin manually adds phone booking → conflict blocked

🔢 Suggested Build Order

1. AWS Infrastructure Setup (Cognito, DynamoDB, S3, API Gateway)
2. Lambda Functions (booking CRUD + conflict check)
3. Client Website UI
4. Booking Flow (frontend ↔ API)
5. Admin Dashboard (Grid View + manual booking)
6. Auth-gating the Admin Portal
7. End-to-End testing & bug fixes
