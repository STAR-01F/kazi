# Jobs API

## Setup

### Get Dependencies

1. Run the following commands:

```
go mod init
go mod download
go mod tidy
```

2. Open the `.env` file and add the following lines:

   ```dotenv
   PROJECT_ID=trackify-10a37
   CREDENTIALS=config.json
   ALLOWED_ORIGINS={permissable URL string(s)}
   ALLOW_ORIGINS={permissable URL string(s)}
   PORT={your port number}
   ```

## Running the Project

To run the project, follow these steps:

1. Open a terminal window pointing to the jobs directory.

2. Run the following command:

   ```bash
   go run .
   ```


## Base URL

The base URL for the Jobs API is `https://yourdomain.com/api/v1/jobs`.


## Handlers

This package contains the HTTP request handlers for the job posting API.

CRUD operations are managed by the handlers (**CreateJob**, **GetJobs**, **UpdateJob**, **DeleteJob**) within handle.go


## Endpoints

### GET /jobs

Retrieves a list of all stored job postings.

#### Parameters

None.

#### Response

```json
[
  {
    "title": "Software Engineer",
    "description": "Remote role, backend focused",
    "company": "STARS",
    "status": "in progress",
    ...optionalfields,
  },
]
```

### GET /jobs?jobid= [jobidvalue]

Retrieves the job listing for the provided job id value.

#### Parameters

A jobid string.

#### Response

```json

  {
    "title": "Hello World",
    "description": "hola mundial",
    "company": "STARS Global",
    "status": "successful",
    ...optionalfields,
  },

```

### POST /jobs

Stores the provided details with the Firebase service.

#### Parameters

A JSON object with any using any of the following as values, compulsory keys bolded.

{  
**"title"**,
**"description"**,
**"company"**,
"keywords",
**"status"**,
}

#### Response

A JSON object with the time & date 

```json

  {
   "UpdateTime":"2024-01-01T18:01:02"
  },

```

### PUT /jobs?jobid = jobidvalue

Updates the job listing for the provided job id value.

#### Parameters

A jobid string.

#### Response

A success/error string


### DELETE /jobs?jobid = [jobidvalue]

Deletes the job listing for the provided job id value.

#### Parameters

A jobid string.

#### Response

A JSON object with the time & date 

```json

  {
   "UpdateTime":"2024-01-01T18:01:02"
  },

```
