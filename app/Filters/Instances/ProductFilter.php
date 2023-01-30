<?php

namespace App\Filters\Instances;

use App\Filters\QueryFilters;

class ProductFilter extends QueryFilters
{
    /**
     * Filter by name.
     *
     * @param  string $name
     * @return Builder
     */
    public function name($name)
    {
        return $this->builder->where('name', 'like', "%{$name}%");
    }

    /**
     * Filter by category.
     *
     * @param  string $category
     * @return Builder
     */
    public function category($category)
    {
        return $this->builder->where('category_id', $category);
    }
}
