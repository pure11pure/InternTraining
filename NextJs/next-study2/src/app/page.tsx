import Link from "next/link";

export default function Home() {
  return (
    <div className="items-center">
      <p>Home Page</p>
      <div>

        
      </div>
      <Link href="/about">about</Link>
      <Link href="/Service">Service</Link>
      <Link href="/Blog">Blog</Link>
      <Link href="/Contact">Contact</Link>
    </div>
  );
}
