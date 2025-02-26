import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Todo App</h1>
      <p className="mb-4">
        Get started by logging in or registering a new account.
      </p>
      <div className="space-x-4">
        <Link
          href="/login"
          className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
