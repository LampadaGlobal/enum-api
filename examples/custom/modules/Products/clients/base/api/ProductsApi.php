<?php
class ProductsApi extends SugarApi {
	public function registerApiRest() {
		return [
			'manufacturers' => [
				'reqType' => 'GET',
				'path' => ['Products', 'manufacturers'],
				'pathVars' => ['module', ''],
				'method' => 'get_manufacturer_list',
				'shortHelp' => 'Get Manufacturers',
				'longHelp' => '',
			],
			'categories' => [
				'reqType' => 'GET',
				'path' => ['Products', 'categories', '?'],
				'pathVars' => ['module', '', 'manufacturer_id'],
				'method' => 'get_category_list',
				'shortHelp' => 'Get Categories from Manufacturer',
				'longHelp' => '',
			],
			'templates' => [
				'reqType' => 'POST',
				'path' => ['Products', 'templates'],
				'pathVars' => ['module', ''],
				'method' => 'get_template_list',
				'shortHelp' => 'Get Templates from Manufacturer and Category',
				'longHelp' => '',
			],
		];
	}

	public function get_manufacturer_list(ServiceBase $api, array $args) {
		$list = ['' => $GLOBALS['app_strings']['LBL_NONE']];

		$query = new SugarQuery();
		$query->from(BeanFactory::getBean('Manufacturers'));
		$query->select(['id', 'name']);
		$query->orderBy('name', 'ASC');
		$results = $query->execute();

		foreach($results as $item) $list[$item['id']] = $item['name'];

		return $list;
	}

	public function get_category_list(ServiceBase $api, array $args) {
		$list = ['' => $GLOBALS['app_strings']['LBL_NONE']];

		$query = new SugarQuery();
		$query->from(BeanFactory::getBean('ProductTemplates'), ['alias' => 'pt']);
		$query->join('category_link', ['alias' => 'pc']);
		$query->select(['pc.id', 'pc.name']);
		$query->where()->equals('pt.manufacturer_id', $args['manufacturer_id']);
		$query->orderBy('pc.name', 'ASC');
		$results = $query->execute();

		foreach($results as $item) $list[$item['id']] = $item['name'];

		return $list;
	}

	public function get_template_list(ServiceBase $api, array $args) {
		$list = ['' => $GLOBALS['app_strings']['LBL_NONE']];

		$query = new SugarQuery();
		$query->from(BeanFactory::getBean('ProductTemplates'));
		$query->select(['id', 'name']);
		$query->where()->equals('manufacturer_id', $args['manufacturer_id'])->equals('category_id', $args['category_id']);
		$query->orderBy('name', 'ASC');
		$results = $query->execute();

		foreach($results as $item) $list[$item['id']] = $item['name'];

		return $list;
	}
}
