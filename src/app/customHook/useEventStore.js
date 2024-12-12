"use client";

import { create } from "zustand";

export const useEventStore = create((set) => ({
  // initial state
  eventData: [],
  locationData: [],

  // actions
  setEventData: (data) => set({ eventData: data }),
  setLocationData: (data) => set({ locationData: data }),
}));
