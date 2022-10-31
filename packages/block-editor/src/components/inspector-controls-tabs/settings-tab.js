/**
 * Internal dependencies
 */
import AdvancedControls from './advanced-controls-panel';
import InspectorControls from '../inspector-controls';

const SettingsTab = ( { hasSingleBlockSelection = false } ) => (
	<>
		<InspectorControls.Slot />
		{ hasSingleBlockSelection && (
			<div>
				<AdvancedControls />
			</div>
		) }
	</>
);

export default SettingsTab;
