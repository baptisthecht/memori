# Application Context

## Introduction

This application is designed to help users learn and practice Japanese and French vocabulary. It leverages an interactive and personalized approach to enhance language learning, focusing on efficient memorization and review of words and phrases.

## Tech Stack

- Frontend: Next.js with TypeScript and Tailwind CSS
- Backend/Database: Supabase
- UI Framework: Tailwind CSS
- AI Processing: Claude

## Application Structure

### Data Structure

The key data models include:

- **Hour**: Stores hour values in text format along with their romaji transcription.
- **Minute**: Stores minute values in text format along with their romaji transcription.
- **Word**: Contains vocabulary words with their representations in French, hiragana, romaji, and kanji. Each word is categorized for structured learning.
- **PhraseExample**: Stores example sentences linked to each word, including translations and transcriptions.

### Frontend & Components

The application is built using Next.js and styled with Tailwind CSS. The main components include:

- **Header**: Navigation bar with links to different sections.
- **MesMots**: Page displaying the user's vocabulary list.
- **FilterPopover**: Component allowing users to filter words by language, type, and theme.
- **ActionButtons**: Buttons enabling users to mark a response as correct or incorrect.

## User Experience

### Navigation

Users start on the homepage, where they can access different sections via the navigation menu. The main sections include the quiz and personal vocabulary list.

### Interaction

- **Quiz**: Users participate in quizzes to test their knowledge. Words are randomly selected based on applied filters.
- **My Words**: Users can view and manage their word list, with statistics on their performance (number of correct/incorrect answers).

### Personalization

The application allows users to customize their learning experience by applying filters to focus on specific word or phrase categories.

### Progress Tracking

The application incorporates a spaced repetition system (Leitner method) to help users efficiently memorize words. Each word's statistics are updated based on the user's responses, enabling progress tracking over time.

## Developer Guidelines

To ensure consistency and alignment with project goals, developers must adhere to the following guidelines:

1. **Strict Adherence to Specifications**: Follow the defined application structure without modifications.
2. **Consistent API Implementation**: Ensure backend interactions align with the expected data flow and API definitions.
3. **User Experience Consistency**: Ensure smooth navigation, functional filters, and reliable progress tracking.

## Conclusion

This application provides an interactive and structured approach to language learning by combining vocabulary management, interactive quizzes, and progress tracking. Developers should strictly follow the provided specifications to maintain application consistency and functionality.

