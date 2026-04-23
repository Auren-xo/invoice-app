export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#f8f8fb]">
      <div className="w-20 bg-[#373B53] text-white flex flex-col items-center py-6">
        <div className="w-10 h-10 bg-purple-500 rounded-full mb-auto"></div>
        <div className="text-xs">☀️</div>
      </div>

      <div className="flex-1 p-6 max-w-5xl mx-auto w-full text-gray-900">
        {children}
      </div>
    </div>
  );
}