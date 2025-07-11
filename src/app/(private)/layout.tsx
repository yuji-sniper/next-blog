import PrivateHeader from "@/components/layouts/PrivateHeader";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PrivateHeader />
      {children}
    </div>
  );
}
