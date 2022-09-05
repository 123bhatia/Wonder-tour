AFRAME.registerComponent("tour", {
  schema: {
    state: { type: "string", default: "places-list" },
    selectedCard: { type: "string", default: "#card1" },
  },
  init: function () {
    this.placesContainer = this.el;
    this.createCards();
  },

  tick: function () {
    const { state } = this.el.getAttribute("tour");

    if (state === "view") {
      this.hideEl([this.placesContainer]);
      this.showView();
    }
  },
  hideEl: function (elList) {
    elList.map(el => {
      el.setAttribute("visible", false);
    });
  },

  showView: function () {
    const { selectedCard } = this.data;

    //Set the 360 degree image to the sky element.
    const skyEl = document.querySelector("#main-container");

    skyEl.setAttribute("material", {
      src: `./assets/thumbnails/${selectedCard}/place-0.jpg`,
      color: "white"
    });
  },

  createCards: function () {
    const thumbNailsRef = [
      {
        id: "taj-mahal",
        title: "Taj Mahal",
        url: "./assets/thumbnails/taj_mahal.png",
      },
      {
        id: "christ-the-redemer",
        title: "Christ the Redeemer",
        url: "./assets/thumbnails/christ_the_redemmer.jpg",
      },
      {
        id: "great-wall-of-china",
        title: "Great Wall of China",
        url: "./assets/thumbnails/the-great-wall-of-china.jpg",
      },
      {
        id: "colosseum",
        title: "Colosseum",
        url: "./assets/thumbnails/Colosseum.jpg",
      },
      {
        id: "petra",
        title: "Petra",
        url: "./assets/thumbnails/petra.jpg",
      },
      {
        id: "machu-picchu",
        title: "Machu Picchu",
        url: "./assets/thumbnails/machu_picchu.jpg",
      },
      {
        id: "chichen-itza",
        title: "Chichen Itza",
        url: "./assets/thumbnails/chichen-itza.jpg",
      }
    ];
    let prevoiusXPosition = -80;

    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 20;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      // Border Element
      const borderEl = this.createBorder(position, item.id);

      // Thumbnail Element
      const thumbNail = this.createThumbNail(item);
      borderEl.appendChild(thumbNail);

      // Title Text Element
      const titleEl = this.createTitleEl(position, item);
      borderEl.appendChild(titleEl);

      this.placesContainer.appendChild(borderEl);
    }
  },
  createBorder: function (position, id) {

    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("id", id);
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "ring",
      radiusInner: 6,
      radiusOuter: 6.75,
    });
    entityEl.setAttribute("position", position);
    entityEl.setAttribute("material", {
      color: "#0077CC",
      opacity: 1,
    });

    //Add cursor-listener component to the ring border entity to change it's color 
    //On Cursor 'mouseenter' and 'mouseleave' entity
    entityEl.setAttribute("cursor-listener", {});

    return entityEl;
  },
  createThumbNail: function (item) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "circle",
      radius: 6,
    });
    entityEl.setAttribute("material", { src: item.url });

    return entityEl;
  },
  createTitleEl: function (position, item) {


    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("text", {
      font: "exo2bold",
      align: "center",
      width: 80,
      color: "#000",
      value: item.title,
    });
    const elPosition = position;
    elPosition.y = -10;
    entityEl.setAttribute("position", elPosition);
    entityEl.setAttribute("visible", true);
    
    return entityEl;
  },
});
