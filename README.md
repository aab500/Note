# 🛠️ Note Taker

> **Streamlined Hardware Repair & Diagnostic Note Generator for Technicians**

[![React](https://img.shields.io/badge/React-18-blue.svg?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.2-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-4.5-7952B3.svg?logo=bootstrap)](https://getbootstrap.com/)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](#license)

**Note Taker** is a web application designed for hardware repair technicians, IT support teams, and warranty service centers. It automates the generation of standardized repair notes, ticket diagnoses, and repair recommendations for laptops, Chromebooks, and desktop hardware.

---

## 🚀 Features

- ⚡ **Automated Problem Extraction**: Instantly parses raw customer intake text/tickets to extract hardware problem descriptions using intelligent keyword filters.
- 🧩 **Comprehensive Issue Catalog**: Pre-configured categories covering common hardware failures:
  - **Board & Power**: Motherboard, Daughterboard, Charging Ports, Power Buttons.
  - **Display & Vision**: LCD (NTS & TouchScreen), LCD Cable, WebCam & Microphone.
  - **Input Devices**: Keyboard, TouchPad, Palmrest with KB, Plastics, Hinges.
  - **Power & Connectivity**: Battery, OS, AC Adapter, Wi-Fi, Stylus, Sensors.
  - **Special Disposition**: Liquid Spill Affected, NTF (No Trouble Found), Wrong Claim, High Repair Cost.
- 📝 **Standardized Output Format**: Generates consistent multi-line diagnostic notes ready for ticketing systems.
- 📋 **One-Click Clipboard Actions**: Quickly paste incoming ticket text and copy final generated notes with a single click.
- 🔐 **BIOS & Enrollment Status**: Quickly record device BIOS lock and enrollment states.
- 🎒 **Accessory Tracking**: Track incoming customer accessories (Adapter, Complete Case, Bottom Case, Stylus, etc.).
- 🌗 **Modern Dark & Light UI**: Sleek, responsive design built with custom CSS and Bootstrap components.

---

## 📄 Note Format Example

The application formats all selections into a clean, standard repair output:

```text
*Problem: Unit fails to power on and screen is flickering
*Diagnosis: Motherboard (No-Power issue), LCD_NTS (Flickering issue)
*Recommendation/Solution: Replace Motherboard, Replace LCD (NTS)
*BIOS LOCK/Enrollment: Unlocked / Off
*Accessories: Adapter, Stylus
```

---

## 🛠️ Project Structure

```text
Note/
├── public/                 # Static assets
├── src/
│   ├── components/         # Modular React UI components
│   │   ├── AccessoryButtons.jsx
│   │   ├── DarkModeToggle.jsx
│   │   ├── EnrollmentRadio.jsx
│   │   ├── GeneratedText.jsx
│   │   ├── IssueButtons.jsx
│   │   ├── IssueModal.jsx
│   │   ├── ProblemInput.jsx
│   │   └── ...
│   ├── data/               # Diagnostic issue catalogs & configs
│   │   ├── issueConfig.js
│   │   └── issues.js
│   ├── App.jsx             # Main application container
│   ├── Redesigns.jsx       # Diagnostic app logic & state engine
│   ├── main.jsx            # Application entry point
│   └── redesigns.css       # App styling & theme tokens
├── index.html              # HTML template
├── package.json            # Dependencies & scripts
└── vite.config.js          # Vite build setup
```

---

## 💻 Tech Stack

- **Frontend Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Bootstrap 4 & Custom Modern CSS
- **Language**: JavaScript (ES6+) / JSX

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.0 or higher recommended)
- `npm` or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tech404x/Note.git
   cd Note
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome! Feel free to open an issue or submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
