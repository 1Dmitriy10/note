<? 
	$class = ''; 
	if(!stristr(get_the_content(), 'banner')): 
		$class = 'fixed_page';
	endif; 

	if(in_category('blog') && $_SERVER["REQUEST_URI"] != '/blog/'):
		$class .= ' blog_rs blog_rs_v2 blog_rs_v3';
	endif;
	
	$arMain = [
		'first_color' => get_theme_mod( 'dius_main_color' ),
		'second_color' => get_theme_mod( 'dius_second_color' ),
		'bg_banner_color' => get_theme_mod( 'dius_bg_banner_color' ),
		'bg_coupon_color' => get_theme_mod( 'dius_bg_coupon_color' ),
		'bg_circle_num_step_color' => get_theme_mod( 'dius_bg_circle_num_step_color' ),
		'bg_circle_path_step_color' => get_theme_mod( 'dius_bg_circle_part_step_color' ),
		'bg_circle_arrow_step_color' => get_theme_mod( 'dius_bg_circle_arrow_step_color' ),
		'calc_color' => get_theme_mod( 'dius_calc_color' ),
	];
	
	$addStyle = '';
	
	for($i = 1; $i <= 5; $i++) {
		$addStyle .= '#menu-osnovnoe-menyu li:nth-child('.$i.'){background: url('.$GLOBALS['arResult']['main']['path_domain'].$i.'.png) no-repeat center left;}';
	}
	
	$addStyle .= 'body #seo_sales:before{background: url(/wp-content/uploads/shortcodes/grid_images2/#host#/sales_woman.png) center bottom no-repeat;}';
	$addStyle .= 'body #seo_form_bottom_left .info_phone{background: url(/wp-content/uploads/shortcodes/form/bottom/#host#/form_handphone.png) left center no-repeat;}';
	$addStyle .= 'body #seo_form_bottom .blockcenter_area:before{background:url(/wp-content/uploads/shortcodes/form/bottom/#host#/form_stars.png) left top no-repeat;}';
?>
<!DOCTYPE html>
<html lang="ru">
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<title><?php wp_title( '|', true, 'right' ); ?></title>
		
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<link rel="preconnect" href="https://fonts.gstatic.com">
		<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700,800" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;500&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;600&display=swap" rel="stylesheet">
		
		<link href="<?= $GLOBALS['arResult']['main']['favicon_host']; ?>" rel="shortcut icon" type="image/vnd.microsoft.icon">
		<link rel="stylesheet" href="https://kit-free.fontawesome.com/releases/latest/css/free.min.css" media="all">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
		
		<? if(isset($arMain) && $arMain && count($arMain)): ?>
			<style>:root{<? foreach($arMain as $key=>$val): ?>--<?=$key?>:<?=$val;?>;<? endforeach; ?>}<?= $addStyle; ?></style>
		<? endif; ?>
		<? wp_head(); ?>
		<? if(get_theme_mod('dius_settings_head_custom')): ?>
			<?= get_theme_mod('dius_settings_head_custom'); ?>
		<? endif; ?>
	</head>
	<body <?php body_class($class); ?> id="<?= $settings['body_id']; ?>"<? if(get_theme_mod( 'dius_bg_coupon_color' )): ?> data-counter="<?=get_theme_mod( 'dius_settings_head_counter' ); ?>"<? endif; ?>>
		<?php wp_body_open(); ?>
		<?php get_template_part('template-parts/header/index'); ?>