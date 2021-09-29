<?php
// created: 2021-09-17 17:19:19
$viewdefs['Products']['base']['view']['quote-data-group-list'] = array (
  'panels' => 
  array (
    0 => 
    array (
      'name' => 'products_quote_data_group_list',
      'label' => 'LBL_PRODUCTS_QUOTE_DATA_LIST',
      'fields' => 
      array (
        0 => 
        array (
          'name' => 'line_num',
          'label' => NULL,
          'widthClass' => 'cell-xsmall',
          'css_class' => 'line_num tcenter',
          'type' => 'line-num',
          'readonly' => true,
        ),
        1 => 
        array (
          'id_name' => 'manufacturer_id',
          'label' => 'LBL_MANUFACTURER_NAME',
          'labelModule' => 'Products',
          'name' => 'manufacturer_id',
          'type' => 'enum-api',
          'api' => 'Products/manufacturers',
        ),
        2 => 
        array (
          'label' => 'LBL_CATEGORY_NAME',
          'id_name' => 'category_id',
          'labelModule' => 'Products',
          'name' => 'category_id',
          'type' => 'enum-parent-api',
          'api' => 'Products/categories/',
          'parent' => 'manufacturer_id',
        ),
        3 => 
        array (
          'label' => 'LBL_PRODUCT_TEMPLATE',
          'labelModule' => 'Products',
          'widthClass' => 'cell-large',
          'required' => true,
          'related_fields' => 
          array (
            0 => 'service',
            1 => 'service_start_date',
            2 => 'service_end_date',
            3 => 'renewable',
            4 => 'service_duration_value',
            5 => 'service_duration_unit',
          ),
          'name' => 'product_template_id',
          'type' => 'enum-mult-parent-api',
          'api' => 'Products/templates',
          'parents' => 
          array (
            'manufacturer_id' => 'manufacturer_id',
            'category_id' => 'category_id',
          ),
        ),
        4 => 
        array (
          'name' => 'quantity',
          'label' => 'LBL_QUANTITY',
          'labelModule' => 'Products',
          'widthClass' => 'cell-small',
          'css_class' => 'quantity',
          'type' => 'float',
        ),
        5 => 
        array (
          'name' => 'mft_part_num',
          'label' => 'LBL_MFT_PART_NUM',
          'labelModule' => 'Products',
          'type' => 'base',
        ),
        6 => 
        array (
          'name' => 'discount_price',
          'label' => 'LBL_DISCOUNT_PRICE',
          'labelModule' => 'Products',
          'type' => 'currency',
          'convertToBase' => true,
          'showTransactionalAmount' => true,
          'related_fields' => 
          array (
            0 => 'discount_price',
            1 => 'currency_id',
            2 => 'base_rate',
          ),
        ),
        7 => 
        array (
          'name' => 'discount_field',
          'type' => 'fieldset',
          'css_class' => 'discount-field quote-discount-percent',
          'label' => 'LBL_DISCOUNT_AMOUNT',
          'labelModule' => 'Products',
          'show_child_labels' => false,
          'sortable' => false,
          'fields' => 
          array (
            0 => 
            array (
              'name' => 'discount_amount',
              'label' => 'LBL_DISCOUNT_AMOUNT',
              'type' => 'discount-amount',
              'discountFieldName' => 'discount_select',
              'related_fields' => 
              array (
                0 => 'currency_id',
              ),
              'convertToBase' => true,
              'base_rate_field' => 'base_rate',
              'showTransactionalAmount' => true,
            ),
            1 => 
            array (
              'type' => 'discount-select',
              'name' => 'discount_select',
              'options' => 
              array (
              ),
              'label' => 'LBL_DISCOUNT_AS_PERCENT',
            ),
          ),
        ),
        8 => 
        array (
          'name' => 'total_amount',
          'label' => 'LBL_LINE_ITEM_TOTAL',
          'labelModule' => 'Quotes',
          'type' => 'currency',
          'widthClass' => 'cell-medium',
          'showTransactionalAmount' => true,
          'related_fields' => 
          array (
            0 => 'total_amount',
            1 => 'currency_id',
            2 => 'base_rate',
          ),
        ),
      ),
    ),
  ),
);