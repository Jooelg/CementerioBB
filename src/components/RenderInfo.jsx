import React, { useEffect, useState } from "react";
import db from "../database/db.json";

function RenderInfo({ selected, pagename }) {
  const [search, setSearch] = useState("");
  const [persons, setPersons] = useState(
    db.filter((person) => person.section === selected)
  );

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const filteredPersons = db.filter(
      (person) =>
        person.section === selected &&
        (search === "" ||
          person.name.toLowerCase().includes(search.toLowerCase()))
    );

    setPersons(filteredPersons);
  }, [search]);

  return (
    <div>
      <section className="my-4 flex items-center justify-around">
        <h2 className="text-lg font-semibold">Listado del {pagename}</h2>
        <div className="relative max-w-xs">
          <input
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M10.5 18.5a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
        </div>
      </section>

      <table className="min-w-full border-collapse table-auto w-full text-sm text-left">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 w-1/3">Nombre</th>
            <th className="px-6 py-3 w-1/3">Fecha</th>
            <th className="px-6 py-3 w-1/3">Lugar</th>
          </tr>
        </thead>
        <tbody>
          {persons.length > 0 ? (
            persons.map((each) => (
              <tr key={each.id} className="odd:bg-white even:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {each.name}
                </td>
                <td className="px-6 py-4">{each.date}</td>
                <td className="px-6 py-4">{each.Lugar}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                No hay resultados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RenderInfo;
