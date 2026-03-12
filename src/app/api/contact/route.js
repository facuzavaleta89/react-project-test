import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { name, email, topic, message } = await request.json()

    // Validar datos
    if (!name || !email || !topic || !message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Enviar email al propietario
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || 'facuzavaleta890@gmail.com',
      replyTo: email,
      subject: `Nuevo mensaje de contacto: ${topic}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tema:</strong> ${topic}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    // Enviar confirmación al usuario
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Recibimos tu mensaje',
      html: `
        <h2>Gracias por contactarnos, ${name}</h2>
        <p>Recibimos tu mensaje y te responderemos a la brevedad.</p>
        <p>Tema: <strong>${topic}</strong></p>
        <hr>
        <p style="color: #999; font-size: 12px;">E-Commerce - Todos los derechos reservados</p>
      `,
    })

    return NextResponse.json(
      { success: true, message: 'Mensaje enviado correctamente' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error al enviar email:', error)
    return NextResponse.json(
      { error: 'Error al enviar el mensaje' },
      { status: 500 }
    )
  }
}
