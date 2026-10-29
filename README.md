# VEQO

Premium creative-services marketplace mobile app, built with Expo + React Native.

## This build

This version is a self-contained visual/product prototype with realistic local mock data so the app can be compiled immediately and inspected as an Android APK.

It includes:
- VEQO onboarding and role selection
- Client / creator flows
- Creator discovery
- Creator profiles and verified-work presentation
- Project creation flow
- Projects
- Messages
- Notifications
- Profile
- Dark / light theme support
- Premium VEQO visual system

Backend, Supabase auth, realtime messaging, uploads, payments, and production moderation can be integrated as the next phase.

## Run locally

```bash
npm install
npm run dev
```

## Build with Codemagic

The repository includes `codemagic.yaml`.

The current workflow creates an Android debug APK for testing.
