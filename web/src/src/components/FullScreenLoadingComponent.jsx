export default function FullScreenLoadingComponent() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white-500 text-white p-4">
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      </div>
    </div>
  );
}
