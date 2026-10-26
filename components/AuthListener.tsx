"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  getCurrentUserSubscriptions,
  Subscription,
} from "@invertase/firestore-stripe-payments";
import { auth } from "@/firebase/init";
import { payments } from "@/firebase/stripe";
import { useAppDispatch } from "@/redux/hooks";
import { logoutUser, Plan, setUser } from "@/redux/userSlice";

// the product's firebaseRole metadata in stripe is "premium" or "premium-plus"
function getPlan(subscription: Subscription): Plan {
  if (
    subscription.role === "premium-plus" ||
    subscription.price === process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY
  ) {
    return "premium-plus";
  }
  return "premium";
}

export default function AuthListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        let plan: Plan = "basic";
        try {
          const subscriptions = await getCurrentUserSubscriptions(payments, {
            status: ["active", "trialing"],
          });
          if (subscriptions.length > 0) {
            plan = getPlan(subscriptions[0]);
          }
        } catch (error) {
          console.log(error);
        }
        dispatch(setUser({ uid: user.uid, email: user.email, plan }));
      } else {
        dispatch(logoutUser());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return null;
}
