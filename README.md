# InventuraOS

InventuraOS is a React Native application built with Expo, designed for annual inventory checks. The app is primarily intended to run on Android Zebra Barcode scanners and allows users to scan fixed assets, update their status, change their location, and rename them. The app features login/authentication, toast messaging for errors and successes, and conditional styling based on the asset's status.

## Features

- **Barcode Scanning**: Utilizes Zebra's DataWedge for barcode scanning.
- **API Integration**: Uses Axios for API calls to communicate with web services and databases.
- **Navigation**: Managed by Expo Router.
- **Styling**: Tailwind CSS for styling.
- **Authentication**: Login/authentication component.
- **Toast Messaging**: Displays error and success messages using toast notifications.
- **Conditional Styling**: Applies different styles based on the asset's status.

## Usage

- **Login**: Authenticate using your credentials.
- **Scan Assets**: Use the barcode scanner to scan fixed assets.
- **Update Asset Information**: Change the location or name of the asset.
- **Checkmark in Database**: Mark the asset as checked in the database.
- **Toast Notifications**: Receive feedback on actions through toast messages.

## Project Structure

- `api/`: Contains API service functions.
- `app/`: Main application components and screens.
- `assets/`: Images and fonts.
- `types/`: TypeScript type definitions.
- `.env`: Environment variables.

## Dependencies

- **Expo**: Framework for building React Native apps.
- **Axios**: HTTP client for making API requests.
- **Expo Router**: Navigation management.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Native Toast Message**: Toast notifications.
