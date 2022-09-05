AFRAME.registerComponent( 'cursor-listener',{
  schema:{
    selectedItemId : {default:'',type:'string'},

  },
  init : function(){
    this.handleclickEvents()
    this.handleMouseEnterEvents()
    this.handleMouseLeaveEvents()

  },

  handleclickEvents:function(){
    this.el.addEventListener("click", evt => {
      const placesContainer = document.querySelector("#places-container");
      const { state } = placesContainer.getAttribute("tour");

      if (state === "places-list") {
        const id = this.el.getAttribute("id");
        const placesId = [
          "taj-mahal",
          'petra'
        ];
        if (placesId.includes(id)) {
          placesContainer.setAttribute("tour", {
            state: "view",
            selectedCard: id
          });
        }

      }
      if (state == 'view' || state == 'change-view'){
        this.handleViewState()
        
      }
    });
  },
  handleMouseEnterEvents: function(){
    this.el.addEventListener('mouseenter',()=>{
      this.handlePlacesListState()
    })
  },
  handleMouseLeaveEvents: function(){
    this.el.addEventListener('mouseleave',()=>{
      const {selectedItemId} = this.data
      if (selectedItemId){
        const el = document.querySelector(`#${selectedItemId}`)
        const id = el.getAttribute('id')
        if(id == selectedItemId){
            el.setAttribute('material',{
              color:'#0077cc',
              opacity:1
            })
        }
      }
    })
  },
  handlePlacesListState: function() {
    const id = this.el.getAttribute("id");
    const placesId = ["taj-mahal", "petra", "christ-the-redemer", "colosseum",'machu-picchu','great-wall-of-china','chichen-itza'];
    if (placesId.includes(id)) {
      const placeContainer = document.querySelector("#places-container");
      placeContainer.setAttribute("cursor-listener", {
        selectedItemId: id
      });
      this.el.setAttribute("material", {
        color:"#D76B30",
        opacity: 1
      });
    }},

    handleViewState : function(){
      const el = this.el
      const id = el.getAttribute('id')
      placesContainer = document.querySelector('#places-container')
      const {selectedItemId} = placesContainer.getAttribute('cursor-listener')
  

  
   
        placesContainer.setAttribute('tour',{
          state:'change-view',
        })
        const skyel = document.querySelector('#main-container')
        skyel.setAttribute('material',{
          src:`./assets/thumbnails/${selectedItemId}/place-2.jpg`
        })
      }
  
  
    }
  );
  