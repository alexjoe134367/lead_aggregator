import React, {Component, useContext} from 'react';
// tour module setting.
import { ShepherdTour, ShepherdTourContext } from 'react-shepherd'
import './index.scss';

import steps_leads from './steps_leads';
import steps_campaigns from './steps_campaigns';
import steps_companies from './steps_companies';
import steps_agents from './steps_agents';
import 'shepherd.js/dist/css/shepherd.css';
const tourOptions = {
  
  defaultStepOptions: {
   
  },
  useModalOverlay: true,


};

function SH_Button() {
  const tour = useContext(ShepherdTourContext);
  if(!localStorage.getItem('shepherd-tour')) {
    // tour.start();     you need to uncomment this when run tour
    console.log("one displayed");
    localStorage.setItem('shepherd-tour', 'yes');
  }
  
  return (
    // you need to remove dispaly style when run tour
    <button className="button dark " onClick={tour.start} style={{'display':'none'}}>
      Start Tour
    </button>
  );
}

//Construct the steps

class Tour extends React.Component{
    
    render(){
        let page = this.props.page;
        return(
            <>
            {page === 'leads'?
                <ShepherdTour steps={steps_leads} tourOptions={tourOptions}>
                    <SH_Button />
                </ShepherdTour>:
            page === 'campaigns'?
                <ShepherdTour steps={steps_campaigns} tourOptions={tourOptions}>
                <SH_Button />
                </ShepherdTour>:
            page === 'companies'?
                <ShepherdTour steps={steps_companies} tourOptions={tourOptions}>
                <SH_Button />
                </ShepherdTour>:
            page === 'agents'?
                <ShepherdTour steps={steps_agents} tourOptions={tourOptions}>
                <SH_Button />
                </ShepherdTour>
                : <></>
            }
            
            </>
        );
        
    }
}

export default Tour;


