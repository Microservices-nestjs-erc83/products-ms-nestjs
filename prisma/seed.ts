import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.product.createMany({
        data: [
            { name: 'Teclado', price: 75.25 },
            { name: 'Mouse', price: 150.0 },
            { name: 'Monitor', price: 150.0 },
            { name: 'Audífonos', price: 50.0 },
            { name: 'Laptop', price: 1000.0 },
            { name: 'Smartphone', price: 800.0 },
            { name: 'Tablet', price: 300.0 },
            { name: 'Impresora', price: 200.0 },
            { name: 'Altavoces', price: 150.0 },
            { name: 'Cámara', price: 400.0 },
            { name: 'Televisor', price: 700.0 },
            { name: 'Router', price: 80.0 },
            { name: 'Reproductor Blu-ray', price: 180.0 },
            { name: 'Teclado inalámbrico', price: 60.0 },
            { name: 'Mouse inalámbrico', price: 80.0 },
            { name: 'Webcam', price: 70.0 },
            { name: 'Tarjeta de video', price: 250.0 },
            { name: 'Memoria RAM', price: 120.0 },
            { name: 'Disco duro externo', price: 150.0 },
            { name: 'Tarjeta madre', price: 350.0 },
            { name: 'Procesador', price: 300.0 },
            { name: 'Gabinete para PC', price: 80.0 },
            { name: 'Fuente de poder', price: 100.0 },
            { name: 'Router inalámbrico', price: 50.0 },
            { name: 'Adaptador Wi-Fi USB', price: 30.0 },
            { name: 'Cargador portátil', price: 40.0 },
            { name: 'Batería de repuesto', price: 50.0 },
            { name: 'Mochila para laptop', price: 40.0 },
            { name: 'Estuche para tablet', price: 20.0 },
            { name: 'Cable HDMI', price: 10.0 },
            { name: 'Adaptador de corriente', price: 20.0 },
            { name: 'Soporte para monitor', price: 30.0 },
            { name: 'Base para laptop', price: 25.0 },
            { name: 'Teclado numérico', price: 15.0 },
            { name: 'Mouse ergonómico', price: 35.0 },
            { name: 'Auriculares con micrófono', price: 50.0 }
        ],
    });

    console.log('Datos insertados en Product');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
