# Library Management System - Data Layer

This repository contains the backend database schema and seeding
configurations for a library book catalog, built with NestJS, Prisma
ORM, and PostgreSQL.

## Schema Decisions

### Referencing vs. Embedding (Book and Genre)

In this schema design, the `Book` model references the `Genre` model
using a foreign key (`genreId`) rather than embedding the genre data
directly within the book record.

-   **Normalization & Consistency:** By using a relational approach, we
    adhere to database normalization. If a genre's metadata (like a
    description or category tag) needs to be updated, we only modify a
    single row in the `Genre` table. All associated books instantly
    reflect this truth.
-   **Storage Efficiency:** Embedding the genre string or object inside
    every book record would duplicate data hundreds or thousands of
    times, bloating the database size.
-   **Query Flexibility:** A dedicated `Genre` table allows us to easily
    query "all available genres in the library" or filter books by
    traversing the relationship, which is highly efficient in
    PostgreSQL.

### Stretch Goal: Prisma Relational Modeling vs. Document Databases

**Reflections on the Modeling Experience:**

Modeling data in Prisma (designed primarily for SQL/relational
databases) requires explicit declarations of foreign keys and relational
mappings (e.g., `@relation(fields: [genreId], references: [id])`). It
strictly enforces schema validation and data integrity at the database
level.

In contrast, modeling this in a Document Database (like MongoDB via
Mongoose) feels less structured. In a document model, there is a
constant architectural tug-of-war between *embedding* reviews directly
into the book document (for faster read performance) versus
*referencing* them (to prevent unbounded document growth). Prisma's
relational approach removes this ambiguity: a separate `Review` table is
naturally the correct choice for scaling one-to-many relationships
without hitting document size limits.

## Terminal Commands

Execute these commands from inside your `api/` directory (where your
`package.json` and `prisma/` folder reside).

### 1. Run the database migration

``` bash
npx prisma migrate dev --name init_library_schema
```

### 2. Generate the Prisma Client

``` bash
npx prisma generate
```

### 3. Run the seed script

*(Ensure you have `ts-node` installed, or configure Prisma seeding in
your `package.json`.)*

``` bash
npx ts-node prisma/seed.ts
```
