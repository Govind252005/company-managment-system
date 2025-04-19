// migrate.js
const sql = require('./db');
(async () => {
  try {
    // Departments
    await sql`
      CREATE TABLE IF NOT EXISTS departments (
        id         SERIAL PRIMARY KEY,
        name       VARCHAR(100),
        contact_no VARCHAR(20),
        head       VARCHAR(100)
      );
    `;

    // Employees
    await sql`
      CREATE TABLE IF NOT EXISTS employees (
        id            SERIAL PRIMARY KEY,
        name          VARCHAR(100),
        address       TEXT,
        designation   VARCHAR(100),
        contact_no    VARCHAR(20),
        salary        NUMERIC,
        department_id INT REFERENCES departments(id) ON DELETE SET NULL
      );
    `;

    // Products
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id            SERIAL PRIMARY KEY,
        name          VARCHAR(100),
        type          VARCHAR(100),
        price         NUMERIC,
        mfd           DATE,
        department_id INT REFERENCES departments(id) ON DELETE SET NULL
      );
    `;

    // Defects
    await sql`
      CREATE TABLE IF NOT EXISTS defects (
        id          SERIAL PRIMARY KEY,
        product_id  INT REFERENCES products(id) ON DELETE CASCADE,
        employee_id INT REFERENCES employees(id) ON DELETE SET NULL,
        description TEXT,
        defect_date DATE,
        status      VARCHAR(20)
      );
    `;

    // Customers
    await sql`
      CREATE TABLE IF NOT EXISTS customers (
        id         SERIAL PRIMARY KEY,
        name       VARCHAR(100),
        address    TEXT,
        contact_no VARCHAR(20)
      );
    `;

    // Suppliers
    await sql`
      CREATE TABLE IF NOT EXISTS suppliers (
        id         SERIAL PRIMARY KEY,
        name       VARCHAR(100),
        address    TEXT,
        contact_no VARCHAR(20)
      );
    `;

    // Raw Materials
    await sql`
      CREATE TABLE IF NOT EXISTS raw_materials (
        id       SERIAL PRIMARY KEY,
        name     VARCHAR(100),
        quantity INT,
        price    NUMERIC
      );
    `;

    // Product‐Materials (M:N)
    await sql`
      CREATE TABLE IF NOT EXISTS product_materials (
        product_id INT REFERENCES products(id) ON DELETE CASCADE,
        material_id INT REFERENCES raw_materials(id) ON DELETE CASCADE,
        PRIMARY KEY (product_id, material_id)
      );
    `;

    // Employee‐Product (M:N)
    await sql`
      CREATE TABLE IF NOT EXISTS employee_product (
        product_id  INT REFERENCES products(id) ON DELETE CASCADE,
        employee_id INT REFERENCES employees(id) ON DELETE CASCADE,
        PRIMARY KEY (product_id, employee_id)
      );
    `;

    // Users
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id       SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role     VARCHAR(20)    DEFAULT 'admin'
      );
    `;

    console.log('✅ All tables are created or already exist.');
  } catch (err) {
    console.error('❌ Migration error:', err);
  } finally {
    await sql.end();  // close the connection pool
  }
})();