<?php

namespace Tests\Browser;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\Browser\Pages\Product;
use Tests\DuskTestCase;

class UserAddCartTest extends DuskTestCase
{
    // use DatabaseMigrations;

    /**
     * A Dusk test if user can add product to cart.
     *
     * @return void
     */
    public function testUserCanAddProductToCart()
    {
        $this->browse(function (Browser $browser) {
            $browser->loginAs(13)
                ->visit(new Product(1))
                ->type('@project_name', 'Test Project')
                ->type('@description', 'Test Description')
                ->type('@qty', 1)
                ->radio('@size', 'S')
                ->radio('@color', 'Black')
                ->radio('@material', 'Cotton')
                ->radio('@style', 'Gothic')
                ->radio('@pattern', 'Solid')
                ->radio('@margin', '40%')
                ->type('@design', 'Test Design')
                ->assertSee('Add to Cart')
                ->click('@addToCart');
        });
    }
}
