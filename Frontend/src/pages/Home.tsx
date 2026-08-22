import MenuLateral from "../components/common/MenuLateral";
import TopNavBar from "../components/common/TopNavBar";
import CatalogoLivros from "../components/home/CatalogoLivros";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <MenuLateral />

      <div className="flex-1 md:ml-64 flex flex-col min-w-0 min-h-screen w-full">
        <TopNavBar showSearch={false} />

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          <CatalogoLivros />
        </main>
      </div>
    </div>
  );
}

