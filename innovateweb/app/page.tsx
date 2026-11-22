import Navbar from "./components/Navbar";
//fuente original titulo
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Jua&family=Space+Grotesk:wght@300..700&family=Unbounded:wght@200..900&display=swap');
</style>
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <p>Academia de programación</p>
        <h2>De tu primer print()</h2>
        <h2>a un stack completo</h2>
      </main>
    </div>
  );
}
