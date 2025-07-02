export const readme_es = `
¿Es tu cumpleaños? ¡Pruébalo y recibe $100!

🎉 Feliz Cumpleaños
Este proyecto ofrece un contrato inteligente y una interfaz sencilla para distribuir USDC a personas en su cumpleaños, como ejemplo claro de integración con Self. El contrato verifica la fecha de nacimiento en el pasaporte del usuario y permite reclamar USDC si su cumpleaños cae dentro de ±1 día respecto a la fecha actual. La interfaz permite interactuar con esta funcionalidad.

📦 Instrucciones de Configuración
🔧 Requisitos Previos
- Node.js y Yarn instalados
- Se recomienda instalar ngrok para probar localmente la interfaz
- Billetera con fondos en Celo Alfajores testnet (usa el faucet de Celo)
- USDC de prueba (obténlo en el faucet de Circle)

🚀 Desplegar el Contrato
1. Ve al directorio de contratos:

   cd contracts

2. Instala dependencias:

   yarn install

3. Configura variables de entorno:

   Copia .env.example a .env  
   Añade los siguientes valores:
   CELO_ALFAJORES_KEY=tu_clave_privada  
   CELOSCAN_API_KEY=tu_api_key (opcional pero recomendado)

4. Compila los contratos:

   yarn run build

5. Configura el entorno en contracts/scripts/hardhat/deployHappyBirthday.ts:
   - Para pasaportes falsos:
     devMode: true,
     ofacEnabled: [false, false, false]
   - Para producción:
     devMode: false,
     ofacEnabled: [true, true, true]

6. Despliega el contrato:

   yarn deploy:alfajores  // testnet  
   yarn deploy:celo       // mainnet

Guarda la dirección del contrato desplegado.

🌐 Configurar la Interfaz
1. Ve al directorio de frontend:

   cd frontend

2. Instala dependencias:

   yarn install

3. Actualiza la dirección del contrato:

   Abre frontend/app/page.tsx  
   Busca la constante HAPPY_BIRTHDAY_CONTRACT_ADDRESS  
   Reemplaza con tu dirección desplegada

4. Inicia el servidor local:

   yarn dev

🔔 Importante: Envía USDC de prueba al contrato desplegado para que pueda distribuirlo

💡 Abre http://localhost:3000 en tu navegador para ver la app

📝 Notas Importantes
✅ Verificación de Cumpleaños
- Reclamos válidos si el cumpleaños es ±1 día de la fecha actual
- Ejemplo: Si hoy es 14 de junio, puedes reclamar si naciste el 13, 14 o 15

🧪 Pruebas con Pasaportes Falsos
- Asegúrate de que OFAC esté desactivado
- Puedes configurar cualquier cumpleaños

🔐 Sistema de Nullifier
- Cada identidad solo puede reclamar una vez
- Se usa un nullifier para evitar dobles reclamos
- Aunque uses diferentes pasaportes falsos, si representan la misma persona, no podrán reclamar dos veces

🛠️ Solución de Problemas
- "OFAC verification failed": Usa pasaportes falsos y OFAC está activado → desactiva ofacEnabled
- "Birthday is not within the valid window": Usa un pasaporte con la fecha de hoy
- "Insufficient funds": El contrato no tiene USDC suficiente → envía más
- "Nullifier already used": Esa identidad ya reclamó

📁 Scripts de Frontend

Asegúrate que package.json incluya:

"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}

⚙️ Configuración del Contrato
- claimableAmount: Monto a reclamar (default: 100 USDC)
- devMode: Activar soporte de pasaportes falsos
- ofacEnabled: Revisión OFAC por operación
- birthdayRange: Días antes/después del cumpleaños válidos (default: 1)

🔒 Seguridad
- Siempre habilitar OFAC en producción
- El owner puede retirar fondos no reclamados
- Cada identidad puede reclamar solo una vez
- Se usa ZK de Self para verificar sin exponer datos personales
`;