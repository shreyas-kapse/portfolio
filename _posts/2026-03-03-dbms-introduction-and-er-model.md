---
category: DBMS
date: 2026-03-03
excerpt: Deep dive into ACID properties, functional dependency,
  normalization forms (1NF--4NF, BCNF), and keys in DBMS.
layout: post
read_time: 4
subtitle: Understand transactions, functional dependency, and
  normalization up to 4NF
tags: [dbms, backend, normalization, interviews]
title: ACID Properties, Normalization (1NF–4NF) & Keys in DBMS Explained Clearly
---

# ACID Properties in DBMS

ACID ensures reliable database transactions.

Atomicity : A transaction must either complete entirely or not execute at all.

Consistency : The database must remain valid before and after the transaction.

Isolation : Multiple transactions execute independently without interference.

Durability : Once a transaction is committed, it remains permanent even after a
system crash.

------------------------------------------------------------------------

# Normalization in DBMS

Normalization is a technique used to reduce redundancy and improve data
integrity.

------------------------------------------------------------------------

## Functional Dependency

If X → Y, then Y is functionally dependent on X.

Example: EmpID → EmpName

------------------------------------------------------------------------

## 1NF (First Normal Form)

-   All attributes must have atomic values.
-   Each record must be unique.

------------------------------------------------------------------------

## 2NF (Second Normal Form)

-   Must be in 1NF.
-   No partial dependency.
-   All non-key attributes must fully depend on the primary key.

------------------------------------------------------------------------

## 3NF (Third Normal Form)

-   Must be in 2NF.
-   No transitive dependency.

------------------------------------------------------------------------

## BCNF (Boyce-Codd Normal Form)

-   Must be in 3NF.
-   Left side of every functional dependency must be a candidate key.

------------------------------------------------------------------------

## 4NF (Fourth Normal Form)

-   Must be in BCNF.
-   No multivalued dependency.
![Normalization Image](/portfolio/assets/images/dbms_normalization.png)

------------------------------------------------------------------------

# Keys in DBMS

Keys are used to uniquely identify records and establish relationships
between tables.

Primary Key : Unique and not null.

Candidate Key : Attribute(s) that can uniquely identify a record.

Super Key : A set of attributes that uniquely identify records.

Foreign Key : References the primary key of another table.

Composite Key : Primary key consisting of multiple attributes.

Alternate Key : Candidate keys not selected as primary key.
![DBMS Keys Image](/portfolio/assets/images/keys_in_dbms.png)
------------------------------------------------------------------------

Master DBMS step by step with this structured series.