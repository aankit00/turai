
// localhost:3000/demo

"use client";

export default function DemoPage() {
    const handleblocking = async () => {
        await fetch("/api/demo/blocking", { method: "POST" });
    };

    return (
        <div className="p-8 space-x-4">
            <button onClick={handleblocking}>Blocking API Call</button>


        </div>
    );
}