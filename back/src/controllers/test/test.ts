import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const dbCheck = async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1 AS ok`;
    res.status(200).json({
      status: "success",
      message: "Conectado a PostgreSQL correctamente"
    });
  } catch (error) {
    console.error("❌ Error al conectar con PostgreSQL:", error);
    res.status(500).json({
      status: "error",
      message: "No se pudo conectar a la base de datos"
    });
  }
};

export default dbCheck;
