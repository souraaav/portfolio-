
# 🖥️ Personal Portfolio – Python-Powered Web Showcase

This project is a dynamic personal portfolio website built using Python and Flask. It serves as a digital resume and showcase of your skills, projects, and contact information. Designed with simplicity and responsiveness in mind, it allows visitors to explore your professional profile interactively.

## 🌟 Project Overview

The portfolio website is structured to highlight your:

- Technical skills and expertise
- Projects with descriptions and links
- Educational background
- Contact form for inquiries

It uses Flask to serve HTML templates and handle routing, making it easy to deploy and customize.

## 📂 File Descriptions

### `main.py`

This is the core backend script that runs the Flask application.

**Key Functions:**

- Initializes the Flask app
- Defines routes for:
  - Home (`/`)
  - About (`/about`)
  - Projects (`/projects`)
  - Contact (`/contact`)
- Renders corresponding HTML templates
- Handles form submissions (if implemented)

---

### `data.py`

This file contains structured data used to populate the portfolio dynamically.

**Key Functions:**

- Stores dictionaries/lists for:
  - Project details (title, description, links)
  - Skills and technologies
  - Education and certifications
- Acts as a centralized data source for template rendering

---

## 🛠️ Technologies Used

- **Python** — Core programming language
- **Flask** — Lightweight web framework
- **HTML/CSS** — For layout and styling
- **Bootstrap** — For responsive design (optional)

## 🚀 Getting Started

### Prerequisites

- Python 3.x
- Flask installed:
  ```bash
  pip install flask
  ```

### Run the App

```bash
python main.py
```

Then open your browser and visit `http://127.0.0.1:5000/`

---

## 📸 Demo
screenshot
<img width="628" height="3620" alt="urboisourav netlify app_" src="https://github.com/user-attachments/assets/78643f42-203e-40c7-bed5-aa2ddf2e2507" />


---

## 📄 License

This project is licensed under the [Unlicense](LICENSE), allowing free use and modification.

