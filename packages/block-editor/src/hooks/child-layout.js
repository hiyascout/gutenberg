/**
 * WordPress dependencies
 */
import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import useSetting from '../components/use-setting';

/**
 * Inspector control panel containing the child layout related configuration
 *
 * @param {Object} props                        Block props.
 * @param {Object} props.attributes             Block attributes.
 * @param {Object} props.setAttributes          Function to set block attributes.
 * @param {Object} props.__unstableParentLayout
 *
 * @return {WPElement} child layout edit element.
 */
export function ChildLayoutEdit( {
	attributes,
	setAttributes,
	__unstableParentLayout: parentLayout,
} ) {
	const { style = {} } = attributes;
	const { layout: childLayout = {} } = style;
	const { selfStretch, flexSize } = childLayout;

	return (
		<>
			<ToggleGroupControl
				style={ { marginBottom: '8px' } }
				label={ childLayoutOrientation( parentLayout ) }
				value={ selfStretch || 'hug' }
				onChange={ ( value ) => {
					setAttributes( {
						style: {
							...style,
							layout: {
								...childLayout,
								selfStretch: value,
							},
						},
					} );
				} }
				isBlock={ true }
			>
				<ToggleGroupControlOption
					key={ 'hug' }
					value={ 'hug' }
					label={ __( 'Hug' ) }
				/>
				<ToggleGroupControlOption
					key={ 'fill' }
					value={ 'fill' }
					label={ __( 'Fill' ) }
				/>
				<ToggleGroupControlOption
					key={ 'fixed' }
					value={ 'fixed' }
					label={ __( 'Fixed' ) }
				/>
			</ToggleGroupControl>
			{ selfStretch === 'fixed' && (
				<UnitControl
					style={ { height: '36px' } }
					onChange={ ( value ) => {
						setAttributes( {
							style: {
								...style,
								layout: {
									...childLayout,
									flexSize: value,
								},
							},
						} );
					} }
					value={ flexSize }
				/>
			) }
		</>
	);
}

/**
 * Determines if there is child layout support.
 *
 * @param {Object} props                        Block Props object.
 * @param {Object} props.__unstableParentLayout Parent layout.
 *
 * @return {boolean}     Whether there is support.
 */
export function hasChildLayoutSupport( {
	__unstableParentLayout: parentLayout,
} ) {
	const {
		type: parentLayoutType = 'default',
		allowSizingOnChildren = false,
	} = parentLayout;
	const support = parentLayoutType === 'flex' && allowSizingOnChildren;

	return support;
}

/**
 * Checks if there is a current value in the child layout attributes.
 *
 * @param {Object} props Block props.
 * @return {boolean}      Whether or not the block has a child layout value set.
 */
export function hasChildLayoutValue( props ) {
	return props.attributes.style?.layout !== undefined;
}

/**
 * Resets the child layout attribute. This can be used when disabling
 * child layout controls for a block via a progressive discovery panel.
 *
 * @param {Object} props               Block props.
 * @param {Object} props.attributes    Block attributes.
 * @param {Object} props.setAttributes Function to set block attributes.
 */
export function resetChildLayout( { attributes = {}, setAttributes } ) {
	const { style } = attributes;

	setAttributes( {
		style: {
			...style,
			layout: undefined,
		},
	} );
}

/**
 * Custom hook that checks if child layout settings have been disabled.
 *
 * @param {Object} props Block props.
 *
 * @return {boolean}     Whether the child layout setting is disabled.
 */
export function useIsChildLayoutDisabled( props ) {
	const isDisabled = ! useSetting( 'layout' );

	return ! hasChildLayoutSupport( props ) || isDisabled;
}

export function childLayoutOrientation( parentLayout ) {
	const { orientation = 'horizontal' } = parentLayout;

	return orientation === 'horizontal' ? __( 'Width' ) : __( 'Height' );
}
