# New Zealand Tunnellers Database

The web application uses a MySQL database to manage data for the entire web application, including the history of the company and the tunnellers information.

## Contents

- [New Zealand Tunnellers Database](#new-zealand-tunnellers-database)
  - [Contents](#contents)
  - [History](#history)
    - [History Tables](#history-tables)
      - [Article](#article)
      - [Article Image](#article-image)
      - [Article Image Join](#article-image-join)
      - [Article Section](#article-section)
      - [Article Section Join](#article-section-join)
    - [History Foreign Key Relationships](#history-foreign-key-relationships)
  - [Tunnellers](#tunnellers)
    - [Tunnellers Tables](#tunnellers-tables)
      - [Tunneller](#tunneller)
      - [Rank](#rank)
      - [Embarkation Unit](#embarkation-unit)
      - [Training](#training)
      - [Training Location Type](#training-location-type)
      - [Transport](#transport)
      - [Transport Reference](#transport-reference)
      - [Transport Vessel](#transport-vessel)
      - [Section](#section)
      - [Corps](#corps)
      - [Country](#country)
      - [Religion](#religion)
      - [Marital Status](#marital-status)
      - [Occupation](#occupation)
      - [Last Employer](#last-employer)
      - [Town](#town)
      - [Military District](#military-district)
      - [Death Type](#death-type)
      - [Death Location](#death-location)
      - [Death Cause](#death-cause)
      - [Death Circumstances](#death-circumstances)
      - [Cemetery](#cemetery)
      - [Nominal Roll](#nominal-roll)
      - [Archives](#archives)
      - [Archives Name](#archives-name)
      - [Book](#book)
      - [Author](#author)
      - [Author Book Join](#author-book-join)
      - [Family](#family)
      - [Newspaper](#newspaper)
      - [Newspaper name](#newspaper-name)
    - [Tunnellers Foreign Key Relationships](#tunnellers-foreign-key-relationships)

## History

### History Tables

#### Article

| Column      | Type       | Key     | Default | Description                    |
| ----------- | ---------- | ------- | ------- | ------------------------------ |
| `id`        | `tinyint`  | Primary | -       | -                              |
| `string_id` | `tinytext` | -       | -       | Title of article as kebab case |
| `title`     | `tinytext` | -       | -       | Title of article               |
| `notes`     | `text`     | -       | -       | Footnotes                      |

#### Article Image

| Column         | Type       | Key     | Default | Description                     |
| -------------- | ---------- | ------- | ------- | ------------------------------- |
| `id`           | `tinyint`  | Primary | -       | -                               |
| `file`         | `tinytext` | -       | -       | Name of the file with extension |
| `title`        | `tinytext` | -       | `NULL`  | Title of the image              |
| `photographer` | `tinytext` | -       | `NULL`  | Photographer name               |
| `reference`    | `tinytext` | -       | `NULL`  | Source of the image             |
| `alt`          | `tinytext` | -       | `NULL`  | Alternative text for a11y       |

#### Article Image Join

| Column       | Type       | Key     | Default | Description                    |
| ------------ | ---------- | ------- | ------- | ------------------------------ |
| `id`         | `tinyint`  | Primary | -       | -                              |
| `article_id` | `tinytext` | -       | -       | Title of article as kebab case |
| `image_id`   | `tinyint`  | -       | -       | Image id                       |

#### Article Section

| Column  | Type       | Key     | Default | Description          |
| ------- | ---------- | ------- | ------- | -------------------- |
| `id`    | `tinyint`  | Primary | -       | -                    |
| `title` | `tinytext` | -       | -       | Title of the section |
| `text`  | `text`     | -       | -       | -                    |

#### Article Section Join

| Column       | Type       | Key     | Default | Description                    |
| ------------ | ---------- | ------- | ------- | ------------------------------ |
| `id`         | `tinyint`  | Primary | -       | -                              |
| `article_id` | `tinytext` | -       | -       | Title of article as kebab case |
| `section_id` | `tinyint`  | -       | -       | Section id                     |

### History Foreign Key Relationships

| Table           | Column      | Table                | Column       |
| --------------- | ----------- | -------------------- | ------------ |
| article         | `string_id` | article_image_join   | `article_id` |
| article_image   | `id`        | article_image_join   | `image_id`   |
| article         | `string_id` | article_section_join | `article_id` |
| article_section | `id`        | article_section_join | `section_id` |

[↑ Back to Contents](#contents)

## Tunnellers

### Tunnellers Tables

#### Tunneller

| Column                            | Type       | Key     | Default | Description                                                   |
| --------------------------------- | ---------- | ------- | ------- | ------------------------------------------------------------- |
| `id`                              | `smallint` | Primary | -       | -                                                             |
| `surname`                         | `varchar`  | -       | -       | -                                                             |
| `forename`                        | `varchar`  | -       | -       | -                                                             |
| `aka`                             | `varchar`  | -       | `NULL`  | Different name given at enlistment                            |
| `rank_fk`                         | `tinyint`  | Foreign | -       | Rank at enlistment                                            |
| `serial`                          | `varchar`  | -       | -       | Serial number                                                 |
| `embarkation_unit_fk`             | `tinyint`  | Foreign | -       | Main Body or Reinforcements                                   |
| `section_fk`                      | `tinyint`  | Foreign | `NULL`  | Sections in the Main Body                                     |
| `attached_corps_fk`               | `tinyint`  | Foreign | `NULL`  | Attached personnel                                            |
| `birth_date`                      | `date`     | -       | `NULL`  | -                                                             |
| `birth_country_fk`                | `tinyint`  | Foreign | `NULL`  | -                                                             |
| `mother_name`                     | `varchar`  | -       | `NULL`  | -                                                             |
| `mother_origin_fk`                | `tinyint`  | Foreign | `NULL`  | -                                                             |
| `father_name`                     | `varchar`  | -       | `NULL`  | -                                                             |
| `father_origin_fk`                | `tinyint`  | Foreign | `NULL`  | -                                                             |
| `nz_resident_in_month`            | `smallint` | -       | `NULL`  | Resident in month at enlistment                               |
| `religion_fk`                     | `tinyint`  | Foreign | `NULL`  | -                                                             |
| `marital_status_fk`               | `tinyint`  | Foreign | `NULL`  | -                                                             |
| `wife_name`                       | `varchar`  | -       | `NULL`  | -                                                             |
| `occupation_fk`                   | `smallint` | Foreign | `NULL`  | -                                                             |
| `last_employer_fk`                | `smallint` | Foreign | `NULL`  | Last employer before enlistment                               |
| `town_fk`                         | `smallint` | Foreign | `NULL`  | Town of residence at enlistment                               |
| `enlistment_date`                 | `date`     | -       | `NULL`  | -                                                             |
| `military_district_fk`            | `tinyint`  | Foreign | `NULL`  | -                                                             |
| `posted_date`                     | `date`     | -       | `NULL`  | Men posted to the Tunnellers                                  |
| `posted_corps_fk`                 | `tinyint`  | Foregin | `NULL`  | Corps before joining the Tunnellers                           |
| `transport_nz_fk`                 | `tinyint`  | Foregin | `NULL`  | Transport back to New Zealand                                 |
| `discharge_uk`                    | `tinyint`  | -       | `NULL`  | Discharged in UK                                              |
| `has_deserted`                    | `tinyint`  | -       | `NULL`  | -                                                             |
| `service_end`                     | `date`     | -       | `NULL`  | Date of end of service                                        |
| `transferred_fk`                  | `tinyint`  | Foreign | `NULL`  | Transferred to another corps during the war                   |
| `death_date`                      | `date`     | -       | `NULL`  | -                                                             |
| `death_type_fk`                   | `tinyint`  | Foreign | `NULL`  | War, War injuries or After war                                |
| `death_location_fk`               | `tinyint`  | Foreign | `NULL`  | -                                                             |
| `death_town_fk`                   | `smallint` | Foreign | `NULL`  | -                                                             |
| `death_cause_fk`                  | `tinyint`  | Foreign | `NULL`  | Death cause                                                   |
| `death_circumstances_fk`          | `tinyint`  | Foreign | `NULL`  | Death circumstances                                           |
| `cemetery_fk`                     | `tinyint`  | Foreign | `NULL`  | Cemetery information                                          |
| `grave_reference`                 | `varchar`  | -       | `NULL`  | -                                                             |
| `nominal_roll_fk`                 | `tinyint`  | Foreign | `NULL`  | Nominal Roll of NZ Expeditionary Force                        |
| `awwm_cenotaph`                   | `varchar`  | -       | `NULL`  | Reference to the Auckland War Memorial Museum Online Cenotaph |
| `image`                           | `tinytext` | -       | `NULL`  | Image file name                                               |
| `image_source_archives_fk`        | `tinyint`  | Foreign | `NULL`  | If image from archives                                        |
| `image_source_auckland_libraries` | `tinyint`  | -       | `NULL`  | If image from Auckland Libraries                              |
| `image_source_book_fk`            | `tinyint`  | Foreign | `NULL`  | If image from book                                            |
| `image_source_family_fk`          | `tinyint`  | Foreign | `NULL`  | If image from family archives                                 |
| `image_source_newspaper_fk`       | `tinyint`  | Foreign | `NULL`  | If image from newspaper                                       |

#### Rank

| Column    | Type      | Key     | Default | Description     |
| --------- | --------- | ------- | ------- | --------------- |
| `rank_id` | `tinyint` | Primary | -       | -               |
| `rank_en` | `varchar` | -       | -       | Rank in English |
| `rank_fr` | `varchar` | -       | -       | Rank in French  |

#### Embarkation Unit

| Column                | Type      | Key     | Default | Description                 |
| --------------------- | --------- | ------- | ------- | --------------------------- |
| `embarkation_unit_id` | `tinyint` | Primary | -       | -                           |
| `embarkation_unit_en` | `varchar` | -       | -       | Embarkation unit in English |
| `embarkation_unit_fr` | `varchar` | -       | -       | Embarkation unit in French  |
| `training_fk`         | `tinyint` | Foreign | -       | Training information        |
| `transport_uk_fk`     | `tinyint` | Foreign | -       | Transport to UK information |

#### Training

| Column                   | Type      | Key     | Default | Description                   |
| ------------------------ | --------- | ------- | ------- | ----------------------------- |
| `training_id`            | `tinyint` | Primary | -       | -                             |
| `training_start`         | `date`    | -       | -       | -                             |
| `training_location`      | `enum`    | -       | -       | where the training took place |
| `training_location_type` | `tinyint` | Foreing | -       | -                             |

#### Training Location Type

| Column                      | Type      | Key     | Default | Description              |
| --------------------------- | --------- | ------- | ------- | ------------------------ |
| `training_location_type_id` | `tinyint` | Primary | -       | -                        |
| `training_location_type_en` | `varchar` | -       | -       | Location type in English |
| `training_location_type_fr` | `varchar` | -       | -       | Location type in French  |

#### Transport

| Column                  | Type       | Key     | Default | Description         |
| ----------------------- | ---------- | ------- | ------- | ------------------- |
| `transport_id`          | `tinyint`  | Primary | -       | -                   |
| `transport_ref_fk`      | `varchar`  | Foreign | -       | Transport reference |
| `transport_vessel_fk`   | `varchar`  | Foreign | -       | Vessel name         |
| `transport_start`       | `date`     | -       | -       | -                   |
| `transport_end`         | `date`     | -       | -       | -                   |
| `transport_origin`      | `tinytext` | -       | -       | -                   |
| `transport_destination` | `tinytext` | -       | -       | -                   |

#### Transport Reference

| Column               | Type       | Key     | Default | Description |
| -------------------- | ---------- | ------- | ------- | ----------- |
| `transport_ref_id`   | `tinyint`  | Primary | -       | -           |
| `transport_ref_name` | `tinytext` | -       | -       | -           |

#### Transport Vessel

| Column                  | Type       | Key     | Default | Description |
| ----------------------- | ---------- | ------- | ------- | ----------- |
| `transport_vessel_id`   | `tinyint`  | Primary | -       | -           |
| `transport_vessel_name` | `tinytext` | -       | -       | -           |

#### Section

| Column       | Type      | Key     | Default | Description        |
| ------------ | --------- | ------- | ------- | ------------------ |
| `section_id` | `tinyint` | Primary | -       | -                  |
| `section_en` | `varchar` | -       | -       | Section in English |
| `section_fr` | `varchar` | -       | -       | Section in French  |

#### Corps

| Column     | Type      | Key     | Default | Description      |
| ---------- | --------- | ------- | ------- | ---------------- |
| `corps_id` | `tinyint` | Primary | -       | -                |
| `corps_en` | `varchar` | -       | -       | Corps in English |
| `corps_fr` | `varchar` | -       | -       | Corps in French  |

#### Country

| Column       | Type      | Key     | Default | Description        |
| ------------ | --------- | ------- | ------- | ------------------ |
| `country_id` | `tinyint` | Primary | -       | -                  |
| `country_en` | `varchar` | -       | -       | Country in English |
| `country_fr` | `varchar` | -       | -       | Country in French  |

#### Religion

| Column        | Type      | Key     | Default | Description         |
| ------------- | --------- | ------- | ------- | ------------------- |
| `religion_id` | `tinyint` | Primary | -       | -                   |
| `religion_en` | `varchar` | -       | -       | Religion in English |
| `religion_fr` | `varchar` | -       | -       | Religion in French  |

#### Marital Status

| Column              | Type      | Key     | Default | Description               |
| ------------------- | --------- | ------- | ------- | ------------------------- |
| `marital_status_id` | `tinyint` | Primary | -       | -                         |
| `marital_status_en` | `varchar` | -       | -       | Marital status in English |
| `marital_status_fr` | `varchar` | -       | -       | Marital status in French  |

#### Occupation

| Column          | Type       | Key     | Default | Description           |
| --------------- | ---------- | ------- | ------- | --------------------- |
| `occupation_id` | `smallint` | Primary | -       | -                     |
| `occupation_en` | `varchar`  | -       | -       | Occupation in English |
| `occupation_fr` | `varchar`  | -       | -       | Occupation in French  |

#### Last Employer

| Column               | Type       | Key     | Default | Description |
| -------------------- | ---------- | ------- | ------- | ----------- |
| `last_employer_id`   | `smallint` | Primary | -       | -           |
| `last_employer_name` | `tinytext` | -       | -       | -           |

#### Town

| Column            | Type       | Key     | Default | Description |
| ----------------- | ---------- | ------- | ------- | ----------- |
| `town_id`         | `smallint` | Primary | -       | -           |
| `town_name`       | `tinytext` | -       | -       | -           |
| `town_country_fk` | `tinyint`  | Foregin | -       | -           |

#### Military District

| Column                   | Type      | Key     | Default | Description |
| ------------------------ | --------- | ------- | ------- | ----------- |
| `military_district_id`   | `tinyint` | Primary | -       | -           |
| `military_district_name` | `varchar` | -       | -       | -           |

#### Death Type

| Column          | Type       | Key     | Default | Description           |
| --------------- | ---------- | ------- | ------- | --------------------- |
| `death_type_id` | `tinyint`  | Primary | -       | -                     |
| `death_type_en` | `tinytext` | -       | -       | Death type in English |
| `death_type_fr` | `tinytext` | -       | -       | Death type in French  |

#### Death Location

| Column              | Type       | Key     | Default | Description               |
| ------------------- | ---------- | ------- | ------- | ------------------------- |
| `death_location_id` | `tinyint`  | Primary | -       | -                         |
| `death_location_en` | `tinytext` | -       | -       | Death location in English |
| `death_location_fr` | `tinytext` | -       | -       | Death location in French  |

#### Death Cause

| Column           | Type      | Key     | Default | Description            |
| ---------------- | --------- | ------- | ------- | ---------------------- |
| `death_cause_id` | `tinyint` | Primary | -       | -                      |
| `death_cause_en` | `varchar` | -       | -       | Death cause in English |
| `death_cause_fr` | `varchar` | -       | -       | Death cause in French  |

#### Death Circumstances

| Column                   | Type       | Key     | Default | Description                    |
| ------------------------ | ---------- | ------- | ------- | ------------------------------ |
| `death_circumstances_id` | `tinyint`  | Primary | -       | -                              |
| `death_circumstances_en` | `tinytext` | -       | -       | Death circumstances in English |
| `death_circumstances_fr` | `tinytext` | -       | -       | Death circumstances in French  |

#### Cemetery

| Column             | Type       | Key     | Default | Description              |
| ------------------ | ---------- | ------- | ------- | ------------------------ |
| `cemetery_id`      | `tinyint`  | Primary | -       | -                        |
| `cemetery_name_en` | `tinytext` | -       | -       | Cemetery name in English |
| `cemetery_name_fr` | `tinytext` | -       | -       | Cemetery name in French  |
| `cemetery_town_id` | `smallint` | Foreign | -       | Cemetery location        |

#### Nominal Roll

| Column                | Type       | Key     | Default | Description                               |
| --------------------- | ---------- | ------- | ------- | ----------------------------------------- |
| `nominal_roll_id`     | `tinyint`  | Primary | -       | -                                         |
| `nominal_roll_volume` | `enum`     | -       | -       | Either 'II' or 'III'                      |
| `nominal_roll_number` | `enum`     | -       | -       | Either '34', '45', '55', '62', '69', '75' |
| `nominal_roll_page`   | `tinytext` | -       | -       | -                                         |

#### Archives

| Column              | Type       | Key     | Default | Description            |
| ------------------- | ---------- | ------- | ------- | ---------------------- |
| `archives_id`       | `tinyint`  | Primary | -       | -                      |
| `archives_name_fk`  | `tinyint`  | Foreign | -       | -                      |
| `archives_ref`      | `tinytext` | -       | -       | -                      |
| `archives_title_en` | `tinytext` | -       | -       | Description in English |
| `archives_title_fr` | `tinytext` | -       | -       | Description in French  |

#### Archives Name

| Column             | Type      | Key     | Default | Description |
| ------------------ | --------- | ------- | ------- | ----------- |
| `archives_name_id` | `tinyint` | Primary | -       | -           |
| `archives_name`    | `tinyint` | -       | -       | -           |

#### Book

| Column           | Type       | Key     | Default | Description         |
| ---------------- | ---------- | ------- | ------- | ------------------- |
| `book_id`        | `tinyint`  | Primary | -       | -                   |
| `book_title`     | `tinytext` | -       | -       | Title of the book   |
| `book_town`      | `tinytext` | -       | -       | Publisher location  |
| `book_publisher` | `tinytext` | -       | -       | Name of publisher   |
| `book_year`      | `tinytext` | -       | -       | Year of publication |
| `book_page`      | `smallint` | -       | -       | Page of the book    |

#### Author

| Column            | Type       | Key     | Default | Description |
| ----------------- | ---------- | ------- | ------- | ----------- |
| `author_id`       | `tinyint`  | Primary | -       | -           |
| `author_forename` | `tinytext` | -       | -       | -           |
| `author_surname`  | `tinytext` | -       | -       | -           |

#### Author Book Join

| Column             | Type      | Key     | Default | Description |
| ------------------ | --------- | ------- | ------- | ----------- |
| `id`               | `tinyint` | Primary | -       | -           |
| `author_book_a_id` | `tinyint` | Foreign | -       | Author key  |
| `author_book_b_id` | `tinyint` | Foreign | -       | Book key    |

#### Family

| Column        | Type       | Key     | Default | Description |
| ------------- | ---------- | ------- | ------- | ----------- |
| `family_id`   | `tinyint`  | Primary | -       | -           |
| `family_name` | `tinytext` | -       | -       | -           |

#### Newspaper

| Column              | Type       | Key     | Default | Description |
| ------------------- | ---------- | ------- | ------- | ----------- |
| `newspaper_id`      | `tinyint`  | Primary | -       | -           |
| `newspaper_name_fk` | `tinytext` | -       | -       | -           |
| `newspaper_date`    | `tinytext` | -       | -       | -           |

#### Newspaper name

| Column              | Type       | Key     | Default | Description |
| ------------------- | ---------- | ------- | ------- | ----------- |
| `newspaper_name_id` | `tinyint`  | Primary | -       | -           |
| `newspaper_name`    | `tinytext` | -       | -       | -           |

### Tunnellers Foreign Key Relationships

| Table            | Column                      | Table                  | Column                      |
| ---------------- | --------------------------- | ---------------------- | --------------------------- |
| tunneller        | `rank_fk`                   | rank                   | `rank_id`                   |
| tunneller        | `embarkation_unit_fk`       | embarkation_unit       | `embarkation_unit_id`       |
| embarkation_unit | `training_fk`               | training               | `training_id`               |
| training         | `training_location_type`    | training_location_type | `training_location_type_id` |
| embarkation_unit | `transport_uk_fk`           | transport              | `transport_id`              |
| transport        | `transport_ref_fk`          | transport_reference    | `transport_ref_id`          |
| transport        | `transport_vessel_fk`       | transport_vessel       | `transport_vessel_id`       |
| tunneller        | `section_fk`                | section                | `section_id`                |
| tunneller        | `attached_corps_fk`         | corps                  | `corps_id`                  |
| tunneller        | `birth_country_fk`          | country                | `country_id`                |
| tunneller        | `mother_origin_fk`          | country                | `country_id`                |
| tunneller        | `father_origin_fk`          | country                | `country_id`                |
| tunneller        | `religion_fk`               | religion               | `religion_id`               |
| tunneller        | `marital_status_fk`         | marital_status         | `marital_status_id`         |
| tunneller        | `occupation_fk`             | occupation             | `ocupation_id`              |
| tunneller        | `last_employer_fk`          | last_employer          | `last_employer_id`          |
| tunneller        | `town_fk`                   | town                   | `town_id`                   |
| town             | `town_country_fk`           | country                | `country_id`                |
| tunneller        | `military_district_fk`      | military_district      | `military_district_id`      |
| tunneller        | `posted_corps_fk`           | corps                  | `corps_id`                  |
| tunneller        | `transport_nz_fk`           | transport              | `transport_id`              |
| tunneller        | `transferred_fk`            | corps                  | `corps_id`                  |
| tunneller        | `death_type_fk`             | death_type             | `death_type_id`             |
| tunneller        | `death_location_fk`         | death_location         | `death_location_id`         |
| tunneller        | `death_town_fk`             | town                   | `town_id`                   |
| tunneller        | `death_cause_fk`            | death_cause            | `death_cause_id`            |
| tunneller        | `cemetery_fk`               | cemetery               | `cemetery_id`               |
| cemetery         | `cemetery_town_id`          | town                   | `town_id`                   |
| tunneller        | `nominal_roll_fk`           | nominal_roll           | `nominal_roll_id`           |
| tunneller        | `image_source_archives_fk`  | archives               | `archives_id`               |
| archives         | `archives_name_fk`          | archives_name          | `archives_name_id`          |
| tunneller        | `image_source_book_fk`      | book                   | `book_id`                   |
| author           | `author_id`                 | author_book_join       | `author_book_a_id`          |
| book             | `book_id`                   | author_book_join       | `author_book_b_id`          |
| tunneller        | `image_source_family_fk`    | family                 | `family_id`                 |
| tunneller        | `image_source_newspaper_fk` | newspaper              | `newspaper_id`              |
| newspaper        | `newspaper_name_fk`         | newspaper_name         | `newspaper_name_id`         |

[↑ Back to Contents](#contents)
