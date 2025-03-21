"use client";
import { Table } from "@/components/ui/table";
import { ResetButton } from "@/components/reset-button";

export default function MesMots() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
            <ResetButton />
            <Table />
        </div>
    );
}
