const gridTarjetas = document.querySelector('#grid');
const conteoVidas = document.querySelector('#vidas'); //Player lives count
let cantidadVidas = 5; //player lives

conteoVidas.textContent = cantidadVidas;

const grupoTarjetas = () => [
    { name: 'plant-1', img: '../imagenes/plant-1.png' },
    { name: 'plant-2', img: '../imagenes/plant-2.png' },
    { name: 'plant-3', img: '../imagenes/plant-3.png' },
    { name: 'plant-4', img: '../imagenes/plant-4.png' },
    { name: 'plant-5', img: '../imagenes/plant-5.png' },
    { name: 'plant-6', img: '../imagenes/plant-6.png' },
    { name: 'plant-7', img: '../imagenes/plant-7.png' },
    { name: 'plant-8', img: '../imagenes/plant-8.png' },

    { name: 'plant-1', img: '../imagenes/plant-1.png' },
    { name: 'plant-2', img: '../imagenes/plant-2.png' },
    { name: 'plant-3', img: '../imagenes/plant-3.png' },
    { name: 'plant-4', img: '../imagenes/plant-4.png' },
    { name: 'plant-5', img: '../imagenes/plant-5.png' },
    { name: 'plant-6', img: '../imagenes/plant-6.png' },
    { name: 'plant-7', img: '../imagenes/plant-7.png' },
    { name: 'plant-8', img: '../imagenes/plant-8.png' },
];


const aleatorio = () => {
    const tarjetasData = grupoTarjetas();

    tarjetasData.sort(() => Math.random() - 0.5);
    return tarjetasData;
}
//Creando la Tarjeta
const crearTarjeta = () => {
    const tarjetasData = aleatorio();
    console.log(tarjetasData);

    //Creando el HTML
    tarjetasData.forEach((item) => {
        const tarjeta = document.createElement("div");
        const frontal = document.createElement("img");
        const dorso = document.createElement("div");
        tarjeta.classList = "tarjeta";
        frontal.classList = "frontal";
        dorso.classList = "dorso";

        //Mostrar la informacion de las tarjetas
        frontal.src = item.img;
        tarjeta.setAttribute('name', item.name);

        gridTarjetas.appendChild(tarjeta);
        tarjeta.appendChild(frontal);
        tarjeta.appendChild(dorso);

        tarjeta.addEventListener('click', (e) => {
            tarjeta.classList.toggle("girarTarjeta");
            compararTarjetas(e);
        });
    });
};

//comparar Tarjetas
const compararTarjetas = (e) => {
    const seleccionada = e.target;
    seleccionada.classList.add('girada');
    const mostrandoTarjetas = document.querySelectorAll('.girada');
    const girarTarjeta = document.querySelectorAll(".girarTarjeta");
    const gridTarjetas = document.querySelector('#grid');


    const winIcons = "🎉😎🎉";
    const loseIcons = "😓";
    const tryAgain = "😉";

    if (mostrandoTarjetas.length === 2) {
        if (mostrandoTarjetas[0].getAttribute('name') === mostrandoTarjetas[1].getAttribute('name')) {
            console.log("son iguales");
            mostrandoTarjetas.forEach((tarjeta) => {
                tarjeta.classList.remove("girada");
                tarjeta.style.pointerEvents = "none";
            })
            cantidadVidas = 5;
            conteoVidas.textContent = cantidadVidas;
        } else {
            console.log("no son iguales");
            mostrandoTarjetas.forEach((tarjeta) => {
                tarjeta.classList.remove("girada");
                setTimeout(() => tarjeta.classList.remove("girarTarjeta"), 1000);
            });
            cantidadVidas--;
            conteoVidas.textContent = cantidadVidas;

            if (cantidadVidas === 0) {

                (async () => {
                    const { value: ok } = await swal.fire({
                        title: `Te quedaste sin vidas ${loseIcons}`,
                        text: `¿Lo intentas de nuevo? ${tryAgain}`,
                        background: '#f2f3c9',
                        allowOutsideClick: false,
                        allowOutsideKey: false,
                        confirmButtonColor: '#63055f',
                        confirmButtonArialLabel: 'Quiero jugar de nuevo',
                        customClass: {
                            popup: 'swal-container',
                        }
                    });

                    if (ok) {
                        recomenzar();
                    }
                })();
            }
        };
    };
    if (girarTarjeta.length === 16) {

        (async () => {
            const { value: ok } = await swal.fire({
                title: `Ganaste! Felicidades! ${winIcons}`,
                text: `¿Juegas de nuevo? ${tryAgain}`,
                background: '#dfaadc',

                showCancelButton: true,
                cancelButtonText: 'No',
                cancelButtonColor: '#63055f',
                confirmButtonArialLabel: 'No volver a jugar',

                confirmButtonColor: '#63055f',
                confirmButtonArialLabel: 'Sí, volver a jugar',

                allowOutsideClick: false,
                allowOutsideKey: false,
                customClass: {
                    popup: 'swal-container',
                }
            });

            if (ok) {
                recomenzar();
            } else {
                gridTarjetas.classList.add("noJugar");

            }
        })();
    }
};

//Reestablecer el juego de nuevo
const recomenzar = () => {
    let tarjetasData = aleatorio();
    let frontal = document.querySelectorAll(".frontal");
    let tarjetas = document.querySelectorAll(".tarjeta");
    gridTarjetas.style.pointerEvents = "none";

    tarjetasData.forEach((item, index) => {
        tarjetas[index].classList.remove('girarTarjeta');
        //Reestablecer valores iniciales
        setTimeout(() => {
            tarjetas[index].style.pointerEvents = "all";
            frontal[index].src = item.img;
            tarjetas[index].setAttribute("name", item.name);
            gridTarjetas.style.pointerEvents = "all";
        }, 1000);
    });
    cantidadVidas = 5;
    conteoVidas.textContent = cantidadVidas;
};

crearTarjeta();
