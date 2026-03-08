import { query } from "./_generated/server";

export const testLog = query({
  args: {},
  handler: async (ctx) => {
    console.log("Salom, Convex loglari ishlamoqda!");
    return "Muvaffaqiyatli!";
  },
});