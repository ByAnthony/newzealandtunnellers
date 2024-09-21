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
    - [Embarkation Units Table](#embarkation-units-table)
    - [Trainings Table](#trainings-table)
    - [Training Location Types Table](#training-location-types-table)
    - [Foreign Key Relationships](#foreign-key-relationships)

## Database

### Overview

The web application uses a MySQL database to manage data for the entire web application. It includes tables the history chapters and tunnellers, with relationships that support the core functionality of the app.

### Tables [WIP]

#### Tunnellers Table

| Column                | Type      | Key     | Default | Description                                              |
| --------------------- | --------- | ------- | ------- | -------------------------------------------------------- |
| `id`                  | `INTEGER` | Primary | -       | -                                                        |
| `surname`             | `VARCHAR` | -       | -       | -                                                        |
| `forename`            | `VARCHAR` | -       | -       | -                                                        |
| `aka`                 | `VARCHAR` | -       | `NULL`  | Also Know As; when name given at enlistment is different |
| `rank_fk`             | `INTEGER` | Foreign | `NULL`  | Rank at enlistment                                       |
| `serial`              | `VARCHAR` | -       | -       | Serial number                                            |
| `embarkation_unit_fk` | `INTEGER` | Foreign | `NULL`  | Main Body or Reinforcements                              |

#### Ranks Table

| Column    | Type      | Key     | Default | Description     |
| --------- | --------- | ------- | ------- | --------------- |
| `rank_id` | `INTEGER` | Primary | -       | -               |
| `rank_en` | `VARCHAR` | -       | -       | Rank in English |
| `rank_fr` | `VARCHAR` | -       | -       | Rank in French  |

#### Embarkation Units Table

| Column                | Type      | Key     | Default | Description                 |
| --------------------- | --------- | ------- | ------- | --------------------------- |
| `embarkation_unit_id` | `INTEGER` | Primary | -       | -                           |
| `embarkation_unit_en` | `VARCHAR` | -       | -       | Embarkation unit in English |
| `embarkation_unit_fr` | `VARCHAR` | -       | -       | Embarkation unit in French  |
| `embarkation_unit_fr` | `VARCHAR` | -       | -       | Embarkation unit in French  |
| `training_fk`         | `INTEGER` | Foreign | -       | Training information        |
| `transport_uk_fk`     | `INTEGER` | Foreign | -       | Transport to UK information |

#### Trainings Table

| Column                   | Type      | Key     | Default | Description                   |
| ------------------------ | --------- | ------- | ------- | ----------------------------- |
| `training_id`            | `INTEGER` | Primary | -       | -                             |
| `training_start`         | `DATE`    | -       | -       | -                             |
| `training_location`      | `ENUM`    | -       | -       | where the training took place |
| `training_location_type` | `INTEGER` | Foreing | -       | -                             |

#### Training Location Types Table

| Column                      | Type      | Key     | Default | Description              |
| --------------------------- | --------- | ------- | ------- | ------------------------ |
| `training_location_type_id` | `INTEGER` | Primary | -       | -                        |
| `training_location_type_en` | `VARCHAR` | -       | -       | Location type in English |
| `training_location_type_fr` | `VARCHAR` | -       | -       | Location type in French  |

#### Foreign Key Relationships

| Table             | Column                   | Table                   | Column                      |
| ----------------- | ------------------------ | ----------------------- | --------------------------- |
| tunnellers        | `rank_fk`                | ranks                   | `rank_id`                   |
| tunnellers        | `embarkation_unit_fk`    | embarkation_units       | `embarkation_unit_id`       |
| embarkation_units | `training_fk`            | trainings               | `training_id`               |
| trainings         | `training_location_type` | training_location_types | `training_location_type_id` |

[↑ Back to Contents](#contents)
