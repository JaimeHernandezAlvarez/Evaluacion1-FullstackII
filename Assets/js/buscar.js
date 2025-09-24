(() => {
    const $ = (s, c = document) => c.querySelector(s);
    const input = $("#searchBox");
    const btn = $("#btnBuscar") || $(".button");
    const box = $("#resultados");
  
    const CLP = valor =>
      new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
      }).format(valor);
  
    function render(lista) {
      box.innerHTML = "";
      if (!lista.length) {
        box.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
      }
  
      lista.forEach((p) => {
        const card = document.createElement("div");
        card.style.cssText = `
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
          background: white;
          padding: 10px 15px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        `;
  
        const img = document.createElement("img");
        img.src = p.imagen;
        img.alt = p.nombre;
        img.width = 100;
        img.style.borderRadius = "6px";
  
        const texto = document.createElement("div");
        texto.innerHTML = `
          <strong>${p.nombre}</strong><br>
          Precio: ${CLP(p.precio)}<br>
          Categoría: ${p.categoria}<br>
          Vendedor: ${p.vendedor}
        `;
  
        card.appendChild(img);
        card.appendChild(texto);
        box.appendChild(card);
      });
    }
  
    function filtrar() {
      const q = (input?.value || "").trim().toLowerCase();
      if (!q) return render(window.PRODUCTOS || []);
      const out = (window.PRODUCTOS || []).filter((p) =>
        p.nombre.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q) ||
        p.vendedor.toLowerCase().includes(q)
      );
      render(out);
    }
  
    btn?.addEventListener("click", filtrar);
    input?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") filtrar();
    });
  
    render(window.PRODUCTOS || []);
  })();
  