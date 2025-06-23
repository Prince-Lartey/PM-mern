import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "TeamSync" },
        { name: "description", content: "Welcome to TeamSync!" },
    ];
}

export default function Home() {
    return (
        <h2>Hello There!!</h2>
    )
}
