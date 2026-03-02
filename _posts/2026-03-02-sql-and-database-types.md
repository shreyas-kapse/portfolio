---
category: DBMS
date: 2026-03-02
excerpt: Learn SQL fundamentals, types of databases (Relational vs
  NoSQL), SQL commands, and data types with examples.
layout: post
read_time: 10
subtitle: Relational vs NoSQL databases and SQL commands explained
tags:
- sql
- database
- nosql
- backend
- programming
title: SQL Tutorial for Beginners: Commands, Data Types & Database Types Explained
---

# Types of Databases

## Relational Databases (SQL)

-   Data is stored in tables.
-   Organized into rows and columns.
-   Each row is identified by a unique key.

------------------------------------------------------------------------

## Non-Relational Databases (NoSQL)

-   Key-value stores
-   Document-based databases (JSON, XML)
-   Graph databases
-   Flexible schema systems

------------------------------------------------------------------------

# What is SQL?

SQL (Structured Query Language) is a standardized language used to
interact with relational database systems.

Used for:

-   Querying data
-   Creating tables
-   Updating records
-   Managing users and permissions

------------------------------------------------------------------------

# Types of SQL Commands

## DQL (Data Query Language)

SELECT

## DDL (Data Definition Language)

CREATE, DROP, ALTER

## DML (Data Manipulation Language)

INSERT, UPDATE, DELETE

## DCL (Data Control Language)

GRANT, REVOKE

------------------------------------------------------------------------

# Common SQL Data Types

INT\
DECIMAL(M,N)\
VARCHAR(n)\
BLOB\
DATE\
TIMESTAMP

------------------------------------------------------------------------

# Basic SQL Examples

## Create Table

CREATE TABLE student ( student_id INT PRIMARY KEY, name VARCHAR(20) );

## Drop Table

DROP TABLE student;

## Add Column

ALTER TABLE student ADD gpa DECIMAL(3,2);

------------------------------------------------------------------------

## 📚 DBMS Learning Series

- 👉 [What is DBMS? Complete Beginner’s Guide](/dbms-introduction-and-er-model)
- 👉 [ACID Properties & Normalization Explained](/dbms-acid-normalization-keys)
- 👉 [SQL Tutorial for Beginners](/sql-and-database-types)

Master DBMS step by step with this structured series.