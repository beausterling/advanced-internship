import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="wrapper">
        <SearchBar />
        {children}
      </div>
    </>
  );
}
