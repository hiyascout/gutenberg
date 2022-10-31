/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';

const InspectorControlsDefault = createSlotFill( 'InspectorControls' );
const InspectorControlsAdvanced = createSlotFill( 'InspectorAdvancedControls' );
const InspectorControlsBorder = createSlotFill( 'InspectorControlsBorder' );
const InspectorControlsColor = createSlotFill( 'InspectorControlsColor' );
const InspectorControlsDimensions = createSlotFill(
	'InspectorControlsDimensions'
);
const InspectorControlsTypography = createSlotFill(
	'InspectorControlsTypography'
);

// The general group is intended to render fills relevant to a block as a whole.
// As such, they will normally be rendered outside the block inspector's tabs.
const InspectorControlsGeneral = createSlotFill( 'InspectorControlsGeneral' );

const groups = {
	default: InspectorControlsDefault,
	advanced: InspectorControlsAdvanced,
	border: InspectorControlsBorder,
	color: InspectorControlsColor,
	dimensions: InspectorControlsDimensions,
	general: InspectorControlsGeneral,
	typography: InspectorControlsTypography,
};

export default groups;
