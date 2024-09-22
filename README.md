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
  - [History Tables](#history-tables)
  - [Tunnellers Tables](#tunnellers-tables)

## Database

### Overview

The web application uses a MySQL database to manage data for the entire web application, including the history of the company and the tunnellers information.

### History Tables

<details>
    <summary>Article</summary>

| Column      | Type       | Key     | Default | Description                    |
| ----------- | ---------- | ------- | ------- | ------------------------------ |
| `id`        | `int`      | Primary | -       | -                              |
| `string_id` | `tinytext` | -       | -       | Title of article as kebab case |
| `title`     | `tinytext` | -       | -       | Title of article               |
| `notes`     | `longtext` | -       | -       | Footnotes                      |

</details>

<details>
    <summary>Article Image</summary>

| Column         | Type       | Key     | Default | Description                     |
| -------------- | ---------- | ------- | ------- | ------------------------------- |
| `id`           | `int`      | Primary | -       | -                               |
| `file`         | `tinytext` | -       | -       | Name of the file with extension |
| `title`        | `text`     | -       | `NULL`  | Title of the image              |
| `photographer` | `text`     | -       | `NULL`  | Photographer name               |
| `reference`    | `text`     | -       | `NULL`  | Source of the image             |
| `alt`          | `text`     | -       | `NULL`  | Alternative text for a11y       |

</details>

<details>
    <summary>Article Image Join</summary>

| Column       | Type       | Key     | Default | Description                    |
| ------------ | ---------- | ------- | ------- | ------------------------------ |
| `id`         | `int`      | Primary | -       | -                              |
| `article_id` | `tinytext` | -       | -       | Title of article as kebab case |
| `image_id`   | `int`      | -       | -       | Image id                       |

</details>

<details>
    <summary>Article Section</summary>

| Column  | Type       | Key     | Default | Description          |
| ------- | ---------- | ------- | ------- | -------------------- |
| `id`    | `int`      | Primary | -       | -                    |
| `title` | `tinytext` | -       | -       | Title of the section |
| `text`  | `text`     | -       | -       | -                    |

</details>

<details>
    <summary>Article Section Join</summary>

| Column       | Type       | Key     | Default | Description                    |
| ------------ | ---------- | ------- | ------- | ------------------------------ |
| `id`         | `int`      | Primary | -       | -                              |
| `article_id` | `tinytext` | -       | -       | Title of article as kebab case |
| `section_id` | `int`      | -       | -       | Section id                     |

</details>

<details>
    <summary>Foreign Key Relationships</summary>

| Table           | Column      | Table                | Column       |
| --------------- | ----------- | -------------------- | ------------ |
| article         | `string_id` | article_image_join   | `article_id` |
| article_image   | `id`        | article_image_join   | `image_id`   |
| article         | `string_id` | article_section_join | `article_id` |
| article_section | `id`        | article_section_join | `section_id` |

</details>

### Tunnellers Tables

<details>
    <summary>Tunneller</summary>

| Column                 | Type        | Key     | Default | Description                        |
| ---------------------- | ----------- | ------- | ------- | ---------------------------------- |
| `id`                   | `mediumint` | Primary | -       | -                                  |
| `surname`              | `varchar`   | -       | -       | -                                  |
| `forename`             | `varchar`   | -       | -       | -                                  |
| `aka`                  | `varchar`   | -       | `NULL`  | Different name given at enlistment |
| `rank_fk`              | `int`       | Foreign | -       | Rank at enlistment                 |
| `serial`               | `varchar`   | -       | -       | Serial number                      |
| `embarkation_unit_fk`  | `int`       | Foreign | -       | Main Body or Reinforcements        |
| `section_fk`           | `int`       | Foreign | `NULL`  | Sections in the Main Body          |
| `attached_corps_fk`    | `int`       | Foreign | `NULL`  | Attached personnel                 |
| `birth_date`           | `date`      | -       | `NULL`  | -                                  |
| `birth_country_fk`     | `tinyint`   | Foreign | `NULL`  | -                                  |
| `mother_name`          | `varchar`   | -       | `NULL`  | -                                  |
| `mother_origin_fk`     | `int`       | Foreign | `NULL`  | -                                  |
| `father_name`          | `varchar`   | -       | `NULL`  | -                                  |
| `father_origin_fk`     | `int`       | Foreign | `NULL`  | -                                  |
| `nz_resident_in_month` | `int`       | -       | `NULL`  | Resident in month at enlistment    |
| `religion_fk`          | `int`       | -       | `NULL`  | -                                  |
| `marital_status_fk`    | `int`       | -       | `NULL`  | -                                  |

</details>

<details>
    <summary>Rank</summary>

| Column    | Type      | Key     | Default | Description     |
| --------- | --------- | ------- | ------- | --------------- |
| `rank_id` | `tinyint` | Primary | -       | -               |
| `rank_en` | `varchar` | -       | -       | Rank in English |
| `rank_fr` | `varchar` | -       | -       | Rank in French  |

</details>

<details>
    <summary>Embarkation Unit</summary>

| Column                | Type      | Key     | Default | Description                 |
| --------------------- | --------- | ------- | ------- | --------------------------- |
| `embarkation_unit_id` | `tinyint` | Primary | -       | -                           |
| `embarkation_unit_en` | `varchar` | -       | -       | Embarkation unit in English |
| `embarkation_unit_fr` | `varchar` | -       | -       | Embarkation unit in French  |
| `training_fk`         | `tinyint` | Foreign | -       | Training information        |
| `transport_uk_fk`     | `tinyint` | Foreign | -       | Transport to UK information |

</details>

<details>
    <summary>Training</summary>

| Column                   | Type      | Key     | Default | Description                   |
| ------------------------ | --------- | ------- | ------- | ----------------------------- |
| `training_id`            | `tinyint` | Primary | -       | -                             |
| `training_start`         | `date`    | -       | -       | -                             |
| `training_location`      | `enum`    | -       | -       | where the training took place |
| `training_location_type` | `tinyint` | Foreing | -       | -                             |

</details>

<details>
    <summary>Training Location Type</summary>

| Column                      | Type      | Key     | Default | Description              |
| --------------------------- | --------- | ------- | ------- | ------------------------ |
| `training_location_type_id` | `tinyint` | Primary | -       | -                        |
| `training_location_type_en` | `varchar` | -       | -       | Location type in English |
| `training_location_type_fr` | `varchar` | -       | -       | Location type in French  |

</details>

<details>
    <summary>Transport</summary>

| Column                  | Type       | Key     | Default | Description         |
| ----------------------- | ---------- | ------- | ------- | ------------------- |
| `transport_id`          | `int`      | Primary | -       | -                   |
| `transport_ref_fk`      | `varchar`  | Foreign | -       | Transport reference |
| `transport_vessel_fk`   | `varchar`  | Foreign | -       | Vessel name         |
| `transport_start`       | `date`     | -       | -       | -                   |
| `transport_end`         | `date`     | -       | -       | -                   |
| `transport_origin`      | `tinytext` | -       | -       | -                   |
| `transport_destination` | `tinytext` | -       | -       | -                   |

</details>

<details>
    <summary>Transport Reference</summary>

| Column               | Type       | Key     | Default | Description |
| -------------------- | ---------- | ------- | ------- | ----------- |
| `transport_ref_id`   | `tinyint`  | Primary | -       | -           |
| `transport_ref_name` | `tinytest` | -       | -       | -           |

</details>

<details>
    <summary>Transport Vessel</summary>

| Column                  | Type       | Key     | Default | Description |
| ----------------------- | ---------- | ------- | ------- | ----------- |
| `transport_vessel_id`   | `tinyint`  | Primary | -       | -           |
| `transport_vessel_name` | `tinytest` | -       | -       | -           |

</details>

<details>
    <summary>Section</summary>

| Column       | Type      | Key     | Default | Description        |
| ------------ | --------- | ------- | ------- | ------------------ |
| `section_id` | `tinyint` | Primary | -       | -                  |
| `section_en` | `varchar` | -       | -       | Section in English |
| `section_fr` | `varchar` | -       | -       | Section in French  |

</details>

<details>
    <summary>Corps</summary>

| Column     | Type      | Key     | Default | Description      |
| ---------- | --------- | ------- | ------- | ---------------- |
| `corps_id` | `tinyint` | Primary | -       | -                |
| `corps_en` | `varchar` | -       | -       | Corps in English |
| `corps_fr` | `varchar` | -       | -       | Corps in French  |

</details>

<details>
    <summary>Country</summary>

| Column       | Type      | Key     | Default | Description        |
| ------------ | --------- | ------- | ------- | ------------------ |
| `country_id` | `tinyint` | Primary | -       | -                  |
| `country_en` | `varchar` | -       | -       | Country in English |
| `country_fr` | `varchar` | -       | -       | Country in French  |

</details>

<details>
    <summary>Religion</summary>

| Column        | Type      | Key     | Default | Description         |
| ------------- | --------- | ------- | ------- | ------------------- |
| `religion_id` | `tinyint` | Primary | -       | -                   |
| `religion_en` | `varchar` | -       | -       | Religion in English |
| `religion_fr` | `varchar` | -       | -       | Religion in French  |

</details>

<details>
    <summary>Marital Status</summary>

| Column              | Type      | Key     | Default | Description               |
| ------------------- | --------- | ------- | ------- | ------------------------- |
| `marital_status_id` | `tinyint` | Primary | -       | -                         |
| `marital_status_en` | `varchar` | -       | -       | Marital status in English |
| `marital_status_fr` | `varchar` | -       | -       | Marital status in French  |

</details>

<details>
    <summary>Foreign Key Relationships</summary>

| Table            | Column                   | Table                  | Column                      |
| ---------------- | ------------------------ | ---------------------- | --------------------------- |
| tunneller        | `rank_fk`                | rank                   | `rank_id`                   |
| tunneller        | `embarkation_unit_fk`    | embarkation_unit       | `embarkation_unit_id`       |
| embarkation_unit | `training_fk`            | training               | `training_id`               |
| training         | `training_location_type` | training_location_type | `training_location_type_id` |
| embarkation_unit | `transport_uk_fk`        | transport              | `transport_id`              |
| transport        | `transport_ref_fk`       | transport_reference    | `transport_ref_id`          |
| transport        | `transport_vessel_fk`    | transport_vessel       | `transport_vessel_id`       |
| tunneller        | `section_fk`             | section                | `section_id`                |
| tunneller        | `attached_corps_fk`      | corps                  | `corps_id`                  |
| tunneller        | `birth_country_fk`       | country                | `country_id`                |
| tunneller        | `mother_origin_fk`       | country                | `country_id`                |
| tunneller        | `father_origin_fk`       | country                | `country_id`                |
| tunneller        | `religion_fk`            | religion               | `religion_id`               |
| tunneller        | `marital_status_fk`      | marital_status         | `marital_status_id`         |

</details>

[↑ Back to Contents](#contents)
