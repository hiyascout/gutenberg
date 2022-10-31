/**
 * WordPress dependencies
 */
import { TabPanel } from '@wordpress/components';

/**
 * Internal dependencies
 */
import useInspectorControlsTabs from './use-inspector-controls-tabs';
import { TAB_SETTINGS, TAB_APPEARANCE } from './utils';
import AppearanceTab from './appearance-tab';
import SettingsTab from './settings-tab';

export default function InspectorControlsTabs( {
	blockName,
	clientId,
	hasBlockStyles,
} ) {
	const hasSingleBlockSelection = !! blockName;
	const availableTabs = useInspectorControlsTabs();

	if ( ! availableTabs.length ) {
		return null;
	}

	// If we only have a single tab to display, skip the tab panel and just
	// render the contents.
	if ( availableTabs.length === 1 ) {
		if ( availableTabs[ 0 ].name === TAB_SETTINGS.name ) {
			return (
				<SettingsTab
					hasSingleBlockSelection={ hasSingleBlockSelection }
				/>
			);
		}

		if ( availableTabs[ 0 ].name === TAB_APPEARANCE.name ) {
			return (
				<AppearanceTab
					blockName={ blockName }
					clientId={ clientId }
					hasBlockStyles={ hasBlockStyles }
				/>
			);
		}
	}

	// We have multiple tabs with contents so render complete TabPanel.
	return (
		<TabPanel
			className="block-editor-block-inspector__tabs"
			tabs={ availableTabs }
		>
			{ ( tab ) => {
				if ( tab.name === TAB_SETTINGS.name ) {
					return (
						<SettingsTab
							hasSingleBlockSelection={ hasSingleBlockSelection }
						/>
					);
				}

				if ( tab.name === TAB_APPEARANCE.name ) {
					return (
						<AppearanceTab
							blockName={ blockName }
							clientId={ clientId }
							hasBlockStyles={ hasBlockStyles }
						/>
					);
				}
			} }
		</TabPanel>
	);
}
