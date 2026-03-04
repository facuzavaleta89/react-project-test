import Link from "next/link"

export const metadata = {
    title: "Términos y Condiciones — E-Commerce",
    description: "Leé los términos y condiciones de uso de E-Commerce antes de realizar una compra.",
}

const sections = [
    {
        title: "1. Aceptación de los términos",
        content: `Al acceder y utilizar el sitio web de E-Commerce (en adelante "el Sitio"), aceptás sin reservas los presentes Términos y Condiciones de uso, así como nuestra Política de Privacidad. Si no estás de acuerdo con alguna parte de estos términos, te pedimos que no uses el Sitio.

Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en el Sitio. El uso continuado del Sitio luego de dichos cambios implicará tu aceptación de los términos actualizados.`,
    },
    {
        title: "2. Descripción del servicio",
        content: `E-Commerce es una plataforma de comercio electrónico que permite a los usuarios:

• Explorar y buscar productos disponibles en el catálogo.
• Agregar productos a un carrito de compras.
• Comprar productos de forma segura mediante Stripe como pasarela de pago.
• Gestionar su cuenta, historial de pedidos y datos personales.

E-Commerce actúa como intermediario entre el comprador y el stock disponible. Nos reservamos el derecho de modificar, suspender o discontinuar cualquier funcionalidad del Sitio en cualquier momento y sin previo aviso.`,
    },
    {
        title: "3. Registro y cuenta de usuario",
        content: `Para acceder a funcionalidades completas (compras, historial de pedidos, etc.) es necesario crear una cuenta. Al registrarte, te comprometés a:

• Proporcionar información veraz, precisa y actualizada.
• Mantener la confidencialidad de tu contraseña y credenciales.
• Notificarnos de inmediato ante cualquier uso no autorizado de tu cuenta.
• Ser el único responsable de toda actividad que se realice bajo tu cuenta.

E-Commerce se reserva el derecho de suspender o eliminar cuentas que infrinjan estos términos, sin necesidad de notificación previa.`,
    },
    {
        title: "4. Precios y disponibilidad",
        content: `Todos los precios publicados en el Sitio están expresados en pesos argentinos (ARS) e incluyen los impuestos correspondientes, salvo indicación en contrario.

• **Disponibilidad:** La disponibilidad de los productos puede cambiar sin previo aviso. Si un producto no estuviera disponible luego de confirmar tu pedido, te contactaremos para ofrecerte alternativas o el reembolso total.
• **Errores de precio:** En caso de error tipográfico o técnico en el precio de un producto, nos reservamos el derecho de cancelar el pedido y reembolsar el importe abonado.
• **Modificaciones:** Los precios pueden ser modificados en cualquier momento. El precio vigente es el que figura en el momento de finalizar la compra.`,
    },
    {
        title: "5. Proceso de compra y pago",
        content: `Al completar una compra en E-Commerce:

• Confirmás que la información proporcionada es correcta y que estás autorizado a usar el método de pago seleccionado.
• Los pagos son procesados de forma segura por **Stripe**, que cumple con el estándar PCI DSS. E-Commerce no almacena datos de tarjetas de crédito o débito.
• Recibirás un correo electrónico de confirmación al finalizar tu compra con el detalle del pedido.
• La compra constituye un contrato vinculante entre vos y E-Commerce.`,
    },
    {
        title: "6. Política de envíos",
        content: `Los plazos y costos de envío varían según la dirección de entrega y el tipo de producto:

• Los tiempos estimados de entrega son orientativos y pueden verse afectados por situaciones externas (clima, fuerza mayor, etc.).
• E-Commerce no se responsabiliza por demoras ocasionadas por el servicio de correo o courier.
• Al proporcionar tu dirección de envío, garantizás que la misma es correcta y completa.

Para más información sobre envíos, contactanos en contacto@ecommerce.com.`,
    },
    {
        title: "7. Devoluciones y reembolsos",
        content: `Aceptamos devoluciones dentro de los **30 días corridos** desde la recepción del pedido, bajo las siguientes condiciones:

• El producto debe estar en su estado original, sin uso y con su empaque original.
• Deberás iniciar el proceso de devolución contactándonos por email con el número de pedido.
• Los gastos de envío de la devolución corren por cuenta del comprador, salvo que el producto presente defectos o sea incorrecto.
• Una vez recibido y verificado el producto, procesaremos el reembolso dentro de los 5 días hábiles al método de pago original.

Algunos productos pueden quedar excluidos de la política de devoluciones (productos personalizados, artículos de higiene, etc.). Se indicará explícitamente en la descripción del producto.`,
    },
    {
        title: "8. Propiedad intelectual",
        content: `Todo el contenido del Sitio —incluyendo textos, imágenes, logotipos, diseños, código y software— es propiedad exclusiva de E-Commerce o sus licenciantes, y está protegido por las leyes de propiedad intelectual vigentes.

Queda prohibida la reproducción, distribución, modificación o uso comercial de cualquier contenido del Sitio sin autorización escrita previa de E-Commerce.`,
    },
    {
        title: "9. Limitación de responsabilidad",
        content: `E-Commerce no será responsable de:

• Daños directos, indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso del Sitio.
• Interrupciones del servicio por mantenimiento, fallas técnicas o causas de fuerza mayor.
• Contenido de sitios web de terceros a los que se pueda acceder mediante enlaces en el Sitio.
• Pérdida de datos o daños derivados de accesos no autorizados a tu cuenta por causas imputables al usuario.

En la máxima medida permitida por la ley, nuestra responsabilidad total no podrá superar el importe de la última compra realizada por el usuario.`,
    },
    {
        title: "10. Legislación aplicable y jurisdicción",
        content: `Estos Términos y Condiciones se rigen por las leyes de la República Argentina. Cualquier controversia derivada del uso del Sitio o de las presentes condiciones será sometida a la jurisdicción de los Tribunales Ordinarios de la Ciudad Autónoma de Buenos Aires, renunciando expresamente a cualquier otro fuero que pudiera corresponder.`,
    },
    {
        title: "11. Contacto",
        content: `Para cualquier consulta relacionada con estos Términos y Condiciones, podés contactarnos:

• **Email:** contacto@ecommerce.com
• **Dirección:** Av. Corrientes 1234, Buenos Aires, Argentina
• **Horario de atención:** Lunes a viernes, 9:00 – 18:00 hs`,
    },
]

export default function TerminosPage() {
    return (
        <main className="min-h-[calc(100vh-80px)] bg-[#fafafa] dark:bg-zinc-950 transition-colors">

            {/* Hero */}
            <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 py-14 px-6">
                <div className="max-w-3xl mx-auto">
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
                        Legal
                    </span>
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
                        Términos y Condiciones
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Última actualización: <span className="font-medium text-zinc-700 dark:text-zinc-300">Marzo 2026</span>
                    </p>
                    <p className="mt-4 text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        Antes de usar <strong className="text-zinc-800 dark:text-zinc-200">E-Commerce</strong>, te pedimos que leas detenidamente estos términos. Al acceder al Sitio o realizar una compra, aceptás todas las condiciones aquí detalladas.
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
                            <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
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
                                                        ) : p
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
                                                ) : p
                                            )}
                                        </p>
                                    )
                                })}
                            </div>
                        </section>
                    ))}
                </div>

                {/* CTA bottom */}
                <div className="mt-14 flex flex-col sm:flex-row gap-3 items-center justify-center p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-center">
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                        ¿Tenés preguntas sobre estos términos?
                    </p>
                    <Link
                        href="/contacto"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-semibold text-sm hover:bg-zinc-700 dark:hover:bg-zinc-200 transition"
                    >
                        Contactanos
                    </Link>
                    <Link
                        href="/politica-privacidad"
                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg font-semibold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                    >
                        Ver Política de Privacidad
                    </Link>
                </div>
            </div>
        </main>
    )
}
