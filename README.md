# Summarist

A book summary app where you can read or listen to summaries of popular books. Built for the Advanced Virtual Internship.

## Built with

- Next.js (App Router) and TypeScript
- Redux Toolkit
- Firebase Authentication and Firestore
- Stripe with the Firebase "Run Payments with Stripe" extension
- React Icons

## Features

- Home page with a login modal (email and password, guest login and Google login)
- For You page with the selected, recommended and suggested books
- Book page with Read / Listen buttons and "Add title to My Library"
- Player page with the summary and an audio player
- Choose plan page with monthly and yearly (7-day free trial) subscriptions
- Settings page with the subscription plan and email
- Search with a debounce, a sidebar that turns into a drawer on mobile, and skeleton loading states

## Running it locally

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in the Firebase config, the guest account and the two Stripe price ids.
3. `npm run dev` and open http://localhost:3000
