import { MercadoPagoConfig, Preference } from 'mercadopago';

// Usa el Access Token que pusiste en .env.local
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

export async function POST(request) {
    try {
        const body = await request.json();
        const { items } = body; // Recibiremos el carrito estructurado desde el front

        if (!items || items.length === 0) {
            return new Response(JSON.stringify({ error: "No items provided" }), {
                status: 400,
            });
        }

        // 1. Inicializamos la clase Preference de MP
        const preference = new Preference(client);

        // 2. Creamos la orden para este carrito
        const result = await preference.create({
            body: {
                items: items,
                payment_methods: {
                    installments: 12 // Permite cuotas (necesario para las tarjetas de prueba que simulan crédito)
                },
                back_urls: {
                    success: "http://localhost:3000/productos",
                    failure: "http://localhost:3000/checkout",
                    pending: "http://localhost:3000/checkout"
                }
            }
        });

        // 3. Devolvemos la preferencia al front con sus links de redirección
        return new Response(JSON.stringify({
            id: result.id,
            init_point: result.init_point,
            sandbox_init_point: result.sandbox_init_point
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Error creating MercadoPago preference:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
