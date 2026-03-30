import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16 py-8 bg-gray-50">
      <div className="max-w-[960px] mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-gray-700">About</Link>
            <Link href="/privacy" className="hover:text-gray-700">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-700">Terms of Service</Link>
          </div>
          <p>&copy; {new Date().getFullYear()} FinePocket Toolbox. All rights reserved.</p>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">
          All tools run entirely in your browser. No data is sent to any server.
        </p>
      </div>
    </footer>
  );
}
