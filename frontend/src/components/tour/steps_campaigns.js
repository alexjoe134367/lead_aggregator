const steps_campaigns = [
    {
      id: "welcometour",
      title: [
        "Welcome to convertlead"],
       text: [
         "<div class='content-left'><h2>Let's start with a quick product tour</h2><p>We'll have you up and running in no time.</p></div><div class='content-right'><img src='/img/welcome.svg' class='welcomebanner'/></div>"],
      classes: 'welcometour',
      buttons: [
         {
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel"
        },
        {
          classes: "shepherd-button-primary",
          text: "Show me later",
          type: "back"
        },
        {
          classes: "shepherd-button-primary blue",
          text: "Start tour",
          type: "next"
        }
      ],
      when: {
        show: () => {
          console.log("show step");
        },
        hide: () => {
          console.log("complete step");
        }
      },
      showCancelLink: false,
      scrollTo: true,
      useModalOverlay: false,
      canClickTarget: false
    },


   {
      id: "navigation",
      attachTo: {
        element: ".AppSidebar",
        on: "right"
      },
      scrollTo: false,
      beforeShowPromise: function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      title: [
        "Navigate between views"],
       text: [
         "<div class='content-left'><p>The main menu is the quickest way to navigate between pages and dashboards.</p></div><div class='content-right'></div>"],
      buttons: [
         {
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel"
        },
        {
          classes: "shepherd-button-primary",
          text: "Previous",
          type: "back"
        },
        {
          classes: "shepherd-button-primary blue",
          text: "Next step",
          type: "next"
        }
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
      id: "navigationcampaigns",
      attachTo: {
        element: ".AppSidebar > a:nth-child(3)",
        on: "right"
      },
      scrollTo: false,
      beforeShowPromise: function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      title: [
        "Campaigns page"],
       text: [
         "<div class='content-left'><p>Inside your campaigns page (current page) you can collect and nurture leads through integrations and automations.</p></div><div class='content-right'></div>"],
      buttons: [
         {
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel"
        },
        {
          classes: "shepherd-button-primary",
          text: "Previous",
          type: "back"
        },
        {
          classes: "shepherd-button-primary blue",
          text: "Next step",
          type: "next"
        }
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
      id: "navigationcompanies",
      attachTo: {
        element: ".AppSidebar > a:nth-child(4)",
        on: "right"
      },
      scrollTo: false,
      beforeShowPromise: function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      title: [
        "Companies/Clients"],
       text: [
         "<div class='content-left'><p>This is where we’ll later add and manage your agency clients. We can also check their stats and edit their permissions to their convertlead account.</p></div><div class='content-right'></div>"],
      buttons: [
         {
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel"
        },
        {
          classes: "shepherd-button-primary",
          text: "Previous",
          type: "back"
        },
        {
          classes: "shepherd-button-primary blue",
          text: "Next step",
          type: "next"
        }
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
      id: "navigationleads",
      attachTo: {
        element: ".AppSidebar > a:nth-child(5)",
        on: "right"
      },
      scrollTo: false,
      beforeShowPromise: function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      title: [
        "Leads page"],
       text: [
         "<div class='content-left'><p>Inside this page, you can manage  and  communicate with your leads through our lightweight CRM . Send emails, call, add notes or even text your leads.</p></div><div class='content-right'></div>"],
      buttons: [
         {
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel"
        },
        {
          classes: "shepherd-button-primary",
          text: "Previous",
          type: "back"
        },
        {
          classes: "shepherd-button-primary blue",
          text: "Next step",
          type: "next"
        }
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
      id: "navigationagents",
      attachTo: {
        element: ".AppSidebar > a:nth-child(7)",
        on: "right"
      },
      scrollTo: false,
      beforeShowPromise: function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      title: [
        "Agents page"],
       text: [
         "<div class='content-left'><p>Add sales agents or reps, connect them to an integration and connect them with their leads.</p></div><div class='content-right'></div>"],
      buttons: [
         {
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel"
        },
        {
          classes: "shepherd-button-primary",
          text: "Previous",
          type: "back"
        },
        {
          classes: "shepherd-button-primary blue",
          text: "Next step",
          type: "next"
        }
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
      id: "navigationlinks",
      attachTo: {
        element: ".sidebar-bootom",
        on: "right"
      },
      scrollTo: false,
      beforeShowPromise: function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      title: [
        "Links"],
       text: [
         "<div class='content-left'><p>Access the official support desk of ConvertLead, logout or check your profile settings by clicking your avatar image.</p></div><div class='content-right'></div>"],
      buttons: [
         {
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel"
        },
        {
          classes: "shepherd-button-primary",
          text: "Previous",
          type: "back"
        },
        {
          classes: "shepherd-button-primary blue",
          text: "Next step",
          type: "next"
        }
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
      id: "navigationagents",
      attachTo: {
        element: ".AppSidebar > a:nth-child(7)",
        on: "right"
      },
      scrollTo: false,
      beforeShowPromise: function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
       title: [
        "Create a new agent account"],
       text: [
         "<div class='content-left'>Let's check out the agents page - click on the agents icon!</p></div><div class='content-right'></div>"],
      advanceOn: {selector: '.AppSidebar > a:nth-child(7)', event: 'click' },

      buttons: [
         {

        action () {
        const selector = document.getElementByClassName('item')
        selector.click()
        return this.next()
      },
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel"
        },
        {
          classes: "shepherd-button-primary",
          text: "Previous",
          type: "back"
        },
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
      id: "welcomecampaigns",
      classes: 'bottom',
      modalOverlayOpeningPadding:"10",
      attachTo: {
        element: ".ui.left.floated.header",
        on: "bottom"
      },
      scrollTo: false,
      beforeShowPromise: function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      title: [
        "Getting started"],
       text: [
         "<div class='content-left'><h2>Your agents page</h2><p>A sales agent or rep is the person communicating with your leads.</p><p>Every lead you add inside ConvertLead will be assigned to an agent account.</p></div><div class='content-right'></div>"],
      buttons: [
         {
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel"
        },
        {
          classes: "shepherd-button-primary",
          text: "Previous",
          type: "back"
        },
        {
          classes: "shepherd-button-primary blue",
          text: "Next step",
          type: "next"
        }
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
      id: "createagent",
      modalOverlayOpeningPadding:"10",
      classes: 'bottom',
      attachTo: {
        element: ".new-campaign",
        on: "bottom"
      },
      scrollTo: false,
      beforeShowPromise: function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },

      advanceOn: {selector: '.new-campaign', event: 'click' },
      title: [
        "Create your first agent account."],
       text: [
         "<div class='content-left'><p> Click the plus icon button.</p></div><div class='content-right'></div>"],
      buttons: [
         {
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel"
        },
        {
          classes: "shepherd-button-primary",
          text: "Previous",
          type: "back"
        },
        
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
      id: "agentsmodal",
      attachTo: {
        element: ".agentForm",
        on: "right"
      },
      scrollTo: true,
         beforeShowPromise: function() {
        return new Promise(function(resolve) {
            // Using JS To click on an element
            document.querySelector(".new-campaign").click();
            resolve();
        });
    },
      modalOverlayOpeningPadding:"10",
      title: [
        "Create a new agent account"],
       advanceOn: {selector: '.ui.multiple.search.selection.dropdown', event: 'mouseover' },
       text: [
         "<div class='content-left'><p>Fill in your agent details (use a unique e-mail address and phone number).</p><p> We'll send him an email with his login credentials and mobile app download once you're done.</p></div><div class='content-right'></div>"],
      buttons: [
         {
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel"
        },
        {
          classes: "shepherd-button-primary",
          text: "Previous",
          type: "back"
        },
        {
          classes: "shepherd-button-primary blue",
          text: "Next step",
          type: "next"
        }
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
      id: "detailshoverclose",
      classes: 'left',
      attachTo: {
        element: ".agentForm",
        on: "left"
      },
    
      title: [
        "Assign your agent to a company"],
      text: [
         "<div class='content-left'><p>Every agent account needs to be assigned to a company. Use your own company account or add more from the companies page.</p></div><div class='content-right'></div>"],
      buttons: [
         {
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel"
        },
        {
          classes: "shepherd-button-primary",
          text: "Previous",
          type: "back"
        },
        {
          classes: "shepherd-button-primary blue",
          text: "Next step",
          type: "next"
        }
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
      id: "saveagent",
        attachTo: {
        element: ".ui.teal.left.labeled.button",
        on: "right"
      },
       advanceOn: {selector: '.ui.tiny.modal', event: 'DOMAttrModified' },
       useModalOverlay:false,
       modalOverlayOpeningPadding:"10",
     title: [
        "Save your agent account"],
       text: [
         "<div class='content-left'><p>Make sure all the details are correct and save your agent. Click previous to edit any info.</p></div><div class='content-right'></div>"],
      buttons: [
         {
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel"
        },
        {
          classes: "shepherd-button-primary",
          text: "Previous",
          type: "back"
        },
      
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
      id: "congratsagent",
      classes: 'right',
      attachTo: {
        element: ".agentContainer",
        on: "bottom"
      },
      title: [
        "Congrats"],
       text: [
         "<div class='content-left'><p>You now have your first agent account. Let’s find out what else we can do on this page. Click next.</p></div><div class='content-right'></div>"],
      buttons: [
         {
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel"
        },
         {
          classes: "shepherd-button-primary blue",
          text: "Next step",
          type: "next"
        }
      
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
      id: "filters",
      classes: 'bottom',
      attachTo: {
        element: ".ui.pointing.secondary.menu",
        on: "bottom"
      },
      scrollTo: false,
      beforeShowPromise: function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      title: [
        "Filters and sorting"],
       text: [
         "<div class='content-left'><p>If you have a big sales team, you can use the filters or search bar to quickly find them. You can also export their data and sort them however you want.</p></div><div class='content-right'></div>"],
      buttons: [
         {
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel"
        },
        {
          classes: "shepherd-button-primary",
          text: "Previous",
          type: "back"
        },
        {
          classes: "shepherd-button-primary blue",
          text: "Next step",
          type: "next"
        }
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
      id: "export",
      classes: 'bottom',
      attachTo: {
        element: ".exportbox",
        on: "bottom"
      },
      scrollTo: false,
      beforeShowPromise: function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      title: [
        "Exporting"],
       text: [
         "<div class='content-left'><p>You can also easily export all your data and performance reports in both .pdf or .csv format.</p></div><div class='content-right'></div>"],
      buttons: [
         {
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel"
        },
        {
          classes: "shepherd-button-primary",
          text: "Previous",
          type: "back"
        },
        {
          classes: "shepherd-button-primary blue",
          text: "Next step",
          type: "next"
        }
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

  ];


export default steps_campaigns;