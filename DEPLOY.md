# Guía de Deploy a Vercel

## Preparación Previa ✅

Tu proyecto ya está optimizado para producción:

- ✅ **Clases Tailwind actualizadas** a v4
- ✅ **Sin console.log de debug**
- ✅ **next.config.mjs optimizado**
- ✅ **Variables de entorno configuradas** (.env.example presente)
- ✅ **Código linto sin errores**

---

## Paso 1: Preparar tu GitHub (si aún no lo hiciste)

### 1.1 Crear repositorio en GitHub

1. Ve a [github.com](https://github.com) y crea un nuevo repositorio público
2. Dale un nombre memorable: `ecommerce-portfolio` o similar
3. **No inicialices** con README (ya tienes uno)

### 1.2 Pushear tu código a GitHub

En tu terminal:

```bash
cd /home/facuzavaleta89/dev/react-project-test

# Si es la primera vez usando git en este proyecto:
git init
git add .
git commit -m "Initial commit: E-commerce project ready for production"

# Conectar con tu repositorio remoto
git remote add origin https://github.com/TU_USUARIO/ecommerce-portfolio.git
git branch -M main
git push -u origin main
```

---

## Paso 2: Configurar Vercel

### 2.1 Registrarse en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Sign Up"**
3. Usa tu **cuenta de GitHub** (así es más fácil)
4. Autoriza a Vercel para acceder a tus repositorios

### 2.2 Importar tu proyecto

1. En el dashboard de Vercel, haz clic en **"New Project"** o **"Add New..."**
2. Selecciona **"Import Git Repository"**
3. Busca y selecciona tu repositorio (`ecommerce-portfolio`)
4. Vercel detectará automáticamente que es un proyecto **Next.js**

---

## Paso 3: Configurar Variables de Entorno en Vercel

### Crítico: Sin esto, tu app no funcionará

1. Después de seleccionar el repositorio, verás una sección **"Configure Project"**
2. En **"Environment Variables"**, agrega estas dos:

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Tu URL de Supabase (`https://xxxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Tu Anon Key de Supabase |

**¿Dónde encontrar estas claves?**

En [supabase.com](https://supabase.com):

1. Abre tu proyecto
2. Ve a **Settings → API** (en la barra izquierda)
3. Copia los valores:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

> ⚠️ **Importante:** Estas claves son públicas (NEXT_PUBLIC_), no son secretas. Eso es correcto para un cliente de Supabase.

---

## Paso 4: Deploy

1. Clic en **"Deploy"** en Vercel
2. Espera ~2-3 minutos mientras Vercel:
   - Instala dependencias
   - Compila el proyecto
   - Optimiza para producción

3. **¡Listo!** Tu app está en vivo

Vercel te dará una URL como: `https://ecommerce-portfolio.vercel.app`

---

## Paso 5: Tests de Producción

Después del deploy, valida:

### Pruebas funcionales

- [ ] Landing se carga correctamente
- [ ] Buscador funciona (SearchBox)
- [ ] Categorías cargan y son clickeable
- [ ] Puedo registrarme/iniciar sesión
- [ ] Puedo filtrar productos
- [ ] Carrito funciona
- [ ] Dark mode funciona
- [ ] Responsive en mobile

### Chequeo técnico

- [ ] No hay errores en consola (F12 → Console)
- [ ] Las imágenes cargan correctamente
- [ ] Sin warnings de CORS
- [ ] Performance es bueno (Lighthouse en DevTools)

---

## Troubleshooting

### Error: "Cannot find module @supabase/supabase-js"

**Solución:** Las variables de entorno no se configuraron. Vuelve al Paso 3.

### Error: "NEXT_PUBLIC_SUPABASE_URL is not defined"

**Solución:** Falta una variable de entorno. En Vercel:
1. Settings → Environment Variables
2. Verifica que están ahí
3. Vuelve a hacer deploy (Actions → Redeploy)

### App se carga pero no hay datos

**Solución:** 

1. Abre DevTools (F12)
2. Ve a **Consola**
3. Busca errores de Supabase (ej: "401 Unauthorized")
4. Verifica que tu Supabase está en línea

**Si tu Supabase no está accesible:**
- En Settings de Supabase, ve a **Auth Providers**
- Asegúrate de que **Email** está habilitado
- Chequea **Row Level Security (RLS)** - debe permitir lectura pública de productos

### Deploy muy lento

Esto es normal la primera vez. La construcción tarda porque:
- Instala todas las dependencias
- Compila Next.js
- Optimiza imágenes

Las próximas compilaciones serán más rápidas.

---

## Actualizaciones Futuras

Después del primer deploy, cada vez que hagas push a GitHub:

```bash
git add .
git commit -m "Update: Nueva feature"
git push origin main
```

**Vercel automáticamente:**
1. Detecta el cambio
2. Reconstruye
3. Despliega

Sin necesidad de hacer nada más. ✨

---

## Dominio Personalizado (Opcional)

Si quieres algo más profesional que `vercel.app`, puedes:

1. Comprar un dominio (ej: GoDaddy, Namecheap, etc.)
2. En Vercel Settings → Domains
3. Agregar tu dominio personalizado
4. Seguir las instrucciones de DNS

---

## Checklist Final Antes de Mostrar en Portfolio

- [ ] App funciona completamente en producción
- [ ] No hay errores en consola
- [ ] Responsive en mobile/tablet/desktop
- [ ] Performance es aceptable (Lighthouse > 80)
- [ ] Dark mode funciona
- [ ] Has agregado descripción en el proyecto de Vercel
- [ ] El README está actualizado
- [ ] URL lista para agregar en CV/portfolio

---

## Recursos Útiles

- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Supabase](https://supabase.com/docs)

---

¡Listo para desplegar! 🚀
