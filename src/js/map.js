var myMap;

ymaps.ready(init);

function init() {
  myMap = new ymaps.Map("map", {
    center: [55.159902, 61.402554],
    controls: [
      "trafficControl",
      "routeButtonControl",
      "typeSelector",
      "zoomControl"
    ],
    zoom: 14
  });
  myMap.behaviors.disable("scrollZoom");
  if (mapData.length) {
    for (let i = 0; i < mapData.length; i++) {
      let item = mapData[i];
      let itemPhones = "";
      if (item.phones) {
        for (let j = 0; j < item.phones.length; j++) {
          itemPhones += item.phones[j];
          if (j < item.phones.length - 1) {
            itemPhones += ", ";
          }
        }
      }
      let itemAddress = item.address || "";
      let itemCoords = item.coords
        .replace(/\s/g, "")
        .split(",")
        .map((item) => {
          return parseFloat(item);
        });
      let itemTitle = item.title || item.address;
      let myPlacemark = new ymaps.Placemark(
        itemCoords,
        {
          balloonContentBody:
            "<div class='map__content'>" +
            "<div class='map__title'>" +
            itemTitle +
            "</div>" +
            "<p>" +
            itemPhones +
            "</p>" +
            "<p>" +
            itemAddress +
            "</p>" +
            "</div>",
          hintContent: itemTitle
        },
        {
          preset: "islands#blueIcon"
        }
      );
      myMap.geoObjects.add(myPlacemark);
    }
  }
  myMap.setBounds(myMap.geoObjects.getBounds(), {
    checkZoomRange: true
  });

  const mapLinks = document.querySelectorAll(".js-map-link");
  mapLinks.forEach((item) => {
    item.addEventListener("click", handleMapLinkClick);
  });

  function handleMapLinkClick(e) {
    const newCoords = e.target.dataset.coords
      .replace(/\s/g, "")
      .split(",")
      .map((item) => {
        return parseFloat(item);
      });
    myMap.setCenter(newCoords);
    myMap.setZoom(14, {
      checkZoomRange: true
    });
  }
}
