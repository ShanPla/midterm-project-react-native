# Job Finder App

A React Native mobile application built with TypeScript that allows users to search for jobs, save them, and submit applications. Built as a midterm project.

---

## Features

- **Job Listings** — Fetches live job data from the [Empllo API](https://empllo.com/api/v1) with unique UUIDs assigned to each job
- **Search** — Filter jobs in real time by title, company, location, or tags
- **Filter Pills** — Quickly switch between All Jobs and Applied views
- **Save Jobs** — Bookmark jobs to review later; saved jobs appear in the dedicated Saved Jobs screen
- **Apply for Jobs** — Submit an application form with full validation
- **Application Tracking** — Applied jobs are automatically removed from Saved and marked with a green "Applied" badge and "Application Submitted" status
- **Remove Saved Jobs** — Delete saved jobs with a confirmation modal
- **Job Details Modal** — View full job description rendered from HTML with proper formatting
- **Dark / Light Mode** — Toggle available on every screen via the navbar icon
- **Exit Confirmation** — Android back button on the home screen prompts the user before exiting

---

## Screens

| Screen | Description |
|---|---|
| Job Finder | Main screen with job listings, search, filters, and save/apply actions |
| Saved Jobs | Displays bookmarked jobs with apply and remove options |
| Apply for Job | Application form with name, email, contact number, and cover answer |

---

## Tech Stack

- [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- TypeScript
- [React Navigation](https://reactnavigation.org/) — Native Stack
- [UUID (v5)](https://www.npmjs.com/package/uuid) — Unique ID generation for API jobs
- [react-native-render-html](https://meliorence.github.io/react-native-render-html/) — HTML job description rendering
- [@expo/vector-icons](https://docs.expo.dev/guides/icons/) — FontAwesome icons
- Context API — Global state for saved jobs, applied jobs, and theme

---

## Project Structure

```
src/
├── components/
│   ├── JobCard/
│   │   ├── JobCard.tsx
│   │   └── styles.ts
│   └── SearchBar/
│       ├── SearchBar.tsx
│       └── styles.ts
├── context/
│   ├── JobContext.tsx
│   └── ThemeContext.tsx
├── navigation/
│   └── MainNavigator.tsx
├── screens/
│   ├── ApplyScreen/
│   │   ├── ApplyScreen.tsx
│   │   └── styles.ts
│   ├── JobFinderScreen/
│   │   ├── JobFinderScreen.tsx
│   │   └── styles.ts
│   └── SavedJobsScreen/
│       ├── SavedJobsScreen.tsx
│       └── styles.ts
├── services/
│   └── jobService.ts
└── types/
    └── Job.ts
```

---

## Getting Started

### Prerequisites

- Node.js
- Expo CLI (`npm install -g expo-cli`)

### Installation

```bash
# Clone the repository
git clone https://github.com/ShanPla/midterm-project-react-native.git

# Navigate into the project
cd midterm-project-react-native

# Install dependencies
npm install
```

### Running the App

```bash
npx expo start
```

Scan the QR code with the Expo Go app on your device, or press `a` to open on an Android emulator.

---

## Form Validation

The application form validates the following before submission:

- **Full Name** — Required, cannot be empty
- **Email** — Must match a valid email format
- **Contact Number** — Must be 10–13 digits, numeric only
- **Why should we hire you?** — Minimum 10 characters

---

## API

Jobs are fetched from:

```
https://empllo.com/api/v1
```

Since the API does not return unique IDs, each job is assigned a deterministic UUID v5 based on its `applicationLink` or a combination of `title` and `companyName`.
