import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nombre } = req.body;
    try {
      const nuevoNombre = await prisma.nombre.create({
        data: { nombre },
      });
      res.status(201).json(nuevoNombre);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el nombre.' });
    }
  } else if (req.method === 'GET') {
    try {
      const nombres = await prisma.nombre.findMany();
      res.status(200).json(nombres);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los nombres.' });
    }
  }
}
