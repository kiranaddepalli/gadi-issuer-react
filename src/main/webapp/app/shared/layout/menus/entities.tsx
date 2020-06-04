import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/address">
      <Translate contentKey="global.menu.entities.address" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/phone-number">
      <Translate contentKey="global.menu.entities.phoneNumber" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/email">
      <Translate contentKey="global.menu.entities.email" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/image-content">
      <Translate contentKey="global.menu.entities.imageContent" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/organization">
      <Translate contentKey="global.menu.entities.organization" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/person">
      <Translate contentKey="global.menu.entities.person" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/party-relationship">
      <Translate contentKey="global.menu.entities.partyRelationship" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/credential-type">
      <Translate contentKey="global.menu.entities.credentialType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/driver-license">
      <Translate contentKey="global.menu.entities.driverLicense" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/passport">
      <Translate contentKey="global.menu.entities.passport" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/education">
      <Translate contentKey="global.menu.entities.education" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/experience">
      <Translate contentKey="global.menu.entities.experience" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/country">
      <Translate contentKey="global.menu.entities.country" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/state">
      <Translate contentKey="global.menu.entities.state" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/address-type">
      <Translate contentKey="global.menu.entities.addressType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/phone-type">
      <Translate contentKey="global.menu.entities.phoneType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/email-type">
      <Translate contentKey="global.menu.entities.emailType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/party-type">
      <Translate contentKey="global.menu.entities.partyType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/party-role">
      <Translate contentKey="global.menu.entities.partyRole" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/title">
      <Translate contentKey="global.menu.entities.title" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/suffix">
      <Translate contentKey="global.menu.entities.suffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/gender">
      <Translate contentKey="global.menu.entities.gender" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/eye-color">
      <Translate contentKey="global.menu.entities.eyeColor" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/hair-color">
      <Translate contentKey="global.menu.entities.hairColor" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/race">
      <Translate contentKey="global.menu.entities.race" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tenure-type">
      <Translate contentKey="global.menu.entities.tenureType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/image-type">
      <Translate contentKey="global.menu.entities.imageType" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
