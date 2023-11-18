import EmptyState from "@/components/chat/EmptyState";

export default function MainPage() {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState />
    </div>
  );
}
