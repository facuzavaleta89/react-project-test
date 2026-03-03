import Link from "next/link"

export const metadata = {
    title: "Política de Privacidad — E-Commerce",
    description: "Leé nuestra política de privacidad y entendé cómo tratamos tus datos personales.",
}

const sections = [
    {
        title: "1. Información que recopilamos",
        content: `Al usar E-Commerce recopilamos distintos tipos de información:
    
• **Datos de registro:** nombre completo, dirección de correo electrónico y contraseña al crear una cuenta.
• **Datos de compra:** dirección de envío, historial de pedidos y método de pago (procesado de forma segura por Stripe; no almacenamos datos de tarjetas).
• **Datos de uso:** páginas visitadas, productos vistos, tiempos de sesión e interacciones dentro del sitio.
• **Datos técnicos:** dirección IP, tipo de dispositivo, navegador y sistema operativo.`,
    },
    {
        title: "2. Cómo usamos tu información",
        content: `Utilizamos tu información exclusivamente para:

• Gestionar tu cuenta y autenticarte de forma segura.
• Procesar y hacer seguimiento de tus pedidos.
• Enviarte confirmaciones de compra y actualizaciones de estado.
• Mejorar la experiencia de navegación y las funcionalidades del sitio.
• Prevenir fraudes y garantizar la seguridad de la plataforma.
• Cumplir con obligaciones legales y regulatorias aplicables.`,
    },
    {
        title: "3. Compartición de datos con terceros",
        content: `No vendemos, alquilamos ni compartimos tu información personal con terceros para fines comerciales propios. Solo compartimos datos con:

• **Stripe:** para procesar pagos de forma segura, bajo sus propias políticas de privacidad.
• **Supabase:** como proveedor de infraestructura de base de datos y autenticación.
• **Proveedores de logística:** para la gestión de envíos, limitado a nombre y dirección de entrega.
• **Autoridades competentes:** cuando sea requerido por ley o para proteger nuestros derechos.`,
    },
    {
        title: "4. Cookies y tecnologías de seguimiento",
        content: `Utilizamos cookies y tecnologías similares para:

• Mantener tu sesión iniciada.
• Recordar el contenido de tu carrito de compras.
• Analizar el comportamiento de navegación de forma agregada y anónima.

Podés gestionar o desactivar las cookies desde la configuración de tu navegador, aunque esto puede afectar algunas funcionalidades del sitio.`,
    },
    {
        title: "5. Seguridad de los datos",
        content: `Implementamos medidas técnicas y organizativas para proteger tu información:

• Conexiones cifradas mediante HTTPS/TLS en todas las comunicaciones.
• Contraseñas almacenadas con hash seguro; nunca en texto plano.
• Acceso restringido a datos personales únicamente al personal autorizado.
• Revisiones periódicas de nuestros procedimientos de seguridad.

Sin embargo, ningún sistema es infalible. Te recomendamos usar contraseñas seguras y mantener tus credenciales privadas.`,
    },
    {
        title: "6. Retención de datos",
        content: `Conservamos tu información personal mientras tu cuenta esté activa o sea necesaria para prestarte nuestros servicios. Si eliminás tu cuenta, procederemos a borrar o anonimizar tus datos dentro de los 30 días posteriores a la solicitud, salvo obligación legal de conservarlos por mayor tiempo.`,
    },
    {
        title: "7. Tus derechos",
        content: `De acuerdo con la legislación argentina (Ley Nº 25.326 de Protección de Datos Personales) y normativas aplicables, tenés derecho a:

• **Acceso:** solicitar una copia de los datos que tenemos sobre vos.
• **Rectificación:** corregir datos incorrectos o incompletos.
• **Eliminación:** solicitar el borrado de tu información personal.
• **Portabilidad:** recibir tus datos en un formato estructurado y legible.
• **Oposición:** oponerte al tratamiento de tus datos en determinadas circunstancias.

Para ejercer cualquiera de estos derechos, escribinos a contacto@ecommerce.com.`,
    },
    {
        title: "8. Menores de edad",
        content: `E-Commerce no está dirigido a menores de 18 años. No recopilamos conscientemente datos de menores. Si sos padre/madre o tutor y creés que un menor nos proporcionó información personal, contactanos y procederemos a eliminarla.`,
    },
    {
        title: "9. Cambios en esta política",
        content: `Podemos actualizar esta Política de Privacidad periódicamente. Cuando lo hagamos, actualizaremos la fecha de "Última actualización" al inicio de la página y te notificaremos por email si los cambios son significativos. Te recomendamos revisarla regularmente.`,
    },
    {
        title: "10. Contacto",
        content: `Si tenés preguntas o inquietudes sobre esta política o el tratamiento de tus datos personales, podés contactarnos en:

• **Email:** contacto@ecommerce.com
• **Dirección:** Av. Corrientes 1234, Buenos Aires, Argentina
• **Horario de atención:** Lunes a viernes, 9:00 – 18:00 hs`,
    },
]

export default function PoliticaPrivacidadPage() {
    return (
        <main className="min-h-[calc(100vh-80px)] bg-[#fafafa] dark:bg-zinc-950 transition-colors">

            {/* Hero */}
            <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 py-14 px-6">
                <div className="max-w-3xl mx-auto">
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
                        Legal
                    </span>
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
                        Política de Privacidad
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Última actualización: <span className="font-medium text-zinc-700 dark:text-zinc-300">Marzo 2026</span>
                    </p>
                    <p className="mt-4 text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        En <strong className="text-zinc-800 dark:text-zinc-200">E-Commerce</strong> tomamos muy en serio la privacidad de nuestros usuarios. Esta política describe qué datos recopilamos, cómo los usamos y cuáles son tus derechos al respecto.
                    </p>
                </div>
            </div>

            {/* Body */}
            <div className="max-w-3xl mx-auto px-6 py-16">

                {/* Quick nav */}
                <nav className="mb-12 p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                        Contenido
                    </p>
                    <ol className="space-y-1.5">
                        {sections.map((s) => (
                            <li key={s.title}>
                                <a
                                    href={`#${s.title.replace(/\s+/g, "-").toLowerCase()}`}
                                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                >
                                    {s.title}
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>

                {/* Sections */}
                <div className="flex flex-col gap-10">
                    {sections.map((s) => (
                        <section
                            key={s.title}
                            id={s.title.replace(/\s+/g, "-").toLowerCase()}
                            className="scroll-mt-24"
                        >
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                                {s.title}
                            </h2>
                            <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm whitespace-pre-line">
                                {s.content.split("\n").map((line, i) => {
                                    if (line.trim().startsWith("•")) {
                                        const text = line.trim().slice(1).trim()
                                        const parts = text.split(/\*\*(.*?)\*\*/g)
                                        return (
                                            <p key={i} className="flex gap-2 mb-1.5">
                                                <span className="text-zinc-400 dark:text-zinc-500 flex-shrink-0 mt-0.5">•</span>
                                                <span>
                                                    {parts.map((p, j) =>
                                                        j % 2 === 1 ? (
                                                            <strong key={j} className="font-semibold text-zinc-800 dark:text-zinc-200">{p}</strong>
                                                        ) : (
                                                            p
                                                        )
                                                    )}
                                                </span>
                                            </p>
                                        )
                                    }
                                    if (!line.trim()) return <div key={i} className="h-2" />
                                    return (
                                        <p key={i} className="mb-2">
                                            {line.split(/\*\*(.*?)\*\*/g).map((p, j) =>
                                                j % 2 === 1 ? (
                                                    <strong key={j} className="font-semibold text-zinc-800 dark:text-zinc-200">{p}</strong>
                                                ) : (
                                                    p
                                                )
                                            )}
                                        </p>
                                    )
                                })}
                            </div>
                        </section>
                    ))}
                </div>

                {/* CTA bottom */}
                <div className="mt-14 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-center">
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
                        ¿Tenés dudas sobre el tratamiento de tus datos?
                    </p>
                    <Link
                        href="/contacto"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-semibold text-sm hover:bg-zinc-700 dark:hover:bg-zinc-200 transition"
                    >
                        Contactanos
                    </Link>
                </div>
            </div>
        </main>
    )
}
