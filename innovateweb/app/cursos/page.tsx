"use client";

import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";

interface Curso {
  id: number;
  slug: string;
  nombre: string;
  descripcion: string;
  icono: string;
  estado: string;
  created_at: string;
  duracion_meses: number;
  precio: string;
  resultado: string;
  programas: string[];
  orden: number;
  profe_id: string | null;
  Link_videollamada: string | null;
  dispo: boolean;
}

export default function Cursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function cargarCursos() {
      try {
        const supabase = createClient();
        const { data, error: supabaseError } = await supabase
          .from("cursos")
          .select("*")
          .order("orden", { ascending: true });

        if (supabaseError) {
          console.error("Error al cargar los cursos:", supabaseError);
          setError(true);
          setErrorMessage(supabaseError.message ?? "Error desconocido de Supabase");
        } else {
          setCursos((data ?? []) as Curso[]);
        }
      } catch (err: any) {
        console.error("Error al inicializar la carga de cursos:", err);
        setError(true);
        setErrorMessage(err.message ?? "Error inesperado");
      } finally {
        setLoading(false);
      }
    }

    cargarCursos();
  }, []);

  return (
    <main className="min-h-screen bg-white text-black">
      <header className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight m-30">
                Nuestros cursos
              </h1>
              <p className="mt-2 text-gray-600">
                Elige el camino para tu carrera en tecnología
              </p>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-600">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              {cursos.filter((c) => c.dispo).length} disponibles
            </div>
          </div>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 font-medium">Cargando cursos...</p>
          </div>
        </div>
      ) : error ? (
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-xl">⚠️</span>
            </div>
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              No se pudieron cargar los cursos
            </h3>
            <p className="text-sm text-red-700 mb-4">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      ) : cursos.length === 0 ? (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400 text-2xl">📭</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No hay cursos disponibles
          </h3>
          <p className="text-gray-600">
            Vuelve pronto para ver nuevos cursos.
          </p>
        </div>
      ) : (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cursos.map((curso) => (
              <article
                key={curso.id}
                className={`bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden ${
                  !curso.dispo ? "opacity-70 grayscale-[0.6]" : ""
                }`}
              >
                <div className="h-48 flex items-center justify-center bg-gray-50 px-6">
                  {typeof curso.icono === "string" && curso.icono.startsWith("http") ? (
                    <img
                      src={curso.icono}
                      alt={curso.nombre}
                      className="h-24 w-24 object-contain drop-shadow-md"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold">
                      {curso.icono}
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-xl font-bold text-gray-900 leading-tight">
                      {curso.nombre}
                    </h2>
                    <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                      curso.dispo
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {curso.dispo ? "Disponible" : "No disponible"}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {curso.descripcion}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <span className="w-5 h-5 text-gray-400">📅</span>
                      <span>{curso.duracion_meses} meses</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <span className="w-5 h-5 text-gray-400">💻</span>
                      <span>{curso.programas.join(", ")}</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-2xl font-bold text-gray-900">
                        ${curso.precio}
                      </span>
                      <span className="text-xs font-medium text-gray-500">
                        por curso
                      </span>
                    </div>
                    <a
                      href={`/cursos/${curso.slug}`}
                      className={`w-full py-3 px-4 rounded-xl text-center font-bold transition-colors ${
                        curso.dispo
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {curso.dispo ? "Ver detalle" : "No disponible"}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
