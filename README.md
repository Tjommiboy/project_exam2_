# 🌴 Holidaze – Booking App

**Holidaze** is a full-featured accommodation booking platform built with modern frontend technologies. Users can browse venues, make bookings, manage their profiles, and view booking history. Venue managers can also list, edit, or delete their venues.

Register a user
	•	Note: You must use a @stud.noroff.no email to register and log in successfully.

## 📸 Live Demo

> 🔗 [unique-froyo-0a9eb1.netlify.app]

---

## 🛠️ Built With

- **React** – Frontend library
- **React Router** – Navigation & routing
- **Tailwind CSS** – Utility-first styling
- **React Toastify** – Toast notifications
- **REST API** – Noroff’s Holidaze API
- **Vite** – Fast build tool for development

---

## 📂 Features

### 🧑 User

- Register, login, and logout
- Browse venues with images and descriptions
- Book available venues
- View and delete bookings
- Responsive design (mobile & desktop)

### 🏨 Venue Manager

- Create, edit, and delete venues
- View bookings for your venues
- Upload venue images
- Display max guests, amenities, location, and price

---

## 🔐 Authentication

- Authenticated via `Authorization: Bearer <token>` header.
- Venue managers are identified via a `venueManager: true` flag when registering.
- 	•	Important: To register and log in, you must use an email ending with @stud.noroff.no.

---

## 📸 Media

- Venue cards show the first image or a fallback
- Bookings show venue details and date range

---

## 🔁 Dynamic Routing

- `/venues/:id` – Single venue page
- `/bookings/:id/edit` – Edit a specific booking
- `/profile/:username` – View user profile

---

## 🧪 How to Run Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/Tjommiboy/project_exam2_.git
   cd holidaze
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the app**

   ```bash
   npm run dev
   ```

4. **Environment setup**
   Create a `.env` file with:
   ```env
   VITE_API_BASE_URL=https://api.noroff.dev/api/v1/holidaze
   ```
5.	Register a user
	•	Go to the registration page and create a user.
	•	Note: You must use a @stud.noroff.no email to log in successfully.
---

## 🔧 Folder Structure

```
src/
├── api/               # API handlers (CRUD for bookings, venues, auth)
├── components/        # Reusable components (Navbar, Cards, etc.)
├── pages/             # Page views (Home, Profile, Login, etc.)
├── styles/            # Tailwind & custom CSS
├── App.jsx            # Main component with routes
└── main.jsx           # React entry point
```

---

## 🧹 Known Issues / TODO

- [ ] Improve error handling for API failures
- [ ] Image upload preview
- [ ] Refactor state handling (optional: consider `useReducer` or global state)
- [ ] Add unit tests

---

## 🙋‍♂️ Author

**Anand Chetty**  
📧 Contact: [anandchetty@gmail.com]  
📍 Based in Thailand 🌏

---

## 📄 License

MIT License
