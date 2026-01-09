import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const createProject = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx, { name }) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        await ctx.db.insert("projects", {
            name,
            ownerId: identity?.subject
        });
    },
});

export const get = query({
    args: {},
    handler: async (ctx) => {

        const identify = await ctx.auth.getUserIdentity();

        if (!identify) {
            return [];  
        }
        
        return await ctx.db.query("projects").collect();
    }
});