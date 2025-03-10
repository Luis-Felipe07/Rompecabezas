let select = false;
let pos_s = "";
let id_s = "";

const rompecabezas = {
    _arr_pos_r: [],
    _arr_pos_a: [],

    _mostrar: function () {
        this._arr_pos_r.length = 0;
        const piezas = parseInt(this._get("piezas").value);
        const tb = document.createElement("table");

        const ar = Math.sqrt(piezas);
        const tam_img = 300;
        const pos_img = tam_img / ar;

        for (let fil = 1; fil <= ar; fil++) {
            const tr = document.createElement("tr");
            for (let cel = 1; cel <= ar; cel++) {
                const c = (fil - 1) * ar + cel;
                const td = document.createElement("td");

                td.className = "pieza";
                td.id = `pos_${c}`;
                td.style.width = `${pos_img}px`;
                td.style.height = `${pos_img}px`;

                const p = `${(pos_img * cel - pos_img) * -1}px ${(fil * pos_img - pos_img) * -1}px`;
                td.style.backgroundPosition = p;
                this._arr_pos_r.push(p);

                // Manejo táctil y clic
                td.addEventListener("click", () => {
                    this._cambiaBGP(td.id);
                    this._compruebaFin();
                });

                td.addEventListener("touchstart", (e) => {
                    e.preventDefault();
                    this._cambiaBGP(td.id);
                    this._compruebaFin();
                });

                tr.appendChild(td);
            }
            tb.appendChild(tr);
        }

        const contentDiv = this._get("div_content");
        if (!contentDiv) {
            const cont = document.createElement("div");
            cont.id = "div_content";
            cont.appendChild(tb);
            document.body.appendChild(cont);
        } else {
            contentDiv.innerHTML = "";
            contentDiv.appendChild(tb);
        }
    },

    _barajar: function () {
        const piezas = parseInt(this._get("piezas").value);

        // Creó un array con todas las posiciones y barájalo
        const posicionesBarajadas = [...this._arr_pos_r].sort(() => Math.random() - 0.5);

        // Asigno las posiciones barajadas a las celdas
        for (let i = 0; i < piezas; i++) {
            const id = `pos_${i + 1}`;
            this._get(id).style.backgroundPosition = posicionesBarajadas[i];
        }
    },

    _cambiaBGP: function (id) {
        if (!select) {
            pos_s = this._get(id).style.backgroundPosition;
            id_s = id;
            select = true;
            this._get(id_s).style.boxShadow = "0px 0px 14px #fff";
        } else {
            const pos_n = this._get(id).style.backgroundPosition;
            this._get(id).style.backgroundPosition = pos_s;
            this._get(id_s).style.backgroundPosition = pos_n;
            this._get(id_s).style.boxShadow = "";
            select = false;
        }
    },

    _compruebaFin: function () {
        const piezas = parseInt(this._get("piezas").value);
        this._arr_pos_a = Array.from({ length: piezas }, (_, i) =>
            this._get(`pos_${i + 1}`).style.backgroundPosition
        );

        const fin = this._arr_pos_r.every((val, index) => val === this._arr_pos_a[index]);
        if (fin) swal("¡LO HAS RESUELTO ERES UN CRACK!");
    },

    _get: function (id) {
        return document.getElementById(id);
    },
};

window.addEventListener("load", () => {
    rompecabezas._mostrar();
    rompecabezas._barajar();

    rompecabezas._get("piezas").addEventListener("change", () => rompecabezas._mostrar());
    rompecabezas._get("barajar").addEventListener("click", () => rompecabezas._barajar());
});
