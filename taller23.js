/**
 * Implementación del algoritmo de líneas de Bresenham.
 * @param {number} x0 - Coordenada X inicial.
 * @param {number} y0 - Coordenada Y inicial.
 * @param {number} x1 - Coordenada X final.
 * @param {number} y1 - Coordenada Y final.
 * @param {Function} plot - Función para dibujar el píxel (x, y).
 */
function bresenham(x0, y0, x1, y1, plot) {
    // Cálculo de diferenciales y dirección del paso
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        // Dibujar el punto actual
        plot(x0, y0);

        // Condición de finalización
        if (x0 === x1 && y0 === y1) break;

        let e2 = 2 * err;

        // Ajuste en el eje X
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        // Ajuste en el eje Y
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

function iniciar() {
    // Obtener los valores de los cuadros de texto y convertirlos a números
    let x0 = parseInt(document.getElementById("x0").value);
    let y0 = parseInt(document.getElementById("y0").value);
    let x1 = parseInt(document.getElementById("x1").value);
    let y1 = parseInt(document.getElementById("y1").value);

    dibujarCuadricula(); // Llamamos a la nueva función 
}

// Variables globales para el canvas
let canvas = document.getElementById("miCanvas");
let ctx = canvas.getContext("2d");
let tamanoCelda = 20;

// Método nuevo para dibujar la cuadrícula
function dibujarCuadricula() {
    // Limpiar el canvas antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "10px Arial";
    ctx.fillStyle = "black";
    
    // Dibujar líneas
    for (let i = 0; i <= canvas.width; i += tamanoCelda) {
        // Líneas verticales
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
        let numX = i / tamanoCelda;
        ctx.fillText(numX, i + 2, canvas.height - 2); // Número en la parte inferior

        // Líneas horizontales
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
        let numY = (canvas.height - i) / tamanoCelda; 
        ctx.fillText(numY, 2, i - 2); // Número en el costado izquierdo
    }
}
/**
 * Función para dibujar el píxel (x, y).
 * @param {number} x - Coordenada X definida por el usuario.
 * @param {number} y - Coordenada Y definida por el usuario.
 */
function plot(x, y) {
    ctx.fillStyle = "red";
    
    // Multiplicamos por el tamaño de celda.
    // Para Y, restamos de la altura total para que el 0 quede abajo.
    let pixelX = x * tamanoCelda;
    let pixelY = canvas.height - (y * tamanoCelda) - tamanoCelda; 
    
    ctx.fillRect(pixelX, pixelY, tamanoCelda, tamanoCelda);
}