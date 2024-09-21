<div align="center">
    <img width="80" height="80" src="./public/apple-touch-icon-114x114.png"/>
</div>
<h1 align="center">
    New Zealand Tunnellers
</h1>
<p align="center">
    <a href="https://github.com/vercel/next.js">
        <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="nextjs"></a>
    <a href="https://www.mysql.com/">
        <img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="mysql"></a>
</p>

The project is a [Next.js](https://github.com/vercel/next.js) web application dedicated to a New Zealand special military unit who fought in France during the First World War (1914-1918): the _New Zealand Tunnelling Company_.

This company was formed at a time where the British Army struggled in their underground battle against the German miners beneath the no man's land. The [web application](https://www.nztunnellers.com) tells the original story of this special unit and shares the men's war experience.

## Contents

- [Contents](#contents)
- [Database](#database)
  - [Overview](#overview)
  - [Tables \[WIP\]](#tables-wip)
    - [Tunnellers Table](#tunnellers-table)
    - [Ranks Table](#ranks-table)
    - [Foreign Key Relationships](#foreign-key-relationships)

## Database

### Overview

The web application uses a MySQL database to manage data for the entire web application. It includes tables the history chapters and tunnellers, with relationships that support the core functionality of the app.

### Tables [WIP]

#### Tunnellers Table

| Column     | Type      | Key     | Default | Description                                                        |
| ---------- | --------- | ------- | ------- | ------------------------------------------------------------------ |
| `id`       | `INTEGER` | Primary | -       | -                                                                  |
| `surname`  | `VARCHAR` | -       | -       | -                                                                  |
| `forename` | `VARCHAR` | -       | -       | -                                                                  |
| `aka`      | `VARCHAR` | -       | `NULL`  | `aka`: "Also Know As" (when name given at enlistment is different) |
| `rank_fk`  | `INTEGER` | Foreign | `NULL`  | Rank at enlistment                                                 |

#### Ranks Table

| Column    | Type      | Key     | Default | Description     |
| --------- | --------- | ------- | ------- | --------------- |
| `rank_id` | `INTEGER` | Primary | -       | -               |
| `rank_en` | `VARCHAR` | -       | -       | Rank in English |
| `rank_fr` | `VARCHAR` | -       | -       | Rank in French  |

#### Foreign Key Relationships

| Table      | Column    | Table | Column    |
| ---------- | --------- | ----- | --------- |
| tunnellers | `rank_fk` | ranks | `rank_id` |

[↑ Back to Contents](#contents)
