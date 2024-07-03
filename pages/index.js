import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function Home() {
  const { register, handleSubmit, reset } = useForm();
  const [nombres, setNombres] = useState([]);

  useEffect(() => {
    fetch('/api/nombres')
      .then(response => response.json())
      .then(data => setNombres(data));
  }, []);

  const onSubmit = async data => {
    const response = await fetch('/api/nombres', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const nuevoNombre = await response.json();
    setNombres([...nombres, nuevoNombre]);
    reset();
  };

  return (
    <>
      <main className="w-full h-full p-4 flex flex-col mx-auto">
        <h1 className="text-2xl font-bold mb-4">Micro Coaches</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
          <input
            {...register('nombre')}
            placeholder="Nombre"
            className="border p-2 rounded w-full mb-2"
          />
          <br />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Agregar
          </button>
        </form>
        <ul>
          {nombres.error ? (<span className="italic text-gray-400">Nothing here yet!</span>) : 
          (nombres.map(nombre => (
            <li key={nombre.id} className="border-b p-2">
              {nombre.nombre}
            </li>
          )))}
        </ul>
      </main>
    </>
  );
}
