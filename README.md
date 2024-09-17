<div align="center">
    <img width="80" height="80" src="./public/apple-touch-icon-114x114.png"/>
</div>
<h1 align="center">
    New Zealand Tunnellers
</h1>
<p align="center">
    <a href="https://github.com/vercel/next.js">
        <img src="https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white" alt="nextjs"></a>
    <a href="https://github.com/vercel/next.js">
        <img src="https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white" alt="Postgres"></a>
</p>

The project is a [Next.js](https://github.com/vercel/next.js) web application dedicated to a New Zealand special military unit who fought in France during the First World War (1914-1918): the _New Zealand Tunnelling Company_.

This company was formed at a time where the British Army struggled in their underground battle against the German miners beneath the no man's land. The [web application](https://www.nztunnellers.com) tells the original story of this special unit and shares the men's war experience.

## Contents

- [Contents](#contents)
- [Get Started](#get-started)
- [Database](#database)
  - [Overview](#overview)
  - [Tables \[WIP\]](#tables-wip)
    - [Tunnellers Table](#tunnellers-table)
- [Disclaimer](#disclaimer)

## Get Started

To set up the project locally, follow these steps:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/yourusername/nztunnellers.git
   cd newzealandtunnellers
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

<!-- 3. **Set up the environment variables**:
    Create a `.env` file in the root directory and add the necessary environment variables. -->

3. **Run the development server**:

   ```sh
   npm run dev
   ```

   Open the web application in your browser: [http://localhost:3000](http://localhost:3000).

## Database

### Overview

The web application uses a PostgreSQL database to manage data for the entire web application. It includes tables for tunnellers and history chapters, with relationships that support the core functionality of the app.

### Tables [WIP]

#### Tunnellers Table

| Column     | Type      | Key     | Description |
| ---------- | --------- | ------- | ----------- |
| `id`       | `INTEGER` | Primary | -           |
| `surname`  | `VARCHAR` | -       | -           |
| `forename` | `VARCHAR` | -       | -           |

[↑ Back to Contents](#contents)

## Disclaimer

This web application has no intention to generate profit or monetize the content in any way. All information provided is for public knowledge and educational benefit.

[↑ Back to Contents](#contents)
