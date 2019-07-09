DROP DATABASE IF EXISTS regretsy_reviews;

CREATE DATABASE regretsy_reviews;

USE regretsy_reviews;

CREATE TABLE reviews (
    reviewerID VARCHAR(500) PRIMARY KEY,
    reviewerName VARCHAR(500),
    reviewDate VARCHAR(500),
    reviewRating INT,
    reviewText TEXT 
);