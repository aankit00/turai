import {serve} from "inngest/next";

import {inngest} from "@/inngest/client";
import { demoGenerate } from "@/inngest/functions";

//create an API that serves zero functions

export const {GET, POST, PUT} =serve({
    client: inngest,
    functions:[
        demoGenerate,
    ],
})