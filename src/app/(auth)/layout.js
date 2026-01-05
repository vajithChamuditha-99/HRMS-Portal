export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      {children}
    </div>
  );
}
