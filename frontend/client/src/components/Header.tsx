export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#dce1e5] bg-white px-4 md:px-10 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
          <span className="material-symbols-outlined text-2xl">pets</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-[#121517]">VetCare</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f3f4] text-[#121517] hover:bg-primary/10 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="h-8 w-[1px] bg-[#dce1e5] mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-[#121517]">Dr. Alejandro Ruiz</p>
            <p className="text-xs text-[#657886]">Administrador</p>
          </div>
          <div 
            className="h-10 w-10 rounded-full bg-cover bg-center border-2 border-primary/20" 
            style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVmIPwtj4YA-lBqMS_Ww4rgCvF1TFazLZXWezJytNMF-JsCtLIBYuvmI9VSe7bDCQzQNN2pWryq8B92Si5o_QJpNwn-ctfkRbZEDx3zP_M9bZ4PRHNjiesZcxfFavDYgBN3lyJ5aHwAEk4BL_X-qaBZl9nHx071bF0Oa4N3cDIa5ufO7WpJ3Tedf03lh8jCT4_MIZDe7-UQyOm1OAhOsLgXIvj682GS7EmNlk4SN-hQ603Y9SrPRraEsSNPQPRWLbt6nnfY7QF-r8')"}}
          ></div>
        </div>
      </div>
    </header>
  );
}
