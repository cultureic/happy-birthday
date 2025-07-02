

# Feliz Cumpleaños

Este proyecto proporciona un contrato inteligente y un frontend sencillo para distribuir USDC a personas en sus cumpleaños, sirviendo como un ejemplo claro de integración con Self.
Este ejemplo introduce un contrato que verifica la fecha de nacimiento en el pasaporte de un usuario y le permite reclamar USDC si su fecha de nacimiento está dentro de un rango de ±1 día respecto a la fecha actual, junto con un frontend que integra esta funcionalidad.

## Instrucciones de Configuración

### Requisitos Previos

- Node.js y Yarn instalados
- Se recomienda instalar [ngrok](https://ngrok.com/) antes de comenzar, ya que será útil para probar el frontend localmente.
- Una wallet con fondos en la testnet Celo Alfajores (para despliegue - obtener desde [Celo faucet](https://faucet.celo.org))
- USDC de prueba para distribuir (obtener desde [Circle faucet](https://faucet.circle.com/))

### Desplegar el Contrato

1. Navega al directorio de contratos:
   ```bash
   cd contracts
   ```

2. Instala las dependencias:
   ```bash
   yarn install
   ```

3. Configura las variables de entorno:
   - Copia `.env.example` a `.env` (o crea un nuevo archivo `.env`)
   - Agrega los siguientes valores requeridos:
   ```env
   # Llave privada para el despliegue (sin el prefijo 0x)
   CELO_ALFAJORES_KEY=tu_llave_privada_aquí
   
   # Llave API de Celoscan para verificación del contrato (opcional pero recomendado)
   CELOSCAN_API_KEY=tu_api_key_de_celoscan_aquí
   ```

4. Compila los contratos (desde el directorio de contratos):
   ```bash
   yarn run build
   ```

5. Configura el entorno de pasaportes en `contracts/scripts/hardhat/deployHappyBirthday.ts`:
   - Para **pasaportes simulados** (testing/desarrollo):
     ```javascript
     devMode: true,
     ofacEnabled: [false, false, false], // Desactiva OFAC para pasaportes simulados
     ```
   - Para **pasaportes reales** (producción):
     ```javascript
     devMode: false,
     ofacEnabled: [true, true, true], // Activa OFAC para pasaportes reales
     ```

6. Despliega los contratos:
   ```bash
   # Para testnet (Celo Alfajores)
   yarn deploy:alfajores
   
   # Para mainnet (Celo)
   yarn deploy:celo
   ```
   
   Después del despliegue, toma nota de la dirección del contrato desplegado.

### Configurar el Frontend

1. Navega al directorio del frontend:
   ```bash
   cd frontend
   ```

2. Instala las dependencias:
   ```bash
   yarn install
   ```

3. Actualiza la dirección del contrato:
   - Abre `frontend/app/page.tsx`
   - Encuentra la constante `HAPPY_BIRTHDAY_CONTRACT_ADDRESS` cerca del inicio
   - Reemplázala con la dirección de tu contrato desplegado:
   ```javascript
   const HAPPY_BIRTHDAY_CONTRACT_ADDRESS = "0xTuDireccionDeContratoDesplegado";
   ```

4. Inicia el servidor de desarrollo (desde el directorio del frontend):
   ```bash
   yarn dev
   ```

5. **Importante**: Financia el contrato desplegado con USDC:
   - El contrato necesita USDC para distribuir a los usuarios elegibles
   - Envía USDC de prueba a la dirección de tu contrato desplegado
   - Puedes obtener USDC de prueba desde el [Circle faucet](https://faucet.circle.com/)

6. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Notas Importantes

### Ventana de Verificación de Cumpleaños
- El contrato permite reclamaciones si la fecha de nacimiento del pasaporte está dentro de ±1 día de la fecha actual
- Esto considera diferencias de zona horaria
- Ejemplo: Si hoy es 14 de junio, puedes reclamar si tu cumpleaños es el 13, 14 o 15 de junio

### Pruebas con Pasaportes Simulados
- Cuando uses pasaportes simulados, asegúrate de que OFAC esté desactivado en el script de despliegue
- Los pasaportes simulados son pasaportes de prueba preconfigurados proporcionados por Self protocol
- Puedes establecer cualquier fecha de nacimiento al crear un pasaporte simulado para pruebas

### Sistema de Nullifiers
- Cada pasaporte solo puede reclamar una vez (para siempre)
- El sistema usa nullifiers para evitar reclamaciones dobles
- Incluso con diferentes pasaportes simulados, si representan a la misma persona, no podrán reclamar dos veces

### Solución de Problemas

1. **Error "OFAC verification failed"**:
   - Esto ocurre al usar pasaportes simulados con OFAC activado
   - Vuelve a desplegar con `ofacEnabled: [false, false, false]`

2. **Error "Birthday is not within the valid window"**:
   - La fecha de nacimiento en el pasaporte debe estar dentro de ±1 día respecto a hoy
   - Para pruebas, crea un pasaporte simulado con la fecha de hoy como cumpleaños

3. **Error "Insufficient funds"**:
   - El contrato no tiene suficiente USDC
   - Envía más USDC de prueba a la dirección del contrato

4. **Error "Nullifier already used"**:
   - Este pasaporte (o identidad) ya reclamó
   - Cada persona solo puede reclamar una vez

5. **El frontend muestra scripts del contrato en package.json**:
   - Asegúrate de que el `package.json` del frontend tenga los scripts de Next.js:
   ```json
   "scripts": {
     "dev": "next dev",
     "build": "next build",
     "start": "next start",
     "lint": "next lint"
   }
   ```

## Configuración del Contrato

El contrato soporta varias opciones de configuración durante el despliegue:

- `claimableAmount`: Monto de USDC que cada persona puede reclamar (por defecto: 100 USDC)
- `devMode`: Activar/desactivar soporte para pasaportes simulados
- `ofacEnabled`: Array de booleanos para verificación OFAC en distintas operaciones
- `birthdayRange`: Número de días antes/después del cumpleaños para permitir reclamaciones (por defecto: 1)

## Consideraciones de Seguridad

- Siempre activa la verificación OFAC para despliegues en producción
- El dueño del contrato puede retirar fondos no reclamados
- Cada pasaporte/identidad solo puede reclamar una vez gracias al sistema de nullifiers
- El contrato usa pruebas de conocimiento cero del protocolo Self para verificar datos del pasaporte sin exponer información personal
`
