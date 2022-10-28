<?php
/**
 * API to interact with global settings & styles.
 *
 * @package gutenberg
 */

if ( ! function_exists( 'wp_theme_has_theme_json' ) ) {
	/**
	 * Whether a theme or its parent have a theme.json file.
	 *
	 * @param boolean $clear_cache Whether the cache should be cleared and theme support recomputed. Default is false.
	 *
	 * @return boolean
	 */
	function wp_theme_has_theme_json( $clear_cache = false ) {
		static $theme_has_support = null;

		if ( true === $clear_cache ) {
			$theme_has_support = null;
		}

		if ( null !== $theme_has_support ) {
			return $theme_has_support;
		}

		// Has the own theme a theme.json?
		$theme_has_support = is_readable( get_stylesheet_directory() . '/theme.json' );

		// Look up the parent if the child does not have a theme.json.
		if ( ! $theme_has_support ) {
			$theme_has_support = is_readable( get_template_directory() . '/theme.json' );
		}

		return $theme_has_support;
	}
}

if ( ! function_exists( 'wp_theme_clean_theme_json_cached_data' ) ) {
	/**
	 * Clean theme.json related cached data.
	 */
	function wp_theme_clean_theme_json_cached_data() {
		wp_theme_has_theme_json( true );
		wp_get_global_settings( true );
		WP_Theme_JSON_Resolver_Gutenberg::clean_cached_data();
	}
}

/**
 * Function to get the settings resulting of merging core, theme, and user data.
 *
 * @param array   $path    Path to the specific setting to retrieve. Optional.
 *                         If empty, will return all settings.
 * @param array   $context {
 *       Metadata to know where to retrieve the $path from. Optional.
 *
 *     @type string $block_name Which block to retrieve the settings from.
 *                              If empty, it'll return the settings for the global context.
 *     @type string $origin     Which origin to take data from.
 *                              Valid values are:
 *                              - 'all': loads all data (default, blocks, theme, and user)
 *                              - 'base': loads only default, blocks, and theme data
 *                              If empty or unknown, 'all' is used.
 * }
 * @param boolean $clear_cache Whether the cache should be cleared and settings recomputed. Default is false.
 *
 * @return array The settings to retrieve.
 */
function gutenberg_get_global_settings( $path = array(), $context = array(), $clear_cache = false ) {
	if ( ! empty( $context['block_name'] ) ) {
		$path = array_merge( array( 'blocks', $context['block_name'] ), $path );
	}

	static $settings_by_origin = array(
		'default' => null,
		'blocks'  => null,
		'theme'   => null,
		'custom'  => null,
	);
	if ( true === $clear_cache ) {
		$settings_by_origin = array(
			'default' => null,
			'blocks'  => null,
			'theme'   => null,
			'custom'  => null,
		);
	}

	$origin = 'custom';
	if ( isset( $context['origin'] ) && 'base' === $context['origin'] ) {
		$origin = 'theme';
	} elseif ( isset( $context['origin'] ) && 'all' === $context['all'] ) {
		$origin = 'custom';
	} elseif ( ! wp_theme_has_theme_json() ) {
		// For themes with no theme.json skip querying the database for user data (custom origin).
		$origin = 'theme';
	}

	if ( null === $settings_by_origin[ $origin ] ) {
		$settings_by_origin[ $origin ] = WP_Theme_JSON_Resolver_Gutenberg::get_merged_data( $origin )->get_settings();
	}

	return _wp_array_get( $settings_by_origin[ $origin ], $path, $settings_by_origin[ $origin ] );
}
