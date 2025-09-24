(function () {
    const diasES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const hoyNombre = () => diasES[new Date().getDay()];
  
    // Crear mapa
    const map = L.map("map").setView([-33.4489, -70.6693], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
      maxZoom: 19
    }).addTo(map);
  
    // Agregar marcadores desde vendedores.js
    const markers = (window.VENDEDORES || []).map(v => {
      const diasTxt = (v.dias || []).join(", ");
      const popup = `
        <strong>${v.nombre}</strong><br/>
        Rubro: ${v.rubro}<br/>
        ${v.direccion}<br/>
        <small><b>Días:</b> ${diasTxt || "—"} · <b>Horario:</b> ${v.horario || "—"}</small>
      `;
      const m = L.marker([v.lat, v.lon]).bindPopup(popup).addTo(map);
      return { marker: m, data: v };
    });
  
    // Filtros
    const selDia = document.getElementById("dia");
    const selRubro = document.getElementById("rubro");
    const btnAplicar = document.getElementById("aplicarFiltro");
  
    function coincideDia(dias, filtro) {
      if (filtro === "todos") return true;
      if (filtro === "hoy") return dias?.includes(hoyNombre());
      return dias?.includes(filtro);
    }
  
    function coincideRubro(rubro, filtro) {
      return filtro === "todos" ? true : rubro === filtro;
    }
  
    function aplicarFiltro() {
      const dia = selDia?.value || "todos";
      const rubro = selRubro?.value || "todos";
  
      markers.forEach(({ marker, data }) => {
        const visible = coincideDia(data.dias, dia) && coincideRubro(data.rubro, rubro);
        if (visible && !map.hasLayer(marker)) marker.addTo(map);
        if (!visible && map.hasLayer(marker)) map.removeLayer(marker);
      });
    }
  
    // Mi ubicación
    const btnUbicacion = document.getElementById("miUbicacion");
    let userMarker = null;
  
    btnUbicacion?.addEventListener("click", () => {
      if (!navigator.geolocation) return alert("Tu navegador no soporta geolocalización.");
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          if (!userMarker) {
            userMarker = L.marker([latitude, longitude], { title: "Estás aquí" })
              .addTo(map)
              .bindPopup("Estás aquí");
          } else {
            userMarker.setLatLng([latitude, longitude]);
          }
          map.setView([latitude, longitude], 14);
          userMarker.openPopup();
        },
        () => alert("No se pudo obtener tu ubicación.")
      );
    });
  
    // Inicializar
    if (selDia) selDia.value = "hoy";
    aplicarFiltro();
    btnAplicar?.addEventListener("click", aplicarFiltro);
  })();
  