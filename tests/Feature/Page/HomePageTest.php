<?php

namespace Tests\Feature\Page;

use Tests\TestCase;

class HomePageTest extends TestCase
{
    /**
     * Test if home page is accessible by guest
     *
     * @return void
     */
    public function testHomePage()
    {
        $this->get('/')
            ->assertStatus(200);
    }
}
