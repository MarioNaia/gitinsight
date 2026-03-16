# GitInsight

GitInsight is a web application that analyzes a GitHub profile and generates insights about a developer's portfolio. By entering a GitHub username, the application retrieves public information from the GitHub API and displays statistics about repositories, stars, and programming languages.

The goal of this project is to help developers better understand the strengths of their GitHub portfolio and identify areas for improvement.

## How it works

The user enters a GitHub username in the interface. The application sends a request to the GitHub API to retrieve profile information and repository data. This information is processed on the server to calculate statistics such as the total number of repositories, total stars, most starred repository, and the most frequently used programming languages.

The application also generates a simple portfolio score and suggestions that help developers improve their GitHub presence.

## Technologies used

The project was built using Next.js with TypeScript and Tailwind CSS for the frontend interface. The GitHub REST API is used to retrieve public data from GitHub. Recharts is used to visualize language statistics.

## Running the project locally

Clone the repository and install the dependencies.

npm install

Start the development server.

npm run dev

Open http://localhost:3000 in your browser.

## Environment variables

The project optionally uses a GitHub API token to avoid rate limits.

Create a `.env.local` file and add:

GITHUB_TOKEN=your_github_token

The application will still work without a token but will have lower API rate limits.

## Live demo

The application is deployed on Vercel and can be accessed online.

## License

This project was created for a hackathon and is available for educational and demonstration purposes.
