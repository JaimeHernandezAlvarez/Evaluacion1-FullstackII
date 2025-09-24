(function () {
    const $ = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  
    const input = $("#searchBox");
    const btn   = document.querySelector(".button");
    const box   = $("#resultados");
  
    const CLP = v => new Intl.NumberFormat("es-CL",{style:"currency",currency:"CLP"}).format(v);
  
    function render(lista) {
      box.innerHTML = "";
      if (!lista.length) {
        box.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
      }
      const ul = document.createElement("ul");
      lista.forEach(p => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${p.nombre}</strong> — ${CLP(p.precio)} — 
          <em>${p.categoria}</em> — Vendedor: ${p.vendedor}`;
        ul.appendChild(li);
      });
      box.appendChild(ul);
    }
  
    function filtrar() {
      const q = (input.value || "").trim().toLowerCase();
      if (!q) { render(window.PRODUCTOS); return; }
      const out = window.PRODUCTOS.filter(p =>
        p.nombre.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q) ||
        p.vendedor.toLowerCase().includes(q)
      );
      render(out);
    }
  
    // eventos
    btn?.addEventListener("click", filtrar);
    input?.addEventListener("keydown", e => { if (e.key === "Enter") filtrar(); });
  
    // primera carga
    render(window.PRODUCTOS);
  })();
  