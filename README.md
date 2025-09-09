# Zanix LMS Frontend - Project Details

## Overview

The Zanix LMS Frontend is a comprehensive Learning Management System built with Next.js, React, and TypeScript. It provides a full-featured platform for online education, supporting multiple user roles including students, instructors, administrators, and moderators.

## Features

### Core Functionality

- **User Authentication**: Sign up, sign in, password reset, and profile management
- **Role-Based Dashboards**: Separate interfaces for students, instructors, admins, and moderators
- **Course Management**: Create, edit, and manage courses with rich content
- **Video Content**: Upload and manage video lessons with YouTube integration
- **MDX Editor**: Rich text editing for course descriptions and content
- **File Uploads**: Support for course thumbnails, profile pictures, and video files
- **Responsive Design**: Mobile-first design using Tailwind CSS

### User Roles & Permissions

- **Students**: Browse courses, enroll, view progress, access learning materials
- **Instructors**: Create and manage courses, upload videos, track student progress
- **Administrators**: Manage users, oversee courses, system administration
- **Moderators**: Content moderation and user management

### Technical Features

- **Next.js App Router**: Modern routing with server and client components
- **TypeScript**: Type-safe development
- **Redux Toolkit**: State management with RTK Query for API calls
- **shadcn/ui**: Modern UI components
- **Tailwind CSS**: Utility-first styling
- **Dynamic Imports**: Optimized loading for heavy components (MDX editor, ReactPlayer)
- **Skeleton Loading**: Improved UX with loading states
- **Form Validation**: Zod schemas for robust form handling

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **State Management**: Redux Toolkit, RTK Query
- **Forms**: React Hook Form
- **Validation**: Zod
- **Icons**: Lucide React
- **Markdown Processing**: Custom MDX processing
- **Video Player**: React Player
- **Build Tool**: Turbopack (via Next.js)
- **Package Manager**: pnpm

## Project Structure

```
src/
├── app/                          # Next.js app router pages
│   ├── (commonLayout)/           # Public pages (home, courses, auth)
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── admin-dashboard/      # Admin-specific pages
│   │   ├── instructor-dashboard/ # Instructor pages
│   │   ├── student-dashboard/    # Student pages
│   │   └── moderator-dashboard/  # Moderator pages
│   └── globals.css               # Global styles
├── components/                   # Reusable UI components
│   ├── ui/                       # shadcn/ui components
│   ├── home/                     # Homepage sections
│   └── ...                       # Other components
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
├── redux/                        # Redux store and features
│   └── features/                 # RTK Query APIs
├── utils/                        # Helper utilities
└── wrapper/                      # Layout wrappers
```

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd zanix-lms-frontend
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory with necessary API endpoints and configuration.

4. **Run the development server**:

   ```bash
   pnpm dev
   ```

5. **Build for production**:
   ```bash
   pnpm build
   pnpm start
   ```

## Usage

### Development

- Start the development server with `pnpm dev`
- The application will be available at `http://localhost:3000`
- Use the integrated terminal in VS Code for running scripts

### Key Pages & Features

- **Home**: Landing page with featured courses and statistics
- **Courses**: Browse and view course details
- **Authentication**: Sign in/up flows with validation
- **Dashboards**: Role-specific interfaces for managing content and users
- **Profile**: User profile management with image uploads
- **Checkout**: Course purchase flow

### API Integration

The frontend integrates with a backend API for:

- User authentication and management
- Course CRUD operations
- Video content management
- File uploads and storage

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature`
6. Open a Pull Request

## Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_API_URL=your_api_endpoint
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_config
# Add other necessary environment variables
```

## Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint
- `pnpm type-check`: Run TypeScript type checking

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the
