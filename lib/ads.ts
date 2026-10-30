// Ad unit slot ids from AdSense (Ads > By ad unit > Display ads). Set in .env / Vercel.
export const AD_SLOTS = {
  postTop: process.env.NEXT_PUBLIC_AD_SLOT_POST_TOP,
  postBottom: process.env.NEXT_PUBLIC_AD_SLOT_POST_BOTTOM,
  listing: process.env.NEXT_PUBLIC_AD_SLOT_LISTING,
};
