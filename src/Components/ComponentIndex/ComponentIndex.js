const components = {};

// import NavigationMenu from '../SmartComponent/Navigation/Navigation'
components["Button"] = require('../DummyComponent/Button/Button').default;
components["LeftNavigation"] = require('../SmartComponent/Navigation/Navigation').default;
components["AmountToWords"] = require('../DummyComponent/AmountToWords/AmountToWords').default;

export default components
