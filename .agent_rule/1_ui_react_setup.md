### 🧠 AI Agent Prompt — MedZen Frontend (React)

You are a **senior frontend engineer (10+ years experience)** building a **scalable SaaS healthcare application**.

## 🎯 Product Context

We are building **MedZen**, a modern Hospital Management System (HMS) focused on:

* Simplicity
* Clean UI/UX
* Scalable SaaS architecture
* Future AI integration

---

## 🚀 Phase 1 Scope

Build a **React application** with:

### 1. 🔐 Login Page

* Fields:

  * Email
  * Password
* Validation:

  * Required fields
  * Valid email format
* Features:

  * Show/hide password
  * Loading state on submit
  * Error handling (invalid credentials)
* UI:

  * Clean, minimal, modern (inspired by Stripe / Notion)
* On success:

  * Redirect to `/dashboard`

---

### 2. 📊 Dashboard (Post Login)

Display a **summary of appointments**

#### Components:

* Header (App name: MedZen)
* Sidebar (basic navigation placeholder)
* Main Dashboard

#### Dashboard Content:

* Cards:

  * Total Appointments Today
  * Upcoming Appointments
  * Completed Appointments
  * Cancelled Appointments
* Table:

  * Patient Name
  * Doctor Name
  * Time Slot
  * Status (Upcoming / Completed / Cancelled)

---

## 🧱 Tech Stack Requirements

* React (with hooks)
* React Router
* State management: Context API or Zustand
* Styling: Tailwind CSS
* API layer: Axios or Fetch
* Folder structure: scalable & modular

---

## 🔐 Auth Behavior

* Store token in localStorage
* Protect `/dashboard` route
* Redirect to `/login` if not authenticated

---

## 📁 Suggested Folder Structure

src/

* components/
* pages/

  * Login.jsx
  * Dashboard.jsx
* services/

  * api.js
* store/
* routes/
* layout/

---

## 🎨 UI/UX Guidelines

* Use card-based layout
* Soft shadows, rounded corners
* Spacing consistent (8px grid)
* Responsive (desktop-first)
* Subtle animations (hover, loading)

---

## 🔌 Mock API (for now)

Use dummy data:

Login API:
POST /api/login

Appointments API:
GET /api/appointments

Return mock JSON.

---

## 🧪 Bonus (if time permits)

* Skeleton loader for dashboard
* Basic charts (appointments overview)
* Dark mode toggle

---

## 📦 Output Expected

* Full working React code
* Component-wise breakdown
* Clean, readable, production-style code
* Comments where necessary

---

## 🧠 Engineering Mindset

Think like:

* SaaS architect
* Clean code advocate
* Performance-focused developer

Avoid:

* Hardcoding everywhere
* Monolithic components
* Poor naming

---

## 🎯 Goal

Deliver a **beautiful, scalable foundation** for MedZen that can evolve into a full HMS SaaS platform.

---
