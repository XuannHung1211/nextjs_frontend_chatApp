// app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // Khi người dùng vào localhost:3000, 
  // hệ thống sẽ đẩy họ vào /chat (nằm trong nhóm protected)
  redirect("/chat");
}