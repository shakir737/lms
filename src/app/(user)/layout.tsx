
import Navbar from "@/components/Navbar/Navbar"

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <>
      <Navbar />
      {children}
     </>
       

  );
}
