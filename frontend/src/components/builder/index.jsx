import React, { Component } from 'react';
import { compose } from 'recompose';
import { BuildContainer, BuildFormContainer, MessagesContainer, DealsContainer, CampaignsContainer } from '@containers';
import BuildModal from '../@common/modals/builder';

import { Button, Icon, Dropdown, Popup, Modal } from 'semantic-ui-react';
import Loader from '../loader';

import grapesjs from 'grapesjs';
import plugin from 'grapesjs-preset-webpage';
import basic from 'grapesjs-blocks-basic';
import forms from 'grapesjs-plugin-forms';
import pgexport from 'grapesjs-plugin-export';
import navbar from 'grapesjs-navbar';
import countdown from 'grapesjs-component-countdown';
import tabs from 'grapesjs-tabs';
import customcode from 'grapesjs-custom-code';



import 'grapesjs/dist/css/grapes.min.css';
import defaultPage from './default';
import './grapes.css';
import './index.scss';
import './default.js';
import history from '../../history';
import { config } from "@services";

import * as htmlToImage from 'html-to-image';
import { indexOf } from "ramda";
const svgNameList = ['text', 'link', 'image', 'video', 'map', 'linkblock', 'quote', 'textsection', 'form', 'input', 'textarea', 'select', 'button', 'label', 'checkbox', 'radio', 'navbar', 'countdown', 'tabs', 'customcode'
];

const panelList = [];
panelList[0] = [];
panelList[1] = ['ti ti-device-desktop', 'ti ti-device-tablet', 'ti ti-device-mobile'];
panelList[2] = ['ti ti-marquee-2', '', 'ti ti-arrows-maximize', 'ti ti-code', '', '', 'ti ti-file-import', 'ti ti-eraser'];
panelList[3] = ['ti ti-pencil', 'ti ti-settings', 'ti ti-layers-subtract', 'ti ti-layout-grid'];

class Builder extends Component {
    state = {
        editor: {},
        pages: [],
        preview: true,
        selPage: parseInt(localStorage.getItem('page_id')),
        zIndex: 4,
        show: false,
        pindex: 0,
    };

    componentDidMount() {
        this.props.init();
        let editor = grapesjs.init({
            fromElement: true,
            container: '#gjs',
            storageManager: {
                type: 'local',
                autoload: true,
                autosave: true,
                stepsBeforeSave: 1,
                storeComponents: true,
                storeStyles: true,
                storeHtml: true,
                storeCss: true,
                autorender: false
            },

               canvasCss: '.gjs-selected { outline: 2px dashed #567af8 !important;} .gjs-dashed [data-gjs-highlightable] {outline:2px dashed rgba(90, 110, 168, 0.23) ; outline-offset:-1px ;} .gjs-hovered {outline: 0px dashed #567af8 !important;}',               
               plugins: [
                basic, plugin, forms, pgexport, navbar, countdown, tabs, 'grapesjs-custom-code',
            ],
            pluginsOpts: {
                [pgexport]: {
                    addExportBtn: true,
                    btnLabel: 'export',
                    css: {
                        'style.css': ed => ed.getCss(),
                        'some-file.txt': 'My custom content',
                    },
                    img: async ed => {
                        const images = await ed.getComponents();
                        return images;
                    },
                    'index.html': ed => `<body>${ed.getHtml()}</body>`
                },
                [countdown]: { /* options */ },
                [tabs]:{
                    tabsBlock: {
                        category: 'Extra'
                      }
                },
                
                
            },
            
        });

        const fontManager = editor.StyleManager.getProperty('typography', 'font-family');
        let fontOptions = fontManager.attributes.options;
        //add typography fonts
        fontOptions.push({ value: 'Roboto, Arial', name: 'Roboto' });
        fontOptions.push({ value: 'Open Sans', name: 'Open Sans' });
        fontOptions.push({ value: 'Lato', name: 'Lato' });
        fontOptions.push({ value: 'Montserrat', name: 'Montserrat' });
        fontOptions.push({ value: 'Oswald', name: 'Oswald' });
        fontOptions.push({ value: 'Source Sans Pro', name: 'Source Sans Pro' });
        fontOptions.push({ value: 'Slabo', name: 'Slabo' });
        fontOptions.push({ value: 'Raleway', name: 'Raleway' });
        fontOptions.push({ value: 'Poppins', name: 'Poppins' });
        fontOptions.push({ value: 'Josefin Sans', name: 'Josefin Sans' });
        fontOptions.push({ value: 'Nunito', name: 'Nunito' });

        const panelManager = editor.Panels;
        let panels = panelManager.getPanels();

        panels.map((panel, index) => {
            panel.buttons.models.map((button, pindex) => {
                button.set('label', '');
                button.set('className', panelList[index][pindex]);
            })
            panels[index] = panel;
        });

        const blockManager = editor.Blocks;
       let blocks = blockManager.getAllVisible();
        blockManager.remove( 'column1');
        blockManager.remove( 'column2');
        blockManager.remove( 'column3');
        blockManager.remove( 'column3-7')


        blocks.map((block, index) => {
            block.attributes.media = '<img src = "buildericons/' + svgNameList[index] + '.svg">';
            blocks[index] = block;
            if (block.attributes.label === "Form") {
                const formComponent = [
                    { components: [{ type: 'label', components: 'Name' }, { type: 'input', attributes: { name: 'fullname' } }] },
                    { components: [{ type: 'label', components: 'Email' }, { type: 'input', attributes: { type: 'email', name: 'email' } }] },
                    { components: [{ type: 'label', components: 'Phone' }, { type: 'input', attributes: { name: 'phone' } }] },
                    { type: 'button', attributes: { type: 'submit' } }
                ];
                block.attributes.content.components = formComponent;
            }
        });
        blockManager.render(blocks);

        var _self = this;



         editor.BlockManager.add('1colrow', {
            name:'1colrow',
            label: 'Full width',
            media: '<img src="buildericons/column.svg"/>',
            category: 'Basic',
            style: { order:'1'},
            content: {  type: 'default',
                        name:'content wrap',
                        style: { display:'flex', padding:'20px 20px', 'min-height':'100px','height':'100%','max-width':'100%','width':'100%'},

                        components: [{ type: 'default',
                                        name:'Content',
                                        style: { display:'flex', padding:'40px 40px', 'min-height':'100px','max-width':'1200px','flex-direction':'column', 'margin':'0 auto' },
                                        droppable: true,
                                        editable: true,
                                        components: [ {  
                                                        name:'headline', type:'text', 
                                                        tagname:'h1',
                                                        content:'Your cool feature here',
                                                        style: { 'font-family':'Open Sans', 'font-size':'20px', 'width':'100%','font-weight':'600', 'margin-bottom':'10px',},
                                                                        }, 

                                                        {  
                                                        name:'text', type:'text', 
                                                        tagname:'p',
                                                        content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus laoreet odio ac tristique. Nunc nisl tellus, porta eget eros at, rutrum tempor magna. Etiam ut elementum velit. Morbi auctor elit vel lacinia accumsan.',
                                                        style: { 'font-family':'Open Sans','width':'100%',},
                                                                        },

                                                                    ]                                                                 
                                                    }],
                                    },
             });



         editor.BlockManager.add('2colrow', {
            name:'2colrow',
            label: '2 Columns',
            media: '<img src="buildericons/2colrow.svg"/>',
            category: 'Basic',
            style: { order:'2'},
            content: {  type: 'default',
                        name:'content wrap',
                        style: { display:'flex', padding:'20px 20px', 'min-height':'100px','height':'100%','max-width':'100%','width':'100%'},

                        components: [{ type: 'default',
                                        name:'content',
                                        style: { display:'flex', padding:'20px 20px', 'min-height':'100px','max-width':'1200px','margin':'0 auto' },
                                        droppable: true,
                                        editable: true,
                                        components: [ { 

                                                    type:'default', 
                                                    droppable: true,
                                                    editable: true,
                                                    name:'col1',
                                                    style: { 'font-family':'Open Sans', padding:'20px 20px', display:'flex','flex-direction':'column',cursor:'arrow',height:'100%','width':'50%', float:'left'},
                                                    components: [{  name:'image', type:'image', 
                                                                    attributes: { src: 'buildericons/imgplaceholder.svg' },
                                                                    style: { 'width':'100%', 'height':'100%', display:'block', 'margin-bottom':'20px'},
                                                                    },

                                                                    {  
                                                                    name:'headline', type:'text', 
                                                                    tagname:'h1',
                                                                    content:'Your cool feature here',
                                                                    style: { 'font-family':'Open Sans', 'font-size':'20px', 'font-weight':'600', 'margin-bottom':'10px',},
                                                                    }, 

                                                                    {  
                                                                    name:'text', type:'text', 
                                                                    tagname:'p',
                                                                    content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus laoreet odio ac tristique. Nunc nisl tellus, porta eget eros at, rutrum tempor magna. Etiam ut elementum velit. Morbi auctor elit vel lacinia accumsan.',
                                                                    style: { 'font-family':'Open Sans'},
                                                                    },

                                                                ]
                                        
                                        
                                                     }, 

                                                    {   
                                                        type:'default',
                                                        droppable: true,
                                                        editable: true,
                                                        name:'col2',
                                                        style: { 'font-family':'Open Sans', padding:'20px 20px', display:'flex','flex-direction':'column',cursor:'arrow',height:'100%','width':'50%', float:'left'},
                                                        components: [{  name:'image', type:'image', 
                                                                        attributes: { src: 'buildericons/imgplaceholder.svg' },
                                                                        style: { 'width':'100%', 'height':'100%', display:'block', 'margin-bottom':'20px'},
                                                                        },

                                                                        {  
                                                                        name:'headline', type:'text', 
                                                                        tagname:'h1',
                                                                        content:'Your cool feature here',
                                                                        style: { 'font-family':'Open Sans', 'font-size':'20px', 'font-weight':'600', 'margin-bottom':'10px',},
                                                                        }, 

                                                                        {  
                                                                        name:'text', type:'text', 
                                                                        tagname:'p',
                                                                        content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus laoreet odio ac tristique. Nunc nisl tellus, porta eget eros at, rutrum tempor magna. Etiam ut elementum velit. Morbi auctor elit vel lacinia accumsan.',
                                                                        style: { 'font-family':'Open Sans'},
                                                                        },

                                                                    ]                                                                 
                                                    }
                                                    ],
                                    },],
                                },
                    
             });




 editor.BlockManager.add('3colrow', {
            name:'3colrow',
            label: '3 Columns',
            media: '<img src="buildericons/3columns.svg"/>',
            category: 'Basic',
            style: { order:'2'},
            content: {  type: 'default',
                        name:'content wrap',
                        style: { display:'flex', padding:'20px 20px', 'min-height':'100px','height':'100%','max-width':'100%','width':'100%'},

                        components: [{ type: 'default',
                                        name:'content',
                                        style: { display:'flex', padding:'20px 20px', 'min-height':'100px','max-width':'1200px','margin':'0 auto' },
                                        droppable: true,
                                        editable: true,
                                        components: [ { 

                                                    type:'default', 
                                                    droppable: true,
                                                    editable: true,
                                                    name:'col1',
                                                    style: { 'font-family':'Open Sans', padding:'20px 20px', display:'flex','flex-direction':'column',cursor:'arrow',height:'100%','width':'33%', float:'left'},
                                                    components: [{  name:'image', type:'image', 
                                                                    attributes: { src: 'buildericons/imgplaceholder.svg' },
                                                                    style: { 'width':'100%', 'height':'100%', display:'block', 'margin-bottom':'20px'},
                                                                    },

                                                                    {  
                                                                    name:'headline', type:'text', 
                                                                    tagname:'h1',
                                                                    content:'Your cool feature here',
                                                                    style: { 'font-family':'Open Sans', 'font-size':'20px', 'font-weight':'600', 'margin-bottom':'10px',},
                                                                    }, 

                                                                    {  
                                                                    name:'text', type:'text', 
                                                                    tagname:'p',
                                                                    content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus laoreet odio ac tristique. Nunc nisl tellus, porta eget eros at, rutrum tempor magna. Etiam ut elementum velit. Morbi auctor elit vel lacinia accumsan.',
                                                                    style: { 'font-family':'Open Sans'},
                                                                    },

                                                                ]
                                        
                                        
                                                     }, 

                                                      { 

                                                    type:'default', 
                                                    droppable: true,
                                                    editable: true,
                                                    name:'col1',
                                                    style: { 'font-family':'Open Sans', padding:'20px 20px', display:'flex','flex-direction':'column',cursor:'arrow',height:'100%','width':'33%', float:'left'},
                                                    components: [{  name:'image', type:'image', 
                                                                    attributes: { src: 'buildericons/imgplaceholder.svg' },
                                                                    style: { 'width':'100%', 'height':'100%', display:'block', 'margin-bottom':'20px'},
                                                                    },

                                                                    {  
                                                                    name:'headline', type:'text', 
                                                                    tagname:'h1',
                                                                    content:'Your cool feature here',
                                                                    style: { 'font-family':'Open Sans', 'font-size':'20px', 'font-weight':'600', 'margin-bottom':'10px',},
                                                                    }, 

                                                                    {  
                                                                    name:'text', type:'text', 
                                                                    tagname:'p',
                                                                    content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus laoreet odio ac tristique. Nunc nisl tellus, porta eget eros at, rutrum tempor magna. Etiam ut elementum velit. Morbi auctor elit vel lacinia accumsan.',
                                                                    style: { 'font-family':'Open Sans'},
                                                                    },

                                                                ]
                                        
                                        
                                                     }, 

                                                    {   
                                                        type:'default',
                                                        droppable: true,
                                                        editable: true,
                                                        name:'col2',
                                                        style: { 'font-family':'Open Sans', padding:'20px 20px', display:'flex','flex-direction':'column',cursor:'arrow',height:'100%','width':'33%', float:'left'},
                                                        components: [{  name:'image', type:'image', 
                                                                        attributes: { src: 'buildericons/imgplaceholder.svg' },
                                                                        style: { 'width':'100%', 'height':'100%', display:'block', 'margin-bottom':'20px'},
                                                                        },

                                                                        {  
                                                                        name:'headline', type:'text', 
                                                                        tagname:'h1',
                                                                        content:'Your cool feature here',
                                                                        style: { 'font-family':'Open Sans', 'font-size':'20px', 'font-weight':'600', 'margin-bottom':'10px',},
                                                                        }, 

                                                                        {  
                                                                        name:'text', type:'text', 
                                                                        tagname:'p',
                                                                        content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus laoreet odio ac tristique. Nunc nisl tellus, porta eget eros at, rutrum tempor magna. Etiam ut elementum velit. Morbi auctor elit vel lacinia accumsan.',
                                                                        style: { 'font-family':'Open Sans'},
                                                                        },

                                                                    ]                                                                 
                                                    }
                                                    ],
                                    },],
                                },
                    
             });


editor.BlockManager.add('37colrow', {
            name:'37colrow',
            label: '2 Columns 3/7',
            media: '<img src="buildericons/2col37.svg"/>',
            category: 'Basic',
            style: { order:'2'},
            content: {  type: 'default',
                        name:'content wrap',
                        style: { display:'flex', padding:'20px 20px', 'min-height':'100px','height':'100%','max-width':'100%','width':'100%'},

                        components: [{ type: 'default',
                                        name:'content',
                                        style: { display:'flex', padding:'20px 20px', 'min-height':'100px','max-width':'1200px','margin':'0 auto' },
                                        droppable: true,
                                        editable: true,
                                        components: [ { 

                                                    type:'default', 
                                                    droppable: true,
                                                    editable: true,
                                                    name:'col1',
                                                    style: { 'font-family':'Open Sans', padding:'20px 20px', display:'flex','flex-direction':'column',cursor:'arrow',height:'100%','width':'30%', float:'left'},
                                                    components: [{  name:'image', type:'image', 
                                                                    attributes: { src: 'buildericons/imgplaceholder.svg' },
                                                                    style: { 'width':'100%', 'height':'100%', display:'block'},
                                                                    }
                                                                ]
                                        
                                        
                                                     }, 

                                                    {   
                                                        type:'default',
                                                        droppable: true,
                                                        editable: true,
                                                        name:'col2',
                                                        style: { 'font-family':'Open Sans', padding:'20px 20px', display:'flex','flex-direction':'column',cursor:'arrow',height:'100%','width':'70%', float:'left'},
                                                        components: [{  name:'headline', type:'text', 
                                                                        tagname:'h1',
                                                                        content:'Your cool feature here',
                                                                        style: { 'font-family':'Open Sans', 'font-size':'20px', 'font-weight':'600', 'margin-bottom':'10px',},
                                                                        }, 

                                                                        {  
                                                                        name:'text', type:'text', 
                                                                        tagname:'p',
                                                                        content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus laoreet odio ac tristique. Nunc nisl tellus, porta eget eros at, rutrum tempor magna. Etiam ut elementum velit. Morbi auctor elit vel lacinia accumsan.',
                                                                        style: { 'font-family':'Open Sans', 'margin-bottom':'20px'},
                                                                        },

                                                                        {  
                                                                        name:'text', type:'text', 
                                                                        tagname:'p',
                                                                        content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus laoreet odio ac tristique. Nunc nisl tellus, porta eget eros at, rutrum tempor magna. Etiam ut elementum velit. Morbi auctor elit vel lacinia accumsan.',
                                                                        style: { 'font-family':'Open Sans'},
                                                                        }

                                                                    ]                                                                 
                                                    }
                                                    ],
                                    },],
                                },
                    
             });



         editor.DomComponents.addType('default', {
            model: {

                defaults: {
                    style:{
                        display:'block',
                      padding:'5px 20px',
                      cursor:'arrow',
                      'min-height':'70px',
                      
                      },
                  },
            },
        });



        editor.DomComponents.addType('text-block', {
            model: {
                defaults: {
                    style:{
                      color:'#3c3a4e',
                      'font-family':'Open sans',
                      display:'inline-block',
                      padding:'20px'
                    },
                    content: 'New default content',
                },
            },
        });

                editor.DomComponents.addType('button', {
            model: {
                defaults: {
                    style:{
                      color:'#fff',
                      'max-width':'100%',
                      padding:'17px 35px',
                      margin:'5px 20px',
                      'background-color':'#567af8',
                      'font-family':'Open Sans',
                      'font-weight':'600',
                      border:'0px',
                      'border-radius':'5px 5px 5px 5px',
                      display:'block',
                      'font-size':"17px",
                      cursor:'pointer',
                      'text-align':'center'
                    },

                   text: 'Sign up now',


                attributes: {type:'button' },

                },
            },
        });


                   editor.DomComponents.addType('input', {
            model: {
                defaults: {
                    style:{
                      color:'#3c3a4e',
                      width:'100%',
                      padding:'5px 35px',
                      'background-color':'#fff',
                      'font-family':'Open Sans',
                      'font-weight':'600',
                      border:'1px solid #cacde9',
                      'border-radius':'5px 5px 5px 5px',
                      display:'block',
                      'font-size':"17px",
                      cursor:'pointer',
                      'margin-bottom':'15px'
                    },
                  },
            },
        });


                     editor.DomComponents.addType('label', {
            model: {
                defaults: {
                    style:{
                      color:'#3c3a4e',
                      width:'100%',
                      padding:'5px 10px',
                      'font-family':'Open Sans',
                      'font-weight':'700',
                      display:'block',
                      'font-size':"15px",
                      cursor:'arrow',
                      'margin-bottom':'5px'
                    },
                  },
            },
        });



editor.DomComponents.addType('form', {
            isComponent: el => el.tagName === 'FORM',
            model: {
                init() {
                },
                defaults: {
                    traits: [{
                        type: 'checkbox',
                        name: 'integration',
                        label: 'Send to integration',
                    }
                    ],
                    // attributes: { type: 'text', required: true },
                },
            },
            view: {
                init() {
                    this.listenTo(this.model, 'change:attributes:integration', this.changeIntegration);
                    this.listenTo(this.model, 'change:attributes:campaign', this.changeCampaign);
                    this.listenTo(this.model, 'change:attributes:redirect_checkbox', this.changeRedirect);
                    this.listenTo(this.model, 'change:attributes:redirect_to', this.changeRedirectUrl);

                    if(editor.getHtml().includes('redirect_url_id')){
                        this.model.attributes.attributes.redirect_checkbox = true;
                    }else{
                        this.model.attributes.attributes.redirect_checkbox = false;
                    }
                },
                changeIntegration() {
                    // this.model.setAttributes({...this.model.attributes,method:'post'});
                    this.model.attributes.attributes.method = 'post';
                    this.changeTrait();
                    const properties = this.model.attributes.attributes;
                    if (properties.integration) {
                        _self.props.getCompanyDeals();
                        if (properties.campaign) {
                            let companyId = properties.campaign.split('_')[0];
                            let dealId = properties.campaign.split('_')[1];
                            _self.props.loadDealCampaigns(companyId, dealId);
                        }
                    }
                },
                changeCampaign() {
                    const component = this.model;
                    const campaign = component.getTrait('campaign');
                    let companyId = campaign.attributes.value.split('_')[0];
                    let dealId = campaign.attributes.value.split('_')[1];
                    _self.props.loadDealCampaigns(companyId, dealId);
                },
                changeRedirect() {
                    const component = this.model;
                    const properties = this.model.attributes.attributes;
                    if (properties.redirect_checkbox) {
                        component.addTrait({
                            type: 'input',
                            name: 'redirect_to',
                            label: 'redirect to',
                        }, { at: 5 });
                        
                        const redirect_url= component.get('traits').where({name: 'redirect_to'})[0].get('value');
                        component.append("<input id='redirect_url_id' type='hidden' name='redirect_to' value='"+redirect_url+"'></input>");
                    } else {
                        component.removeTrait('redirect_to');
                        const urlinput = editor.DomComponents.getWrapper().find('#redirect_url_id')[0];
                        if(urlinput !== undefined){
                            const coll = urlinput.collection;
                            coll.remove(urlinput);
                        }
                        
                    }
                },
                changeRedirectUrl(){
                    const component = this.model;
                    const urlinput = editor.DomComponents.getWrapper().find('#redirect_url_id')[0];
                        if(urlinput !== undefined){
                            const coll = urlinput.collection;
                            coll.remove(urlinput);
                        }
                    const redirect_url= component.get('traits').where({name: 'redirect_to'})[0].get('value');
                    component.append("<input id='redirect_url_id' type='hidden' name='redirect_to' value='"+redirect_url+"'></input>");

                },
                changeTrait() {
                    const component = this.model;
                    const properties = component.attributes.attributes;

                    if (properties.integration === true) {//when integration
                        component.removeTrait('method');
                        component.removeTrait('action');
                        component.removeTrait('redirect_to');

                        component.addTrait({//campaign
                            type: 'select',
                            name: 'campaign',
                            label: 'Select campaign',
                        }, { at: 1 });
                        component.addTrait({//integration
                            type: 'text',
                            name: 'method',
                            label: 'Method',
                            attributes: { style: 'display:none' }
                        }, { at: 2 });
                        component.addTrait({//integration
                            type: 'select',
                            name: 'action',
                            label: 'Select Integration',
                        }, { at: 3 });
                        component.addTrait({//redirect checkbox
                            type: 'checkbox',
                            name: 'redirect_checkbox',
                            label: 'redirect on submission',
                        }, { at: 4 });
                        if (properties.redirect_checkbox) {//when redirect
                            component.addTrait({
                                type: 'input',
                                name: 'redirect_to',
                                label: 'redirect to',
                            }, { at: 5 });
                        }
                    } else {//common form method
                        component.removeTrait('method');
                        component.removeTrait('action');
                        component.removeTrait('campaign');
                        component.removeTrait('redirect_checkbox');
                        component.removeTrait('redirect_to');

                        component.addTrait({//method
                            type: 'select',
                            label: 'Method',
                            name: 'method',
                            options: [
                                { value: 'get', name: 'GET' },
                                { value: 'post', name: 'POST' },
                            ]
                        }, { at: 1 });
                        component.addTrait({//action
                            type: 'text',
                            id: 'action',
                            name: 'action',
                            label: 'Action',
                        }, { at: 2 });
                    }
                },
                onRender() {
                }
            }
        });

        const undoManager = editor.UndoManager
        undoManager.start();

        editor.on('run:preview', () => {
            this.setState({
                ...this.state,
                zIndex: 1
            })
        });
        editor.on('stop:preview', () => {
            this.setState({
                ...this.state,
                zIndex: 4
            })
        });

        editor.on('component:selected', async (model) => {
            if (model.attributes.type === "form") {
                if (model.attributes.type === "form") {
                    const component = editor.getSelected(); //Form component
                    const properties = model.attributes.attributes;

                    component.removeTrait('action');
                    component.removeTrait('method');
                    component.removeTrait('campaign');
                    component.removeTrait('redirect_checkbox');
                    component.removeTrait('redirect_to');

                    if (properties.integration === true) {//when integration
                        component.addTrait({//campaign
                            type: 'select',
                            name: 'campaign',
                            label: 'Select campaign',
                        }, { at: 1 });
                        component.addTrait({//method
                            type: 'text',
                            name: 'method',
                            label: 'Method',
                            attributes: { style: 'display:none' }
                        }, { at: 2 });
                        component.addTrait({//integration
                            type: 'select',
                            name: 'action',
                            label: 'Select Integration',
                        }, { at: 3 });
                        component.addTrait({//redirect checkbox
                            type: 'checkbox',
                            name: 'redirect_checkbox',
                            label: 'redirect on submission',
                        }, { at: 4 });
                        if (properties.redirect_checkbox) {//when redirect
                            component.addTrait({
                                type: 'input',
                                name: 'redirect_to',
                                label: 'redirect to',
                            }, { at: 5 });
                        }
                    } else {//common form method
                        component.addTrait({//method
                            type: 'select',
                            label: 'Method',
                            name: 'method',
                            options: [
                                { value: 'get', name: 'GET' },
                                { value: 'post', name: 'POST' },
                            ]
                        }, { at: 1 });
                        component.addTrait({//action
                            type: 'text',
                            id: 'action',
                            name: 'action',
                            label: 'Action',
                        }, { at: 2 });
                    }

                    if (properties.integration) {
                        _self.props.getCompanyDeals();
                        if (properties.campaign) {
                            let companyId = properties.campaign.split('_')[0];
                            let dealId = properties.campaign.split('_')[1];
                            _self.props.loadDealCampaigns(companyId, dealId);
                        }
                    }
                }
            }
        });
        
        editor.on('storage:end:store', async(item) => {
            // this.setCountDownStyle(editor);
        });
        
        editor.load();
        editor.render();

        this.setState({
            ...this.state,
            editor: editor
        });
        
        setTimeout(() => {
            this.setCountDownStyle(editor);
        }, 1000);
    }
    componentDidUpdate(prevProps) {
        const { deals, campaigns } = this.props;
        const { editor } = this.state;

        if (this.props.deals !== prevProps.deals) {
            const campaignOptions = deals.map(deal => {
                return {
                    value: deal.company.id + '_' + deal.id,
                    name: deal.name
                }
            })
            const component = editor.getSelected();
            if (component.attributes.attributes.integration) {
                component.getTrait('campaign').set('options', campaignOptions);
            }
        }
        if (this.props.campaigns !== prevProps.campaigns) {
            var integrationOptions = [];
            campaigns.map(campaign => {
                if(campaign.agents.length !== 0){
                    integrationOptions = [...integrationOptions, {
                        value: `${config.get('REACT_APP_API_SERVER')}/v1/campaigns/${campaign.uuid}/leads`,
                        name: campaign.name
                    }];
                }
            })
            const component = editor.getSelected();
            if (component.attributes.attributes.integration) {
                component.getTrait('action').set('options', integrationOptions);
            }
        }
    }

    preview = (run) => {
        const { editor } = this.state;
        const commandManager = editor.Commands
        if (run === true) {
            commandManager.get('preview').run(editor)
            this.setState({ ...this.state, zIndex: 1 });
        } else {
            commandManager.get('preview').stop(editor)
            this.setState({ ...this.state, zIndex: 4 });
        }
    }

    undo = () => {
        const { editor } = this.state;
        const undoManager = editor.UndoManager
        if (undoManager.hasUndo()) {
            undoManager.undo();
        }
    }

    redo = () => {
        const { editor } = this.state;
        const undoManager = editor.UndoManager
        if (undoManager.hasRedo()) {
            undoManager.redo();
        }
    }

    changePage = (e, data) => {
        const { pages } = this.props;
        const { editor } = this.state;

        pages.map((page, pindex) => {
            if (page.id === data.value) {
                localStorage.setItem('gjsProject', page.gjs);
                if (!page.gjs) {
                    localStorage.setItem("gjsProject", JSON.stringify(defaultPage))
                }
                editor.load();

                this.setState({
                    ...this.state,
                    selPage: data.value,
                    pindex: pindex,
                })
            }
        });

    }

    save = async () => {
        const { editor, selPage } = this.state;
        const { pages } = this.props;
        let pageID = selPage === 0 ? pages[0].id : selPage;
        var _self = this.props;

        if (pages.length) {
            if (pages[0].id === selPage) {
                const iframe = document.querySelector('iframe.gjs-frame');
                htmlToImage.toJpeg(iframe.contentWindow.document.body).then(function (dataUrl) {
                    _self.savePage(editor, pageID, dataUrl);
                }).catch(function (error) {
                    _self.savePage(editor, pageID, '');
                    console.error("oops, something wents wrong! but saved!", error);
                });
            } else {
                this.props.savePage(editor, pageID, '');
            }
        }
    }

    add = () => {
        this.props.showModal({ show: true, type: 0, id: 0 });
    }

    export = async() => {
      
        const { pages } = this.props;
        const { editor, selPage } = this.state;
        let pages_temp = [];
        pages.map((page, pindex) => {
                localStorage.setItem('gjsProject', page.gjs);
                if (!page.gjs) {
                    localStorage.setItem("gjsProject", JSON.stringify(defaultPage))
                }
                editor.load();
                
                pages_temp = [...pages_temp, {id:page.name, styles:editor.getCss(), component:editor.getHtml()}];
        });
        console.log(pages_temp);
        pages.map((page, pindex) => {
            if (page.id === selPage) {
                localStorage.setItem('gjsProject', page.gjs);
                if (!page.gjs) {
                    localStorage.setItem("gjsProject", JSON.stringify(defaultPage))
                }
                editor.load();
            }
        });
        let editor_export = grapesjs.init({
            pageManager: {
                pages: pages_temp
              },
            container: '#gjs_temp',
            storageManager: {
                type: 'local',
                autoload: true,
                autosave: true,
                stepsBeforeSave: 1,
                storeComponents: true,
                storeStyles: true,
                storeHtml: true,
                storeCss: true,
                autorender: false
            },
            plugins: [
                pgexport, 
            ],
            pluginsOpts: {
                [pgexport]: {
                    root: async(ed) =>{ 
                        // const all = ed.Pages.getAll();
                        const all = pages_temp;

                        const pages = {};
                        const css = {};
                        

                        all.map(page => {
                            
                            pages[page.id + '.html'] = '<!doctype html>' +
                                '<html lang="en">' +
                                '<head>' +
                                '<meta charset="utf-8">' +
                                '<link rel="stylesheet" href="css/style-' + page.id + '.css">' +
                                '</head>' +
                                page.component +
                                '</html>';
                            css['style-' + page.id + '.css'] = page.styles;
                        });
                        return {
                            css: {
                                ...css
                            },
                            ...pages
                        }
                    }
                },
            },
        }); 
        editor_export.runCommand('gjs-export-zip');
        
    }

    delete = () => {
        const { selPage } = this.state;
        const { pages, sendMessage } = this.props;
        let pageID = selPage === 0 ? pages[0].id : selPage;

        if (selPage === 0 || selPage === pages[0].id) {
            sendMessage('Can\'t delete index page!', true);
            this.setState({
                ...this.state,
                show: false,
            })
        } else {
            this.props.deletePage(pageID);
            this.setState({
                ...this.state,
                show: false,
                selPage: pages[0].id
            })
        }
    }

    stateChange = (states) => {
        this.setState({
            ...this.state,
            ...states
        })
    }

    duplicate = () => {
        const { selPage, editor } = this.state;
        const { pages } = this.props;
        let pageID = selPage === 0 ? pages[0].id : selPage;
        this.props.showModal({ show: true, type: 1, editor: editor, id: pageID });
    }

    seo = () => {
        const { selPage, pindex } = this.state;
        const { pages } = this.props;
        let pageID = selPage === 0 ? pages[0].id : selPage;
        this.props.showModal({ show: true, type: 2, id: pageID, name: pages[pindex].name, pagetitle: pages[pindex].title, description: pages[pindex].description });
    }

    stateChange = (states) => {
        this.setState({
            ...this.state,
            ...states
        })
    }

    setCountDownStyle = (editor) => {
        editor.setStyle("");
        if (JSON.parse(localStorage.getItem("gjsProject"))){
            const gjsStyles = JSON.parse(localStorage.getItem("gjsProject")).styles;
            
            gjsStyles.map((item, index) => {
                editor.addStyle(item);
               
            });
        }
    }

    getStylePropertyName = (key) => {
        let str = '';
        if (key.indexOf("-")) {
            const keys = key.split("-");
            for (const i in keys) {
                str += keys[i].charAt(0).toUpperCase() + keys[i].slice(1);
            }
        }
        return str.charAt(0).toLowerCase() + str.slice(1);
    }

    render() {
        const { pages } = this.props;
        const { selPage, zIndex, show } = this.state;

        const pageOptions = pages.map((page, index) => ({
            key: index,
            text: page.name,
            value: page.id,
        }));

        return (
            <>
                <BuildModal />
                <Modal
                    size={"mini"}
                    open={show}
                    onClose={() => this.stateChange({ show: false })}
                >
                    <Modal.Header>Delete Page?</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete your page?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => this.stateChange({ show: false })}>
                            No
                        </Button>
                        <Button positive onClick={() => this.delete()}>
                            Yes
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Button onClick={() => window.location.href='/pages'} color="grey" className="page_back" style={{ zIndex: zIndex }}><i className='ti ti-arrow-left' /></Button>
                <Button.Group className='control page' style={{ zIndex: zIndex }}>
                    <Dropdown onChange={(e, data) => this.changePage(e, data)} value={selPage} selection options={pageOptions} className="page_list" />
                    <Popup
                        trigger={<Button circular icon='ellipsis horizontal' className="page_setting" />}
                        content={
                            <Button.Group vertical className='page_actions'>
                                <Button onClick={() => this.stateChange({ show: true })}>Delete</Button>
                                <Button onClick={() => this.duplicate()}>Duplicate</Button>
                                <Button onClick={() => this.seo()}>SEO Settings</Button>
                            </Button.Group>
                        }
                        flowing hoverable
                        position='bottom center'
                    />
                    <Button onClick={() => this.add()} color="blue" className="page_add"><i className='ti ti-plus' /></Button>
                    <Button onClick={() => this.export()} color="blue" className="page_export"><i className='ti ti-download' /></Button>

                </Button.Group>
                <Button.Group className='control demo' style={{ zIndex: zIndex }}>
                    <Button onClick={() => this.preview(true)} className="page_preview">Preview</Button>
                    <Button onClick={() => this.save()} color="blue" className="page_save">Save</Button>
                </Button.Group>
                <Icon onClick={() => this.preview(false)} style={{ zIndex: 5 - zIndex }} name="eye slash" size='big' className="page_preview"></Icon>
                <Button.Group className='control history' style={{ zIndex: zIndex }}>
                    <Button onClick={() => this.undo()} icon="undo" className="page_undo"></Button>
                    <Button onClick={() => this.redo()} icon="redo" className="page_redo"></Button>
                </Button.Group>

                <div id="gjs">
                </div>
                <div id="gjs_temp" style={{display:"none"}}>
                        

                </div>
                
                <Loader />
            </>
        );
    }
}

export default compose(BuildContainer, BuildFormContainer, MessagesContainer, DealsContainer, CampaignsContainer)(Builder);