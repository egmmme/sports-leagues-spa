# Sports Leagues SPA

This is a code bundle for Sports Leagues SPA.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

Run `npm run build` to create a production build and `npm run preview` to check it out.

Run `npm test` to run the tests.

## Overview
The application includes a responsive grid layout of league cards, search functionality, sport filtering, and clickable
league cards that display season badges in a modal dialog.

The key components include:

*Main App*: Manages state and API calls for leagues and season badges

*SearchBar*: Filters leagues by name with search icon

*SportFilter*: Dropdown to filter by sport type

*LeagueList*: Responsive grid layout displaying league cards

*LeagueCard*: Individual league display with hover effects

*SeasonBadgeDialog*: Modal that shows season badge images when leagues are clicked


The application fetches data from the TheSportsDB API and caches responses in local storage for 24 hours, 
reducing repetitive API calls when the same parameters or URL are used.

This improves performance by serving cached data when available, while still providing client-side filtering 
and displaying season badges when users click on league cards.

It's fully responsive and uses the ShadCN UI React components, styled with Tailwind CSS, and built on top of Radix UI 
primitives for a consistent design system.

## Core stack:
```
React+TS (for building the SPA)
Tailwind CSS (for styling)
Radix UI (for accessible UI components)
 - ShadCN UI (for pre-built React components)
vite (build tool)
vitejs/plugin-react-swc (for Fast Refresh)
```
## Tools:
```
Rider IDE
GiHub for source control
Prettier (for code formatting)
```
## AI tools:
```
GitHub Copilot (for code suggestions and problem solving)
GitHub commit messages (for clear and concise commit history)
Figma Make (for generating React components from designs)
```