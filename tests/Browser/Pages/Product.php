<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page;

class Product extends Page
{
    /**
     * Get the URL for the page.
     */
    public function url(): string
    {
        return '/product/1';
    }

    /**
     * Assert that the browser is on the page.
     */
    public function assert(Browser $browser): void
    {
        $browser->assertPathIs($this->url());
    }

    /**
     * Get the element shortcuts for the page.
     *
     * @return array<string, string>
     */
    public function elements(): array
    {
        return [
            '@project_name' => 'input[name="project_name"]',
            '@description' => 'textarea[name="description"]',
            '@qty' => 'input[name="qty"]',
            '@size' => 'input[name="Size"]',
            '@color' => 'input[name="Color"]',
            '@material' => 'input[name="Material"]',
            '@style' => 'input[name="Style"]',
            '@pattern' => 'input[name="Pattern"]',
            '@margin' => 'input[name="Margin"]',
            '@design' => 'input[name="design"]',
            '@addToCart' => 'button[type="submit"]',
        ];
    }
}
