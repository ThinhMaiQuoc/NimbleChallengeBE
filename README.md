# NimbleChallengeBE

## Overview

NimbleChallengeBE is a backend service for a web application that extracts and analyzes data from Google search results. It manages user authentication, keyword uploads, data scraping, and provides insightful analytics.

## Features

### User Authentication
- **Sign Up and Sign In**: Secure user registration and login functionality.

### Keyword Management
- **CSV Upload**: Users can upload CSV files with up to 100 keywords.
- **Keyword Processing**: Each uploaded keyword triggers a Google search, and results are stored.

### Data Scraping
- **Automated Scraping**: Extracts data such as AdWords count, link count, and total search results from Google.

### Data Visualization
- **Keyword and Results Viewing**: Users can view their uploaded keywords and corresponding search results.

### Additional Features
- **RESTful API**: Provides various endpoints for interacting with the application.

## Missing Features
- **Unit Tests**: Unit tests are currently not implemented and are a necessary addition for future development.

## Technology Stack
- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web application framework for Node.js.
- **PostgreSQL**: Database for storing user data and search results.
- **Knex.js**: SQL query builder.
- **Bull**: Queue system for managing data scraping tasks.
