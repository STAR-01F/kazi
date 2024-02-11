# Keywords API

This project is a part of a larger application and provides an API for managing keywords.

## Setup

Before you can run this project, you need to set up your environment variables. Follow these steps:

1. Create a new file in the project root named `.env`.

2. Open the `.env` file and add the following lines:

    ```dotenv
    HOST=localhost # or any other host you want to use
    PORT=3000 // or any other port you want to use
    ALLOWED_ORIGINS=allowed_origin
    API_KEY=your_api_key_here
    ```

3. Replace `your_api_key_here` with your OpenAI API key.

    - How to get your API key: <https://beta.openai.com/account/api-keys>

4. Replace `allowed_origin` with the URL of the application that will be using this API.

5. Save the `.env` file.

## Running the Project

To run the project, follow these steps:

1. Open a terminal window in the project root.

2. Run the following command:

    ```bash
    npm run dev
    ```

3. Open a web browser and navigate to `http://localhost:3000`.

## API Documentation

### `POST /keywords`

Returns a list of 10 keywords.

```json
[
  {
    "description": "Go, Javascript, Teamwork..."
  },
]
```

#### Response

```json
[
  {
    "keywords": "keyword1, keyword2, keyword3..."
  },
]
```
