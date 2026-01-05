import Link from "next/link";

export const metadata = {
  title: "Not Found | HRMS Portal",
};

export default function NotFoundCatchAll() {
  return (
    <div>
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h1 className="text-xl font-semibold text-gray-900">Page Not Found</h1>
        <p className="mt-2 text-sm text-gray-600">
          This page is not developed yet or the URL is incorrect. Please use the navigation on the left or the quick links below.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { label: "Go to Dashboard", href: "/dashboard" },
            { label: "Leave Management", href: "/leave" },
            { label: "My Profile", href: "/profile" },
            { label: "My Requests", href: "/requests" },
            { label: "Salary Slips", href: "/payslips" },
            { label: "HR Services", href: "/hr-services" },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
