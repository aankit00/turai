import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export default defineSchema({
    projects: defineTable({
        name: v.string(),
        ownerId: v.string(),
        importStatus: v.optional(
            v.union(
                v.literal("importing"),
                v.literal("imported"),
                v.literal("failed")
            )
        )
    }).index("byOwner", ["ownerId"]),
})
