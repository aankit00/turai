
// localhost:3000/demo

"use client";

import {Button} from "@/components/ui/button";

export default function DemoPage() {
    const handleblocking = async () => {
        await fetch("/api/demo/blocking", { method: "POST" });
    };

    return (
        <div className="p-8 space-x-4">
            <Button onClick={handleblocking}>Blocking API Call</Button>


        </div>
    );
}