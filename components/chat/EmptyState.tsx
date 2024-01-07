const EmptyState = () => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 h-full w-full flex justify-center items-center bg-gray-200">
      <div className="text-center flex flex-col items-center">
        <h1 className="mt-2 text-xl font-semibold text-gray-950">
          Select any chat to start a conversation
        </h1>
      </div>
    </div>
  );
};

export default EmptyState;
