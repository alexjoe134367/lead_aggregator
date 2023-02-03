const steps_agents = [
    {
      id: "intro",
      attachTo: {
        element: ".leadFilters",
        on: "top"
      },
      scrollTo: true,
      beforeShowPromise: function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      buttons: [
        {
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel"
        },
        {
          classes: "shepherd-button-primary",
          text: "Back",
          type: "back"
        },
        {
          classes: "shepherd-button-primary",
          text: "Next",
          type: "next"
        }
      ],
      classes: "custom-class-name-1 custom-class-name-2",
      highlightClass: "highlight",
      showCancelLink: true,
      text: [
        "page->agents:React-Shepherd is a JavaScript library for guiding users through your React app."
      ],
      when: {
        show: () => {
          console.log("show step");
        },
        hide: () => {
          console.log("hide step");
        }
      }
    },
    {
      id: "second",
      attachTo: {
        element: ".leadFilters",
        on: "top"
      },
      text: [
        "Yuk eksplorasi hasil Tes Minat Bakat-mu dan rekomendasi <b>Jurusan</b> dan Karier."
      ],
      buttons: [
        {
          classes: "btn btn-info",
          text: "Kembali",
          type: "back"
        },
        {
          classes: "btn btn-success",
          text: "Saya Mengerti",
          type: "cancel"
        }
      ],
      when: {
        show: () => {
          console.log("show stepp");
        },
        hide: () => {
          console.log("complete step");
        }
      },
      showCancelLink: false,
      scrollTo: true,
      modalOverlayOpeningPadding: 4,
      useModalOverlay: false,
      canClickTarget: false
    }
  ];

export default steps_agents;