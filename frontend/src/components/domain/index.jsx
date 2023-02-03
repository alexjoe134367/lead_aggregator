import React, { Component } from 'react';
import { compose } from 'recompose';
import {
  Segment, Header, Input, Grid, Menu, List, Card, Button, Image, Popup, Table, Label, Progress, Dropdown, Modal
} from 'semantic-ui-react';

import { BreadCrumbContainer, CompaniesContainer, DomainContainer, DomainFormContainer } from '@containers';
import DomainModal from '../@common/modals/domain';
import Loader from '../loader';

import { FileUploader } from "react-drag-drop-files";
import { Auth } from "@services";

import './index.scss';
import 'react-image-crop/dist/ReactCrop.css'

const categoryList = [{
  label: 'Landing Pages',
  key: 1
}, {
  label: 'Sales Funnels',
  key: 2
}, {
  label: 'One Page',
  key: 3
}, {
  label: 'Websites',
  key: 4
}, {
  label: 'Misc',
  key: 5
}]

class Domain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: Auth.role === "admin" ? 'templates' : 'projects',
      selectedSubItem: Auth.role === "admin" ? 1 : 0,
      selType: 0,
      selSort: 0,

      crop: {
        selCard: 0,
        show: false,
        src: '',
      },

      selCard: 0,
      show: false,
      mtype: "project"
    }
  }
  componentWillMount() {
    if (Auth.role === "agency") {
      this.props.loadDomainCompanies();
    }
    this.props.addBreadCrumb({
      name: 'Project',
      path: '/pages'
    });
    this.props.init(  );
  }

  onSelectItem = (item, subitem = 0) => {
    this.setState({
      selectedItem: item,
      selectedSubItem: subitem,
    });
  }

  stateChange = (states) => {
    this.setState({
      ...this.state,
      ...states
    })
  }

  cropStateChange = (states) => {
    this.setState({
      ...this.state,
      crop: {
        ...this.state.crop,
        ...states
      }
    })
  }

  cropImageChange = (file, _self) => {
    var reader = new FileReader();
    var src;
    reader.onloadend = function () {
      src = reader.result;
      _self.setState({
        ..._self.state,
        crop: {
          ..._self.state.crop,
          src: src,
        }
      })
    }
    reader.readAsDataURL(file);
  }

  deleteCard = () => {
    const { selCard, mtype } = this.state;
    this.props.deleteItem({ type: mtype, id: selCard });

    this.setState({
      show: false,
    })
  }

  editImage = () => {
    const { crop } = this.state;
    this.props.editImage({ ...crop, isNew: false });
    this.setState({
      ...this.state,
      crop: {
        ...this.state.crop,
        show: false
      }
    })
  }

  deleteDomain = (id) => {
    this.setState({ mtype: "domain", selCard: id, show: true });
  }

  checkStorage = (gjs) => {
    console.log( JSON.parse(gjs) )
  }

  render() {
    const { domains, templates, projects, connects, companies, user_info } = this.props;
   
    const { selectedItem, selectedSubItem, selType, selSort, show, crop, mtype } = this.state;
    let connectedDomains = connects.map(a => a.domain_id);
    let connectedProjects = connects.map(a => a.project_id);
    let companyList = {};
    companies.map(a => {
      companyList[a.id] = a.name;
    });
    
    if (selSort === 0) {
      projects.sort((a, b) => (a.created_at > b.created_at) ? -1 : ((b.created_at > a.created_at) ? 1 : 0))
    } else {
      projects.sort((a, b) => (a.created_at > b.created_at) ? 1 : ((b.created_at > a.created_at) ? -1 : 0))
    }

    const projectCardList = projects && projects.map((project, index) => {
      let image;

      if (project.preview_image) {
        image = project.preview_image;
      }

      let connectedDomain;
      let ind = connectedProjects.indexOf(project.id);
      connectedDomain = "http://responsivewebpages.com/" + companyList[project.company_id] + "/" + project.name;

      if (ind === -1 && selType !== 1) {
        return (
          <Card key={index}>
            <Card.Content>
              <Card.Header className='preview-wrapper'>
                <Image
                  className={'cardimage'}
                  src={image || 'card.png'}
                  alt='Not Found Image'
                  onClick={this.props.goBuilder.bind(this, { type: 0, id: project.id, page_id: project.pages[0].id, gjs: project.pages[0].gjs })}
                />
              </Card.Header>
              <Grid>
                <Grid.Row verticalAlign='bottom' columns={2}>
                  <Grid.Column width={12}>
                    <Card.Header>{project.name}</Card.Header>
                    <Card.Description>
                      <a href={connectedDomain} target="react/jsx-no-target-blank">
                        {connectedDomain}
                      </a>
                    </Card.Description>
                    <Card.Description>Created:{project.created_at.slice(0, 10)}</Card.Description>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Popup className="pageedit"
                      trigger={<Button circular icon='ellipsis horizontal' />} 
                      content={
                        <Button.Group vertical>
                          <Button color="grey"
                            onClick={this.props.showModal.bind(this, { type: 0, isNew: false, id: project.id, changeable: project.name, company: project.company_id, template_id: 0, show: true })}>Edit</Button>
                          <Button color="grey"
                            onClick={this.props.showModal.bind(this, { type: 3, isNew: false, id: project.id, changeable: project.name, company: project.company_id, template_id: 0, show: true })}>Settings</Button>
                          <Button color="grey" onClick={() => this.stateChange({ mtype: "project", show: true, selCard: project.id })}>Delete</Button>
                        </Button.Group>
                      }
                      flowing hoverable
                      position='bottom center'
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>
          </Card>
        )
      } else if (ind !== -1 && selType !== 2) {
        let cdomain = connectedDomains[ind]
        domains.map((domain) => {
          if (domain.id === cdomain) {
            connectedDomain = domain.name;
          }
        })
        return (
          <Card key={index}>
            <Card.Content>
            <Card.Header className='preview-wrapper'>
              <Image
                className={'cardimage'}
                src={image || 'card.png'}
                alt='Not Found Image'
                onClick={this.props.goBuilder.bind(this, { type: 0, id: project.id, page_id: project.pages[0].id, gjs: project.pages[0].gjs })}
              />
              </Card.Header>
              <Grid>
                <Grid.Row verticalAlign='bottom' columns={2}>
                  <Grid.Column width={12}>
                    <Card.Header>{project.name}</Card.Header>
                    <Card.Description>
                      <a href={connectedDomain} target="react/jsx-no-target-blank">
                        {connectedDomain}
                      </a>
                    </Card.Description>
                    <Card.Description>Created:{project.created_at.slice(0, 10)}</Card.Description>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Popup className="pageedit"
                      trigger={<Button circular icon='ellipsis horizontal' />}
                      content={
                        <Button.Group vertical>
                          <Button color="grey"
                            onClick={this.props.showModal.bind(this, { type: 0, isNew: false, id: project.id, changeable: project.name, company: project.company_id, template_id: 0, show: true })}>Edit</Button>
                          <Button color="grey"
                            onClick={this.props.showModal.bind(this, { type: 3, isNew: false, id: project.id, changeable: project.name, company: project.company_id, template_id: 0, show: true, domain: cdomain })}>Settings</Button>
                          <Button color="grey" onClick={() => this.stateChange({ mtype: "project", show: true, selCard: project.id })}>Delete</Button>
                        </Button.Group>
                      }
                      flowing hoverable
                      position='bottom center'
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>
          </Card>
        )
      } else {
      }
    });

    const templateCardList = templates && templates.map((template, index) => {
      if (template.category_id === selectedSubItem) {
        let image = false;

        if (template.preview_image) {
          image = template.preview_image;
        }

        return (
          <Card key={index}>
            <Card.Content className='template-content'>
              <Image
                className={'cardimage'}
                src={image || 'card1.png'}
                alt='Not Found Image'
              />
              <Grid>
                <Grid.Row verticalAlign='bottom' className='templates'>
                  <Card.Header>{template.name}</Card.Header>
                  <Card.Description>Created:{template.created_at.slice(0, 10)}</Card.Description>
                </Grid.Row>
                {Auth.role === "admin"
                  ?
                  <>
                    <div className='ui three buttons mt-1'>
                      <Button color='green' onClick={this.props.goBuilder.bind(this, { type: 2, id: template.id, page_id: template.pages[0].id, gjs: template.pages[0].gjs })}>
                        Edit
                      </Button>
                      <Button.Or />
                      <Button color='red' onClick={() => this.stateChange({ mtype: "template", show: true, selCard: template.id })}>
                        Delete
                      </Button>
                    </div>
                    <Button fluid color='blue' className='select-template' onClick={() => this.cropStateChange({ show: true, selCard: template.id })}>
                      Image
                    </Button>
                  </>
                  :
                  <Button fluid color='blue' className='select-template' onClick={this.props.showModal.bind(this, { type: 0, isNew: true, id: 0, template_id: template.id, show: true })}>
                    Select
                  </Button>
                }
              </Grid>
            </Card.Content>
          </Card>
        )
      }
    });

    const connectedDomainList = domains.map((domain, index) => {
      let connectedProject, cproject;
      let ind = connectedDomains.indexOf(domain.id);
      if (ind !== -1) {
        cproject = connectedProjects[ind];
        projects.map((project) => {
          if (project.id === cproject) {
            connectedProject = project.name;
          }
        })
      }
      return (
        <Table.Row key={index}>
          <Table.Cell>
            {connectedProject
              ?
              <a href={domain.name} target="react/jsx-no-target-blank">
                {domain.name}
              </a>
              :
              domain.name
            }
          </Table.Cell>
          <Table.Cell>
            {
              ind === -1 ? "A record not found" : 'Connected'
            }
          </Table.Cell>
          <Table.Cell>
            {
              <>
                <Button className="white icon" onClick={this.props.showModal.bind(this, { type: 1, isNew: false, id: domain.id, show: true, changeable: domain.name })}><i className="flaticon stroke pencil-1"></i></Button>
                <Button className="white icon" onClick={() => this.deleteDomain(domain.id)}><i className="flaticon stroke trash-1"></i></Button>
              </>
            }
          </Table.Cell>
        </Table.Row>
      );
    });

    const templateCategorylist = categoryList.map((category, index) => {
      return (
        <List.Item key={category.key} className={'clickable' + (selectedItem === "templates" ? selectedSubItem === category.key ? ' selected' : '' : '')} onClick={() => this.onSelectItem('templates', category.key)}>
          <List.Content><List.Icon color='blue' name='' className='ti ti-folder' />{category.label}</List.Content>
        </List.Item>
      );
    });

    const typeOptions = [{
      text: 'All',
      value: 0,
    }, {
      text: 'Published',
      value: 1,
    }, {
      text: 'Unpublished',
      value: 2,
    }]

    const sortOptions = [{
      text: 'Newest',
      value: 0,
    }, {
      text: 'Oldest',
      value: 1,
    }];

    return (
      <div className={'Domain'}>
        <div>
          <Loader />
          <DomainModal onDomainFormClose={() => this.onSelectItem('domains')} />
          <Modal
            size={"mini"}
            open={show}
            onClose={() => this.stateChange({ show: false })}
          >
            <Modal.Header>Delete your {mtype}</Modal.Header>
            <Modal.Content>
              <label>Are you sure you want to delete your {mtype}?</label>
            </Modal.Content>
            <Modal.Actions>
              <Button positive color="teal" onClick={() => this.stateChange({ show: false })}>
                Cancel
              </Button>
              <Button negative color="black" onClick={() => this.deleteCard()}>
                Delete
              </Button>
            </Modal.Actions>
          </Modal>
          <Modal
            size={"small"}
            open={crop.show}
            onClose={() => this.cropStateChange({ show: false })}
          >
            <Modal.Header>
              Select Image
            </Modal.Header>
            <FileUploader handleChange={(e) => this.cropImageChange(e, this)} name="file" types={["JPG", "PNG"]} />
            <Modal.Content>
              <Image src={crop.src || 'card1.png'} height={250} />
            </Modal.Content>
            <Modal.Actions>
              <Button negative color="black" onClick={() => this.cropStateChange({ show: false })}>
                No
              </Button>
              <Button positive color="teal" onClick={() => this.editImage()}>
                Yes
              </Button>
            </Modal.Actions>
          </Modal>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4} className='left-menubar'>
                <Grid>
                  <List>
                      {Auth.role !== "admin" && user_info !== null &&  <>
                      <Grid className="usage-bar">
                        <Grid.Column width={16} position="left">
                          <Header as='h4'>
                            Account Usage
                          </Header>
                        </Grid.Column>
                        {Auth.role === "company" && user_info.subscription_type === null?
                        <Button
                        fluid
                        color="blue"
                        // onClick={this.props.showModal.bind(this, { type: 0, isNew: true, id: 0, template_id: 0, show: true })}
                      >
                        Upgrade
                      </Button>:
                          <>
                          <Grid.Row columns={2}>
                          <Grid.Column>
                            <label>domains</label>
                          </Grid.Column>
                          <Grid.Column>
                            <label>{domains.length}/{user_info.max_domains}</label>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Column width={16}>
                          <Progress percent={user_info.max_domains===0?100:domains.length/user_info.max_domains*100} color='blue' size='small'></Progress>
                        </Grid.Column>
                          </>
                        } 
                        <Grid.Row columns={2}>
                          <Grid.Column>
                            <label>projects</label>
                          </Grid.Column>
                          <Grid.Column>
                            <label>{projects.length}/{user_info.max_projects}</label>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Column width={16}>
                          <Progress percent={user_info.max_projects===0?100:projects.length/user_info.max_projects*100} color='blue' size='small'></Progress>
                        </Grid.Column>
                      </Grid>
                      <List.Item className={'clickable' + (selectedItem === "projects" ? ' selected' : '')} onClick={() => this.onSelectItem('projects')}>
                        <List.Content className='secondary-header'>
                          <List.Header><List.Icon color='blue' name='' className='ti ti-folder' />
                            My Projects</List.Header>
                        </List.Content>
                      </List.Item>

                      {Auth.role === "company" && user_info.subscription_type === null?<></>:
                      <List.Item className={'clickable' + (selectedItem === "domains" ? ' selected' : '')} onClick={() => this.onSelectItem('domains')}>
                      <List.Content>
                      <List.Header><List.Icon color='blue' name='' className='ti ti-database' />Domains</List.Header>
                    </List.Content>
                      
                    </List.Item>
                      }
                      
                    </>
                    }
                    <List.Item>

                      <List.Content>
                        <List.Header className='template-header'>SELECT TEMPLATE</List.Header>
                        <List.List>
                          {
                            templateCategorylist
                          }
                        </List.List>
                      </List.Content>
                    </List.Item>
                  </List>
                  <Grid.Column width={16} className='w-100'>
                    {
                      Auth.role === "admin" && selectedItem === "templates" &&
                      <Button fluid color='blue' onClick={this.props.showModal.bind(this, { type: 2, isNew: true, id: 0, category_id: selectedSubItem, show: true })}>New Template</Button>
                    }
                    {
                      Auth.role !== "admin" && selectedItem !== "domains" &&
                      <Button
                        fluid
                        color="blue"
                        onClick={this.props.showModal.bind(this, { type: 0, isNew: true, id: 0, template_id: 0, show: true })}
                      >
                        New Blank Project
                      </Button>
                    }
                  </Grid.Column>
                </Grid>
              </Grid.Column>
              <Grid.Column width={12} floated='right'>
                {selectedItem === "projects"
                  ?
                  <>
                    <Segment attached='top'>
                      <Grid>
                        <Grid.Row columns={2}>
                          <Grid.Column>
                            <Header floated='left' as='h1'>Projects</Header>
                          </Grid.Column>
                          <Grid.Column>
                            <Menu secondary>
                              <Menu.Menu position='right'>
                                <Menu.Item>
                                  <Input icon='search' placeholder='Search...' />
                                </Menu.Item>
                              </Menu.Menu>
                            </Menu>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Segment>
                    <Grid.Row className='filters'>
                      <Dropdown onChange={(e, data) => this.stateChange({ selType: data.value })} value={selType} selection options={typeOptions} className="type" />
                      <Dropdown onChange={(e, data) => this.stateChange({ selSort: data.value })} value={selSort} selection options={sortOptions} className="sort" /><Label>Sort by</Label>
                    </Grid.Row>
                    <Segment attached='top'>
                      <Card.Group itemsPerRow={3}>
                        {
                          projectCardList
                        }
                      </Card.Group>
                    </Segment>
                  </>
                  :
                  selectedItem === "domains"
                    ?
                    <>
                      <Segment attached='top'>
                        <Grid.Column>
                          <Header floated='left' as='h1'>Domains</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Menu secondary>
                            <Menu.Menu position='right'>
                              <Button color="blue" onClick={this.props.showModal.bind(this, { type: 1, isNew: true, id: 0, show: true })}>Connect Domain</Button>
                              <Menu.Item>
                                <Input icon='search' placeholder='Search...' />
                              </Menu.Item>
                            </Menu.Menu>
                          </Menu>
                        </Grid.Column>
                      </Segment>
                      <Segment basic className="top-space">
                        {
                          domains.length === 0
                            ?
                            <Label className='no-domain'>
                              You have not attached any domains yet. Click connect domain to add your first one.
                            </Label>
                            :
                            <Table singleLine className="domainstable">
                              <Table.Header>
                                <Table.Row>
                                  <Table.HeaderCell>
                                    <span className='table-head blue'>Name</span>
                                  </Table.HeaderCell>
                                  <Table.HeaderCell>
                                    <span className='table-head blue'>Status</span>
                                  </Table.HeaderCell>
                                  <Table.HeaderCell>
                                    <span className='table-head blue'>Actions</span>
                                  </Table.HeaderCell>
                                </Table.Row>
                              </Table.Header>
                              <Table.Body>
                                {
                                  connectedDomainList
                                }
                              </Table.Body>
                            </Table>
                        }
                      </Segment>
                    </>
                    :
                    <>
                      <Segment attached='top'>
                        <Grid.Column>
                          <Header floated='left' as='h1'>{categoryList[selectedSubItem - 1].label}</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Menu secondary>
                            <Menu.Menu position='right'>
                              <Menu.Item>
                                <Input icon='search' placeholder='Search...' />
                              </Menu.Item>
                            </Menu.Menu>
                          </Menu>
                        </Grid.Column>
                      </Segment>
                      <Segment attached='top'>
                        <Card.Group itemsPerRow={3}>
                          {
                            templateCardList
                          }
                        </Card.Group>
                      </Segment>
                    </>
                }
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default compose(BreadCrumbContainer, CompaniesContainer, DomainContainer, DomainFormContainer)(Domain);