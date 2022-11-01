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
const InspectorControlsBlockInformation = createSlotFill(
	'InspectorControlsBlockInformation'
);

const groups = {
	default: InspectorControlsDefault,
	advanced: InspectorControlsAdvanced,
	blockInformation: InspectorControlsBlockInformation,
	border: InspectorControlsBorder,
	color: InspectorControlsColor,
	dimensions: InspectorControlsDimensions,
	typography: InspectorControlsTypography,
};

export default groups;
