import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nombre } = req.body;
    const nuevoNombre = await prisma.nombre.create({
      data: { nombre },
    });
    res.json(nuevoNombre);
  } else if (req.method === 'GET') {
    const nombres = await prisma.nombre.findMany();
    res.json(nombres);
  }
}