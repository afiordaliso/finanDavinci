// Chakra imports
import { ChakraProvider, Portal, useDisclosure } from '@chakra-ui/react';
// Layout components
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import Sidebar from 'components/Sidebar';
import React, { useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import routes from 'routes.js';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Footer from "components/Footer/Footer.js";
// Custom Chakra theme
import theme from 'theme/theme.js';
// Custom components
import MainPanel from '../components/Layout/MainPanel';
import PanelContainer from '../components/Layout/PanelContainer';
import PanelContent from '../components/Layout/PanelContent';

export default function Dashboard(props) {
	const { ...rest } = props;
	// states and functions
	const [sidebarVariant, setSidebarVariant] = useState('transparent');
	const [fixed, setFixed] = useState(false);
	const location = useLocation(); // Get current location
	const { isOpen, onOpen, onClose } = useDisclosure();

	// functions for changing the states from components
	const getRoute = () => {
		return window.location.pathname !== '/user/full-screen-maps';
	};
	const getActiveRoute = (routes) => {
		let activeRoute = 'Default Brand Text';
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveRoute = getActiveRoute(routes[i].views);
				if (collapseActiveRoute !== activeRoute) {
					return collapseActiveRoute;
				}
			} else if (routes[i].category) {
				let categoryActiveRoute = getActiveRoute(routes[i].views);
				if (categoryActiveRoute !== activeRoute) {
					return categoryActiveRoute;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					return routes[i].name;
				}
			}
		}
		return activeRoute;
	};
	// This changes navbar state(fixed or not)
	const getActiveNavbar = (routes) => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].category) {
				let categoryActiveNavbar = getActiveNavbar(routes[i].views);
				if (categoryActiveNavbar !== activeNavbar) {
					return categoryActiveNavbar;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					if (routes[i].secondaryNavbar) {
						return routes[i].secondaryNavbar;
					}
				}
			}
		}
		return activeNavbar;
	};
	const getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.collapse) {
				return getRoutes(prop.views);
			}
			if (prop.category === 'account') {
				return getRoutes(prop.views);
			}
			if (prop.layout === '/user') {
				return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
			} else {
				return null;
			}
		});
	};

	// Chakra Color Mode
	document.documentElement.dir = 'ltr';

	// Check if the current path is "/user/dashboard"
	const isUserDashboard = location.pathname === '/user/dashboard';

	return (
		<ChakraProvider theme={theme} resetCss={false}>
			{/* Show Sidebar only if the path is "/user/dashboard" */}
			{isUserDashboard && (
				<Sidebar
					routes={routes}
					logoText={'FinanDavinci'}
					sidebarVariant={sidebarVariant}
					{...rest}
				/>
			)}
			<MainPanel
				w={{
					base: '100%',
					xl: isUserDashboard ? 'calc(100% - 275px)' : '100%',
				}}
			>
				<Portal>
					<AdminNavbar
						onOpen={onOpen}
						logoText={'FinanDavinci'}
						brandText={getActiveRoute(routes)}
						secondary={getActiveNavbar(routes)}
						fixed={fixed}
						{...rest}
					/>
				</Portal>
				{getRoute() ? (
					<PanelContent>
						<PanelContainer>
							<Switch>
								{getRoutes(routes)}
								<Redirect from='/user' to='/user/dashboard' />
							</Switch>
						</PanelContainer>
					</PanelContent>
				) : null}
				<Footer />
			</MainPanel>
		</ChakraProvider>
	);
}
