(function () {
    // Centro en Santiago
    const map = L.map("map").setView([-33.4489, -70.6693], 12);
  
    // Capa base
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
      maxZoom: 19
    }).addTo(map);
  
    // Marcadores
    (window.VENDEDORES || []).forEach(v => {
      L.marker([v.lat, v.lon])
        .addTo(map)
        .bindPopup(
          `<strong>${v.nombre}</strong><br/>
           Rubro: ${v.rubro}<br/>
           ${v.direccion}`
        );
    });
  })();
  